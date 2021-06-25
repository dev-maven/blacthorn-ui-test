import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingComponent } from './ticketing.component';
import { TicketingRoutingModule } from './ticketing-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, TicketingRoutingModule, FormsModule, SharedModule],
  declarations: [TicketingComponent],
})
export class TicketingModule {}
