import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CustomersListComponent } from './customers/CustomersList.component';



import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewComponent } from './customers/cardView/cardView.component';
import { ListViewComponent } from './customers/listView/listView.component';
import { CustomersService } from './customers/customers.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from './orders/orders.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    CardViewComponent,
    ListViewComponent,
    OrdersComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatMenuModule
    ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomersService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
