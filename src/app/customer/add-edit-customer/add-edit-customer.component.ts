import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customer.service';
import { PermissionsService } from '../../services/permissions.service';

interface ApiResponse {
  data: Customer;
  status: string;
  isSuccess: boolean;
  message: string;
  errors: any[];
}

interface Customer {
  id: number;
  companyCommercialName: string;
  companyLegalName: string;
  businessType: BusinessType;
  customerCode: string;
  customerNumber: string;
  registrationNumber: string;
  status: CustomerStatus;
  billingExternalCode: string;
  externalCode: string;
  storeBarcodePrefix: string;
  logoBase64: string;
}

enum BusinessType {
  Retail = 1,
  Banking = 2,
  ECommerce = 3,
  InformationTechnology = 4,
  Carrier = 5
}

enum CustomerStatus {
  Active= 1,
  InActive = 2
  
}

@Component({
  selector: 'app-add-edit',
  standalone: false,
  
  templateUrl: './add-edit-customer.component.html',
  styleUrl: './add-edit-customer.component.scss'
})
export class AddEditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId = 0;
  BusinessType = BusinessType;  // Make enum available to template
  CustomerStatus = CustomerStatus;  // Make enum available to template
  
  // Convert enums to array of options
  businessTypes = Object.keys(BusinessType)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      name: key,
      value: BusinessType[key as keyof typeof BusinessType]
    }));

  customerStatuses = Object.keys(CustomerStatus)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      name: key,
      value: CustomerStatus[key as keyof typeof CustomerStatus]
    }));

  selectedLogo: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customersService: CustomersService,
    private permissionsService: PermissionsService
  ) {
    this.customerForm = this.fb.group({
      companyCommercialName: ['', [Validators.required]],
      companyLegalName: ['', [Validators.required]],
      businessType: ['', [Validators.required]],
      customerCode: ['', [Validators.required]],
      customerNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      status: ['', [Validators.required]],
      billingExternalCode: ['', [Validators.required]],
      externalCode: ['', [Validators.required]],
      storeBarcodePrefix: ['', [Validators.required]],
      logoBase64: ['', [Validators.required]]
    });
  }

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerId = id ? +id : 0;
    this.isEditMode = this.customerId > 0;

    // Check permissions before proceeding
    const requiredPermission = this.isEditMode ? 'Edit Customer' : 'Create Customer';
    if (!this.hasPermission(requiredPermission)) {
      console.log(`Permission denied: ${requiredPermission}`);
      this.router.navigate(['/crm/customers']);
      return;
    }

    if (this.isEditMode) {
      this.loadCustomerData();
    }
  }

  loadCustomerData(): void {
    if (!this.hasPermission('Edit Customer')) return;

    this.customersService.getCustomerById(this.customerId).subscribe({
      next: (response: ApiResponse) => {
        this.customerForm.patchValue(response.data);
        this.selectedLogo = response.data.logoBase64;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  onSubmit(): void {
    if (!this.customerForm.valid) {
      Object.keys(this.customerForm.controls).forEach(key => {
        const control = this.customerForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    const requiredPermission = this.isEditMode ? 'Edit Customer' : 'Create Customer';
    if (!this.hasPermission(requiredPermission)) {
      console.error(`Permission denied: ${requiredPermission}`);
      return;
    }

    this.isSubmitting = true;
    const customerData = this.customerForm.value;
    
    const request = this.isEditMode
      ? this.customersService.updateCustomer(this.customerId, customerData)
      : this.customersService.createCustomer(customerData);

    request.subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.router.navigate(['/crm/customers']);
        } else {
          console.error('API Error:', response.message);
        }
      },
      error: (error) => {
        console.error('Error saving customer:', error);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.selectedLogo = base64String.split(',')[1]; // Remove data:image/...;base64,
        this.customerForm.patchValue({ logoBase64: this.selectedLogo });
      };
      reader.readAsDataURL(file);
    }
  }

  goBack(): void {
    this.router.navigate(['/crm/customers']);
  }
}
