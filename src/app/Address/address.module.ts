import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressRoutingModule } from './address-routing.module';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { AddressDetailsComponent } from './address-details/address-details.component';

@NgModule({
  declarations: [
    AddEditAddressComponent,
    AddressDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class AddressModule { } 