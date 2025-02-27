import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customer.service';
import { BranchService } from '../../services/branch.service';
import { PermissionsService } from '../../services/permissions.service';
export enum CustomerStatus {
  Active = 1,
  Inactive = 2,
  Deleted = 3,
  Draft = 4
}

export enum BusinessType {
  Individual = 1,
  Company = 2,
  Government = 3,
  NonProfit = 4
}

@Component({
  selector: 'app-customer-details',
  standalone: false,
  
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit {
  customer: any = null;
  branches: any[] = [];
  selectedBranch: any = null;
  CustomerStatus = CustomerStatus;
  BusinessType = BusinessType;
  storedPermissions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customersService: CustomersService,
    private branchService: BranchService,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomerDetails(+id);
      this.loadCustomerBranches(+id);
    }
    const permissionsStr = localStorage.getItem('userPermissions');
    this.storedPermissions = JSON.parse(permissionsStr || '[]');
    console.log('Stored permissions:', this.storedPermissions);
  }

  loadCustomerDetails(id: number): void {
    
    this.customersService.getCustomerById(id).subscribe({
      next: (response) => {
        this.customer = response.data;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
      }
    });
  }

  loadCustomerBranches(customerId: number): void {
    
    this.customersService.getBranchesByCustomerId(customerId).subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  getCustomerStatus(status: number): string {
    switch (status) {
      case CustomerStatus.Active:
        return 'Active';
      case CustomerStatus.Inactive:
        return 'Inactive';
      case CustomerStatus.Deleted:
        return 'Deleted';
      case CustomerStatus.Draft:
        return 'Draft';
      default:
        return 'Unknown';
    }
  }

  getBusinessType(type: number): string {
    switch (type) {
      case BusinessType.Individual:
        return 'Individual';
      case BusinessType.Company:
        return 'Company';
      case BusinessType.Government:
        return 'Government';
      case BusinessType.NonProfit:
        return 'Non-Profit';
      default:
        return 'Unknown';
    }
  }

  getFormattedDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleString();
  }

  viewBranchDetails(branchId: number): void {
    this.router.navigate(['/crm', this.customer.id, 'branches', branchId]);
  }

  editBranch(branchId: number): void {
    this.router.navigate(['/crm/branches/edit', branchId]);
  }
  
  deleteBranch(branchId: number): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.branchService.deleteBranch(branchId).subscribe({
        next: () => {
          // Reload branches after deletion
          this.loadCustomerBranches(this.customer.id);
        },
        error: (error: any) => {
          console.error('Error deleting branch:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['crm/customers']);
  }

  navigateToAddBranch(): void {
    if (this.customer?.id) {
      this.router.navigate(['/crm/branches/add'], {
        queryParams: { customerId: this.customer.id }
      });
    }
  }

  hasPermission(permission: string): boolean {
    const hasPermission = this.permissionsService.hasPermission(permission);
    console.log(`Checking permission: ${permission}, Result: ${hasPermission}`);
    return hasPermission;
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }
}

