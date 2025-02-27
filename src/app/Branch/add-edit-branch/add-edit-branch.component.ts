import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';
import { PermissionsService } from '../../services/permissions.service';
import { WeightUnit, DimensionUnit, Currency, BranchStatus } from '../../interfaces/branch.interface';

interface EnumOption {
  name: string;
  value: number;
}

@Component({
  selector: 'app-branch-add-edit',
  standalone: false,
  templateUrl: './add-edit-branch.component.html',
  styleUrl: './add-edit-branch.component.scss'
})
export class AddEditBranchComponent implements OnInit {
  branchForm!: FormGroup;
  isEditMode = false;
  branchId: number | null = null;
  customerId: number | null = null;

  // Create arrays of enum options
  weightUnits: EnumOption[] = [];
  dimensionUnits: EnumOption[] = [];
  currencies: EnumOption[] = [];
  statusOptions: EnumOption[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private permissionsService: PermissionsService
  ) {
    // Check if edit mode first
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.branchId = +id;
      console.log('Edit mode activated for branch ID:', id);
    }

    // Initialize enums
    this.weightUnits = this.getEnumOptions(WeightUnit);
    this.dimensionUnits = this.getEnumOptions(DimensionUnit);
    this.currencies = this.getEnumOptions(Currency);
    this.statusOptions = this.getEnumOptions(BranchStatus);

    // Initialize form
    this.initForm();
  }

  private initForm(): void {
    this.branchForm = this.fb.group({
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      currencyCode: [null, Validators.required],
      consolidationQuery: ['', Validators.required],
      vatNumber: ['', Validators.required],
      eori: ['', Validators.required],
      ioss: ['', Validators.required],
      status: [BranchStatus.Active, Validators.required],
      licenseRegistrationNumber: ['', Validators.required],
      gpi: ['', Validators.required],
      externalCode: ['', Validators.required],
      billingExternalCode: ['', Validators.required],
      allowedCODCurencies: [null, Validators.required],
      weightUnit: [null, Validators.required],
      dimensionUnit: [null, Validators.required],
      productService: ['', Validators.required],
      productTypeCode: ['', Validators.required],
      shipmentService: ['', Validators.required],
      supplierCode: ['', Validators.required],
      customerCode: ['', Validators.required],
      customerId: [null, Validators.required]
    });
  }

  private getEnumOptions(enumObj: any): EnumOption[] {
    return Object.entries(enumObj)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({
        name: key,
        value: value as number
      }));
  }

  hasRequiredPermission(): boolean {
    const requiredPermission = this.isEditMode ? 'Edit Branch' : 'Create Branch';
    console.log('Checking permission:', requiredPermission); // Debug log
    return this.permissionsService.hasPermission(requiredPermission);
  }

  ngOnInit(): void {
    // Check permissions
    if (!this.hasRequiredPermission()) {
      console.log('Permission denied');
      return;
    }

    // Get customerId from query params
    this.route.queryParams.subscribe(params => {
      if (params['customerId']) {
        this.customerId = Number(params['customerId']);
        this.branchForm.patchValue({
          customerId: this.customerId
        });
      }
    });

    // Load data if in edit mode
    if (this.isEditMode && this.branchId) {
      this.loadBranchData(this.branchId);
    }
  }

  loadBranchData(id: number): void {
    this.branchService.getBranchById(id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.branchForm.patchValue(response.data);
          this.customerId = response.data.customerId;
        }
      },
      error: (error) => {
        console.error('Error loading branch:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const branchData = {
        ...this.branchForm.value,
        id: this.isEditMode ? this.branchId : 0
      };
      
      if (this.isEditMode && this.branchId) {
        this.branchService.updateBranch(this.branchId, branchData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.router.navigate(['/crm/customers/details', this.customerId]);
            }
          },
          error: (error) => {
            console.error('Error updating branch:', error);
          }
        });
      } else {
        this.branchService.createBranch(branchData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.router.navigate(['/crm/customers/details', this.customerId]);
            }
          },
          error: (error) => {
            console.error('Error creating branch:', error);
          }
        });
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.branchForm.controls).forEach(key => {
        const control = this.branchForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/crm/customers/details', this.customerId]);
  }
  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }
} 