import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

export const routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
