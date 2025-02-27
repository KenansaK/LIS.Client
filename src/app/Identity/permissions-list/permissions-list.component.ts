import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PermissionsService } from '../../services/permissions.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-permissions-list',
  standalone: false,


  
  templateUrl: './permissions-list.component.html',
  styleUrl: './permissions-list.component.scss'
})
export class PermissionsListComponent implements OnInit {
  displayedColumns: string[] = ['permissionName', 'permissionCode', 'module'];
  dataSource: MatTableDataSource<any>;
  pageSize = 25;
  pageIndex = 1;
  totalRecords = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private permissionsService: PermissionsService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }



  ngOnInit(): void {
    if (!this.hasPermission('View Permission')) {
      this.router.navigate(['/']);
      return;
    }
    this.loadPermissions();
  }

  loadPermissions(): void {
    if (!this.hasPermission('View Permission')) {
      this.router.navigate(['/']);
      return;
    }
    this.permissionsService.getPermissions().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.dataSource.data = response.data;

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.totalRecords = response.data.length;
        }
      },
      error: (error) => console.error('Error loading permissions:', error)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
  }
  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
