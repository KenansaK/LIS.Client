import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { PermissionsService } from '../../services/permissions.service';
@Component({
  selector: 'app-roles-list',
  standalone: false,
  
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent implements OnInit {
  roles: any[] = [];

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private dialog: MatDialog,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit(): void {
    if (!this.hasPermission('View Role')) {
      this.router.navigate(['/']);
      return;
    }
    this.loadRoles();
  }

  loadRoles(): void {
    if (!this.hasPermission('View Role')) {
      this.router.navigate(['/']);
      return;
    }
    this.rolesService.getRoles().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.roles = response.data;

        }
      },
      error: (error) => console.error('Error loading roles:', error)
    });
  }

  viewPermissions(roleId: number): void {
    if (!this.hasPermission('View Permission')) {
      this.router.navigate(['/']);
      return;
    }
    // Navigate to permissions page (implement this later)
    this.router.navigate([`/accounts/roles/permissions/${roleId}`]);
  }
  addRole(): void {
    if (!this.hasPermission('Create Role')) {
      this.router.navigate(['/']);
      return;
    }
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRoles(); // Refresh the roles list
      }
    });
  }
  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
