import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUsersComponent } from '../add-edit-users/add-edit-users.component';
import { RolesService } from '../../services/roles.service';
import { PermissionsService } from '../../services/permissions.service';
@Component({
  selector: 'app-user-list',
  standalone: false,
  
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 1;
  sortColumn = 'Id';
  sortAscending = true;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  loading = false;

  displayedColumns: string[] = [
    'username',
    'fullName',
    'email',
    'phoneNumber',
    'role',
    'status',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private rolesService: RolesService,
    private permissionsService: PermissionsService
  ) {
    this.searchSubject.pipe(
      debounceTime(300),

      distinctUntilChanged()
    ).subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  loadRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.roles = response.data;
          this.loadUsers();
        }
      }
    });
  }

  getRoleName(roleId: number): string {
    const numericRoleId = Number(roleId);
    const role = this.roles.find(r => r.id === numericRoleId);
    
    return role.name;
  }

  loadUsers(): void {
    const query = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm,
      sortColumn: this.sortColumn,
      sortAscending: this.sortAscending
    };

    this.usersService.getPaginatedUsers(query).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.users = response.data.users;
          this.totalRecords = response.data.totalRecords;
        }
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  onSort(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortAscending = sort.direction === 'asc';
    this.loadUsers();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadUsers();
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

  getStatusClass(status: number): string {
    switch (status) {
      case 1: return 'active';
      case 2: return 'inactive';
      case 3: return 'deleted';
      case 4: return 'draft';
      default: return '';
    }
  }

  addUser(): void {
    if (!this.permissionsService.hasPermission('Create User')) {
      console.log('Permission denied: Create User');
      return;
    }

    const dialogRef = this.dialog.open(AddEditUsersComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  editUser(userId: number): void {
    if (!this.permissionsService.hasPermission('Edit User')) {
      console.log('Permission denied: Edit User');
      return;
    }

    this.usersService.getUserById(userId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const dialogRef = this.dialog.open(AddEditUsersComponent, {
            width: '600px',
            data: response.data
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.loadUsers();
            }
          });
        }
      },
      error: (error) => {
        console.error('Error loading user details:', error);
      }
    });
  }

  deleteUser(id: number): void {
    if (!this.permissionsService.hasPermission('Delete User')) {
      console.log('Permission denied: Delete User');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.loadUsers();
          }
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
