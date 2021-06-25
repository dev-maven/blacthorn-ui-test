import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatFormField,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
