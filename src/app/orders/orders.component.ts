import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  paginationSize: any;
  orders: any

  constructor(
    private _OrdersService: OrdersService,
  ) {
  }

  ngOnInit() {
    this.getOrdersData();
  }

  getOrdersData() {
      this._OrdersService.onOrdersViewChanged.subscribe((res) => {
        this.orders = res;
      });

    this.paginationSize = this._OrdersService.onOrdersViewCountChanged.value;

}
}
