import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    component: CustomersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/details/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/add',
    component: AddEditCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/edit/:id',
    component: AddEditCustomerComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: ':customerId/branches',
    loadChildren: () => import('../Branch/branch.module').then((m) => m.BranchModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
