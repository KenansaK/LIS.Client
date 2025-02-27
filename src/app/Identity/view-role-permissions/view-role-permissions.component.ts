import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissionsService } from '../../services/RolePermissions.service';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { PermissionsService } from '../../services/permissions.service';

interface Permission {
  id: number;
  name: string;
  module: string;
  isGranted: boolean;
}


interface RolePermissionsResponse {
  data: {
    roleName: string;
    permissions: Permission[];
  };
  isSuccess: boolean;
  message: string;
}

@Component({
  selector: 'app-view-role-permissions',
  standalone: false,
  
  templateUrl: './view-role-permissions.component.html',
  styleUrl: './view-role-permissions.component.scss'
})
export class ViewRolePermissionsComponent implements OnInit {
  roleId: number;
  roleName: string = '';
  permissions: Permission[] = [];
  modules: string[] = [];
  selectedModule: string = 'crm';
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private rolePermissionsService: RolePermissionsService,
    private permissionsService: PermissionsService,
    private router: Router
  ) {
    this.roleId = this.route.snapshot.params['id'];
  }



  ngOnInit(): void {
    
    if (!this.hasPermission('View Permissions For Role')) {
      this.router.navigate(['/']);
      return;
    }
    this.loadRolePermissions();
  }

  loadRolePermissions(): void {
    const currentModule = this.selectedModule; // Store current module

    this.permissionsService.getRolePermissionsWithAllForRole(this.roleId).subscribe({
      next: (response) => {
        if (response.isSuccess) {


          this.roleName = response.data.roleName;
          this.permissions = response.data.permissions;
          
          // Get unique modules from the actual permissions
          const uniqueModules = [...new Set(this.permissions
            .map(p => p.module.toLowerCase())
            .filter(m => m !== ''))]
            .sort();
          
          this.modules = uniqueModules;
          
          // Only set selectedModule if it's not already set or if it's not in the modules list
          if (!this.selectedModule || !this.modules.includes(currentModule)) {
            this.selectedModule = this.modules[0];
          } else {
            this.selectedModule = currentModule; // Maintain the current module
          }
        }
      },
      error: (error) => console.error('Error loading permissions:', error)
    });
  }

  getPermissionsByModule(module: string): Permission[] {
    return this.permissions.filter(p => 
      p.module.toLowerCase() === module.toLowerCase()
    );
  }

onPermissionChange(event: any, permission: Permission): void {
  // Store original state before toggling
  const originalState = permission.isGranted;

  // Toggle the permission state
  permission.isGranted = !permission.isGranted;

  // If granting permission
  if (permission.isGranted) {
    if (!this.hasPermission('Assign Permission To Role')) {
      alert("You don't have the required permission!");
      permission.isGranted = originalState; // Revert to original state
      return;
    }

    console.log('Assigning permission');
    this.rolePermissionsService.AssignPermissionToRole(this.roleId, permission.id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log('Permission assigned successfully');
          this.loadRolePermissions();
        } else {
          console.error('Failed to assign permission:', response.message);
          permission.isGranted = originalState;
        }
      },
      error: (error) => {
        console.error('Error assigning permission:', error);
        permission.isGranted = originalState;
      }
    });
  } 
  // If removing permission
  else {
    if (!this.hasPermission('Delete Permission From Role')) {
      alert("You don't have the required permission!");
      permission.isGranted = originalState; // Revert to original state
      return;
    }

    console.log('Removing permission');
    this.rolePermissionsService.deletePermissionFromRole(this.roleId, permission.id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log('Permission removed successfully');
          this.loadRolePermissions();
        } else {
          console.error('Failed to remove permission:', response.message);
          permission.isGranted = originalState;
        }
      },
      error: (error) => {
        console.error('Error removing permission:', error);
        permission.isGranted = originalState;
      }
    });
  }
}


  // Search functionality
  filterPermissions(permissions: Permission[]): Permission[] {
    if (!this.searchTerm) return permissions;
    
    return permissions.filter(permission => 
      permission.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  isPermissionDisabled(permission: Permission): boolean {
    if (permission.isGranted) {
      return !this.hasPermission('Delete Permission From Role');
    }
    return !this.hasPermission('Assign Permission To Role');
  }
  
  getDisabledTooltip(permission: Permission): string {
    if (this.isPermissionDisabled(permission)) {
      return permission.isGranted 
        ? 'You need "Delete Permission From Role" to remove this permission'
        : 'You need "Assign Permission To Role" to grant this permission';
    }
    return '';
  }
}
