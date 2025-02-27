import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { PermissionsService } from '../../services/permissions.service';
import { Country, getCountryName } from '../../interfaces/branch.interface';
import { Address } from '../../interfaces/address.interface';

@Component({
  selector: 'app-address-details',
  standalone: false,
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.scss'
})
export class AddressDetailsComponent implements OnInit {
  address: Address | null = null;
  branchId: number | null = null;
  addressId: number | null = null;
  customerId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private permissionsService: PermissionsService
  ) {}

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  ngOnInit(): void {
    // Check if user has permission to view address details
    if (!this.hasPermission('View Address')) {
      console.log('Permission denied: View Address');
      this.goBack();
      return;
    }

    // Get all necessary IDs from the route
    this.route.params.subscribe(params => {
      this.branchId = Number(params['branchId']);
      this.addressId = Number(params['addressId'] || params['id']);
    });

    // Get customerId from query params or parent route
    this.route.queryParams.subscribe(params => {
      this.customerId = Number(params['customerId']);
    });

    if (this.addressId) {
      this.loadAddressDetails(this.addressId);
    }
  }

  private loadAddressDetails(id: number): void {
    if (!this.hasPermission('View Address')) {
      this.goBack();
      return;
    }

    this.loading = true;
    this.addressService.getAddressById(id).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data) {
          const addressData = response.data;
          this.address = {
            ...addressData,
            countryName: getCountryName(addressData.country)
          };
          if (!this.customerId && addressData.customerId) {
            this.customerId = addressData.customerId;
          }
        } else {
          this.error = response.message || 'Failed to load address details';
        }
      },
      error: (error) => {
        console.error('Error loading address:', error);
        this.error = 'An error occurred while loading the address details';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  goBack(): void {
    if (this.customerId && this.branchId) {
      this.router.navigate(['/crm/branches', this.branchId], {
        queryParams: { customerId: this.customerId }
      });
    } else if (this.branchId) {
      this.router.navigate(['/crm/branches/details', this.branchId]);
    }
  }
} 