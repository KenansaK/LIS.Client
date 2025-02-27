import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { AddressDetailsComponent } from './address-details/address-details.component';

const routes: Routes = [
  { path: 'add', component: AddEditAddressComponent },
  { path: 'edit/:id', component: AddEditAddressComponent },
  { path: 'details/:id', component: AddressDetailsComponent },
  { path: ':addressId', component: AddressDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { } 