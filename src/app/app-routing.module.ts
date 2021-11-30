import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersService } from './customers/customers.service';
import { CustomersListComponent } from './customers/CustomersList.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from './orders/orders.service';

const routes: Routes = [
  { path: 'Customers/:page',
    component: CustomersListComponent,
    resolve: {
      hero: CustomersService
    }
  },
  {
    path: 'Orders',
    component: OrdersComponent,
    resolve: {
      hero: OrdersService
    }
  },
  {
    path: 'Orders/:id',
    component: OrdersComponent,
    resolve: {
      hero: OrdersService
    }
  },
  {
    path: '',
    redirectTo: 'Customers/1',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'Customers/1',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
