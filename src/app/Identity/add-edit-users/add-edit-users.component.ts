import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { RolesService } from '../../services/roles.service';
import { PermissionsService } from '../../services/permissions.service';
@Component({
  selector: 'app-add-edit-users',
  standalone: false,
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  dialogTitle: string;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<AddEditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rolesService: RolesService,
    private permissionsService: PermissionsService
  ) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Edit User' : 'Add User';

    
    this.form = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10,15}$/) // Accepts phone numbers between 10 and 15 digits
      ]],
      password: ['', this.isEditMode ? [] : Validators.required],
      roleId: ['', Validators.required],
      status: [1, Validators.required]
    });

    if (this.isEditMode && this.data) {
      console.log('Edit Mode Data:', this.data);
      this.form.patchValue({
        username: this.data.userName || this.data.username,
        fullName: this.data.fullName,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
        roleId: this.data.roleId,
        status: this.data.status || 1
      });

      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    // Load roles first
    this.rolesService.getRoles().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.roles = response.data;

          
          // After roles are loaded, set the form values
          if (this.isEditMode && this.data) {
            this.form.patchValue({
              username: this.data.username,
              fullName: this.data.fullName,
              email: this.data.email,
              phoneNumber: this.data.phoneNumber,
              roleId: this.data.roleId,  // This should now work since roles are loaded
              status: this.data.status
            });

            console.log('Form Values:', this.form.value);
            console.log('User Data:', this.data);
            console.log('Available Roles:', this.roles);
          } else if (this.roles.length > 0) {
            // Set default role for new users
            this.form.patchValue({ roleId: this.roles[0].id });
          }
        }
      },
      error: (error) => {
        console.error('Error loading roles:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userData = this.form.value;
      
      if (this.isEditMode) {
        this.usersService.updateUser(this.data.id, userData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.dialogRef.close(true);
            }
          },
          error: (error) => console.error('Error updating user:', error)
        });
      } else {
        this.usersService.createUser(userData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.dialogRef.close(true);
            }
          },
          error: (error) => console.error('Error creating user:', error)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
