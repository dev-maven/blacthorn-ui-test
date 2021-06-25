import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketingComponent } from './ticketing.component';

export const routes = [
  { path: '', component: TicketingComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketingRoutingModule {}
