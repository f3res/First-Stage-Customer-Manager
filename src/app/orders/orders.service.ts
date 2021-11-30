import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class OrdersService implements Resolve<any>  {


  public onOrdersViewChanged: BehaviorSubject<any>;
  public onOrdersViewCountChanged = new BehaviorSubject({});
  public addedOrdersChanged = new BehaviorSubject({});

  apiData: any;
  tempOrders: any[] = [];


constructor(private http: HttpClient, private _CustomersService: CustomersService) {
  this.onOrdersViewChanged = new BehaviorSubject({});
 }



 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

  let id = Number(route.paramMap.get('id'));
  return new Promise<void>((resolve, reject) => {
    Promise.all([this.getOrdersData(id)]).then(() => {
      resolve();
    }, reject);
  });
}


  getOrdersData(filter?: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get("../../assets/data/orders.json").subscribe(async (response: any) => {
        console.log(filter);

          if (filter) {
            const apiData1 = await response.filter((item: any) =>
            item.customerID == filter
            )
            console.log(apiData1);
            await this.onOrdersViewCountChanged.next(apiData1.length);

            this.apiData = apiData1;

          } else {
            this.apiData = response;
            this.onOrdersViewCountChanged.next(response.length);
          }
        this.onOrdersViewChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}
