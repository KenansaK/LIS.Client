import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityRoutingModule } from './identity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { UserListComponent } from './user-list/user-list.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { ViewRolePermissionsComponent } from './view-role-permissions/view-role-permissions.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';


@NgModule({
  declarations: [
    UserListComponent,
    AddEditUsersComponent,
    RolesListComponent,
    ViewRolePermissionsComponent,
    AddRoleComponent,
    PermissionsListComponent
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class IdentityModule { }
