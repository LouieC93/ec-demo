import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: ':lang', children: [
      { path: 'payment', loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule) }
    ]
  },
  {
    path: '**',
    redirectTo: 'en/payment',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
