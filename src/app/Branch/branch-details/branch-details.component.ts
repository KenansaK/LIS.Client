import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';
import { AddressService } from '../../services/address.service';
import { PermissionsService } from '../../services/permissions.service';
import { WeightUnit, DimensionUnit, Currency, BranchStatus, Country, getCountryName } from '../../interfaces/branch.interface';

interface EnumOption {
  name: string;
  value: number;
}

@Component({
  selector: 'app-branch-details',
  standalone: false,
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.scss'
})
export class BranchDetailsComponent implements OnInit {
  branch: any = null;
  addresses: any[] = [];
  loading = true;
  error: string | null = null;
  customerId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private addressService: AddressService,
    private permissionsService: PermissionsService
  ) {}

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  ngOnInit(): void {
    // Check if user has permission to view branch details
    if (!this.hasPermission('View Branch')) {
      console.log('Permission denied: View Branch');
      this.router.navigate(['/']);
      return;
    }

    const branchId = this.route.snapshot.paramMap.get('branchId');
    if (branchId) {
      this.loadBranchDetails(+branchId);
    }
  }

  private loadBranchDetails(id: number): void {
    if (!this.hasPermission('View Branch')) return;

    this.branchService.getBranchById(id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.branch = response.data;
          this.customerId = response.data.customerId;
          // Convert enum values to readable strings
          this.branch.weightUnitName = WeightUnit[this.branch.weightUnit];
          this.branch.dimensionUnitName = DimensionUnit[this.branch.dimensionUnit];
          this.branch.currencyCodeName = Currency[this.branch.currencyCode];
          this.branch.statusName = BranchStatus[this.branch.status];
          this.branch.allowedCODCurenciesName = Currency[this.branch.allowedCODCurencies];
          
          if (this.hasPermission('View Address')) {
            this.loadBranchAddresses(id);
          }
        } else {
          this.error = response.message;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading branch:', error);
        this.error = 'Failed to load branch details';
        this.loading = false;
      }
    });
  }

  loadBranchAddresses(branchId: number): void {
    if (!this.hasPermission('View Address')) return;

    this.branchService.getAddressesByBranchId(branchId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.addresses = response.data.map((address: any) => ({
            ...address,
            countryName: getCountryName(Number(address.country))
          }));
        } else {
          console.error('Failed to load addresses:', response.message);
        }
      },
      error: (error) => {
        console.error('Error loading addresses:', error);
      }
    });
  }

  // Helper method to get country name directly in template if needed
  getCountryName(countryCode: number): string {
    return getCountryName(countryCode);
  }

  goBack(): void {
    this.router.navigate(['/crm/customers/details', this.customerId]);
  }

  viewAddressDetails(addressId: number): void {
    if (!this.hasPermission('View Address')) return;

    this.router.navigate(['/crm/branches', this.branch.id, 'addresses', addressId], {
      queryParams: { customerId: this.customerId }
    });
  }

  deleteAddress(addressId: number): void {
    if (!this.hasPermission('Delete Address')) return;

    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(addressId).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.loadBranchAddresses(this.branch.id);
          } else {
            console.error('Failed to delete address:', response.message);
          }
        },
        error: (error) => {
          console.error('Error deleting address:', error);
        }
      });
    }
  }

  navigateToAddAddress(): void {
    if (!this.hasPermission('Create Address')) return;

    this.router.navigate([`/crm/branches/${this.branch.id}/addresses/add`], {
      queryParams: { customerId: this.customerId }
    });
  }

  editAddress(addressId: number): void {
    if (!this.hasPermission('Edit Address')) return;

    this.router.navigate(['/crm/branches', this.branch.id, 'addresses', 'edit', addressId], {
      queryParams: { customerId: this.customerId }
    });
  }
} 