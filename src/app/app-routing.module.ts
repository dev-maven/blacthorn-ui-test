import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/ticketing/ticketing.module').then(
        (module) => module.TicketingModule
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(
        (module) => module.CheckoutModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(
        (module) => module.AdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
