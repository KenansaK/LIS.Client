import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customer.service';
import { PermissionsService } from '../../services/permissions.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface Customer {
  id: number;
  companyCommercialName: string;
  companyLegalName: string;
  businessType: number;
  customerCode: string;
  customerNumber: string;
  registrationNumber: string;
  status: number;
  billingExternalCode: string;
  externalCode: string;
  storeBarcodePrefix: string;
  logoBase64: string;
}

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomersListComponent implements OnInit {
  customers: Customer[] = [];
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 1;
  sortColumn = 'Id';
  sortAscending = true;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  displayedColumns: string[] = [
    'companyCommercialName',
    'customerCode',
    'registrationNumber',
    'status',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private permissionsService: PermissionsService
  ) {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.pageIndex = 1;
      this.loadCustomers();
    });
  }

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  ngOnInit() {
    if (!this.hasPermission('View Customer')) {
      this.router.navigate(['/']);
      return;
    }
    this.loadCustomers();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  onSort(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortAscending = sort.direction === 'asc';
    this.loadCustomers();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadCustomers();
  }

  private loadCustomers(): void {
    if (!this.hasPermission('View Customer')) return;

    const query = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm,
      sortColumn: this.sortColumn,
      sortAscending: this.sortAscending
    };

    this.customersService.getPaginatedCustomers(query).subscribe({
      next: (response) => {
        this.customers = response.data.customers;
        this.totalRecords = response.data.totalRecords;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Active';
      case 2:
        return 'Inactive';
      case 3:
        return 'Deleted';
      case 4:
        return 'Draft';
      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'active';
      case 2:
        return 'inactive';
      case 3:
        return 'deleted';
      case 4:
        return 'draft';
      default:
        return '';
    }
  }

  addCustomer() {
    if (!this.hasPermission('Create Customer')) return;
    this.router.navigate(['/crm/customers/add']);
  }

  viewDetails(id: number) {
    if (!this.hasPermission('View Customer')) return;
    this.router.navigate([`/crm/customers/details/${id}`]);
  }

  editCustomer(id: number) {
    if (!this.hasPermission('Edit Customer')) return;
    this.router.navigate([`/crm/customers/edit/${id}`]);
  }

  deleteCustomer(id: number) {
    if (!this.hasPermission('Delete Customer')) return;
    
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
        }
      });
    }
  }
}
