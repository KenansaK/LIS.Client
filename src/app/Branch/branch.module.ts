import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

import { AddEditBranchComponent } from './add-edit-branch/add-edit-branch.component';

@NgModule({
  declarations: [
    AddEditBranchComponent,
    BranchDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BranchRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MaterialModule,
    MatSelectModule,
    SharedModule
  ],
  exports: [
    BranchDetailsComponent
  ]
})
export class BranchModule { } 