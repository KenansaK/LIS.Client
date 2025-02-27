import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { PermissionsService } from '../../services/permissions.service';
import { Country, getCountryName } from '../../interfaces/branch.interface';

@Component({
  selector: 'app-address-add-edit',
  standalone: false,
  templateUrl: './add-edit-address.component.html',
  styleUrl: './add-edit-address.component.scss'
})
export class AddEditAddressComponent implements OnInit {
  addressForm: FormGroup;
  isEditMode = false;
  addressId: number | null = null;
  branchId: number | null = null;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private permissionsService: PermissionsService
  ) {
    this.addressForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      zipCode: ['', Validators.required],
      locationCode1: [''],
      locationCode2: [''],
      locationCode3: [''],
      faxNumber: [''],
      contactName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.branchId = Number(params['branchId']);
    });

    this.route.queryParams.subscribe(params => {
      this.customerId = Number(params['customerId']);
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.addressId = +id;
    }

    // Check permissions before proceeding
    const requiredPermission = this.isEditMode ? 'Edit Address' : 'Create Address';
    if (!this.hasPermission(requiredPermission)) {
      console.log(`Permission denied: ${requiredPermission}`);
      this.navigateBack();
      return;
    }

    if (this.isEditMode) {
      this.loadAddressData(+id!);
    }
  }

  loadAddressData(id: number): void {
    if (!this.hasPermission('Edit Address')) {
      this.navigateBack();
      return;
    }

    this.addressService.getAddressById(id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.addressForm.patchValue(response.data);
        }
      },
      error: (error) => {
        console.error('Error loading address:', error);
      }
    });
  }

  onSubmit(): void {
    if (!this.addressForm.valid || !this.branchId) return;

    const requiredPermission = this.isEditMode ? 'Edit Address' : 'Create Address';
    if (!this.hasPermission(requiredPermission)) {
      console.error(`Permission denied: ${requiredPermission}`);
      return;
    }

    const addressData = {
      ...this.addressForm.value,
      branchId: this.branchId
    };
    
    if (this.isEditMode && this.addressId) {
      this.addressService.updateAddress(this.addressId, addressData).subscribe({
        next: () => {
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error updating address:', error);
        }
      });
    } else {
      this.addressService.createAddress(addressData).subscribe({
        next: () => {
          this.navigateBack();
        },
        error: (error) => {
          console.error('Error creating address:', error);
        }
      });
    }
  }

  navigateBack(): void {
    if (this.customerId && this.branchId) {
      this.router.navigate(['/crm/branches', this.branchId], {
        queryParams: { customerId: this.customerId }
      });
    }
  }

  goBack(): void {
    this.navigateBack();
  }
} 