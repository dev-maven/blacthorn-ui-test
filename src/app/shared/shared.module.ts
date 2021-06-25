import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderSummaryComponent],
  exports: [OrderSummaryComponent],
})
export class SharedModule {}
