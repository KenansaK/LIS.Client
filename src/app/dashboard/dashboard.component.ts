import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../services/customer.service';
import { PermissionsService } from '../services/permissions.service';
import { DashboardStats } from '../models/dashboard-stats.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalCustomers: 0,
    activeCustomers: 0,
    draftCustomers: 0,
    inactiveCustomers: 0,
    recentCustomers: []
  };
  loading = true;
  error: string | null = null;

  constructor(
    private customerService: CustomersService,
    private permissionsService: PermissionsService,
    private router: Router
  ) {}

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  ngOnInit(): void {
    if (!this.hasPermission('View Customer')) {
      console.log('Permission denied: View Customer');
      this.router.navigate(['/']);
      return;
    }

    this.loadDashboardStats();
  }

  private loadDashboardStats(): void {
    if (!this.hasPermission('View Customer')) return;

    this.loading = true;
    this.customerService.getPaginatedCustomers({
      pageIndex: 1,
      pageSize: 100000,
      searchTerm: "",
      sortColumn: "",
      sortAscending: true
    }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.stats = {
            totalCustomers: response.data.totalRecords,
            activeCustomers: response.data.customers.filter(c => c.status === 1).length,
            inactiveCustomers: response.data.customers.filter(c => c.status === 2).length,
            draftCustomers: response.data.customers.filter(c => c.status === 4).length,
            recentCustomers: response.data.customers.map(c => ({
              id: c.id,
              companyCommercialName: c.companyCommercialName,
              customerCode: c.customerCode,
              status: c.status
            }))
          };
        } else {
          this.error = response.message || 'Failed to load dashboard stats';
        }
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        this.error = 'An error occurred while loading the dashboard';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'active';
      case 2: return 'inactive';
      case 3: return 'deleted';
      case 4: return 'draft';
      default: return '';
    }
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1: return 'Active';
      case 2: return 'Inactive';
      case 3: return 'Deleted';
      case 4: return 'Draft';
      default: return 'Unknown';
    }
  }
} 