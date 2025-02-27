import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { ViewRolePermissionsComponent } from './view-role-permissions/view-role-permissions.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  // We'll add these components later
  { path: 'roles', component: RolesListComponent },
  {
    path: 'roles/permissions/:id',
    component: ViewRolePermissionsComponent
  },
  {
    path: 'permissions',
    component: PermissionsListComponent
  },
  // { path: 'permissions', component: PermissionListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
