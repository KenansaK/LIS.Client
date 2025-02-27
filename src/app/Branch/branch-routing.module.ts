import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBranchComponent } from './add-edit-branch/add-edit-branch.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';

const routes: Routes = [
  { path: 'add', component: AddEditBranchComponent },
  { path: 'edit/:id', component: AddEditBranchComponent },
  { path: 'details/:id', component: BranchDetailsComponent },
  {
    path: ':branchId/addresses',
    loadChildren: () => import('../Address/address.module').then((m) => m.AddressModule),
  },
  {
    path: ':branchId',
    component: BranchDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { } 