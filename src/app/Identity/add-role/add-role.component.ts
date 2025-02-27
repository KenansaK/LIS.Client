import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { PermissionsService } from '../../services/permissions.service';
@Component({
  selector: 'app-add-role',
  standalone: false,

  
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {
  roleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRoleComponent>,
    private rolesService: RolesService,
    private router: Router,
    private permissionsService: PermissionsService

  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (!this.hasPermission('Create Role')) {
      this.router.navigate(['/']);
      return;
    }
    if (this.roleForm.valid) {
      
      this.rolesService.createRole(this.roleForm.value).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.dialogRef.close(response.data);

          }
        },
        error: (error) => console.error('Error creating role:', error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
