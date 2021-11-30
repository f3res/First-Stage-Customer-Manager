import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class CustomersService implements Resolve<any>  {


  public onCustomerViewChanged: BehaviorSubject<any>;
  public onCustomerViewCountChanged = new BehaviorSubject({});
  public addedCustomersChanged = new BehaviorSubject({});
  public AllCustomer = new BehaviorSubject({});

  apiData: any;
  tempCustomers: any;
  Customers: any;
  page: number;
  customers: any[];
  newTempCustomers: any;
  newSearchCustomers: any;


constructor(private http: HttpClient) {
  this.onCustomerViewChanged = new BehaviorSubject({});
  this.onCustomerViewCountChanged = new BehaviorSubject({});
  this.addedCustomersChanged = new BehaviorSubject({});
  this.AllCustomer = new BehaviorSubject({});

 }



 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
   console.log(route);
   let page = Number(route.paramMap.get('page'));
  return new Promise<void>((resolve, reject) => {
    Promise.all([this.getCustomersPagination(page)]).then(() => {
      resolve();
    }, reject);
  });
}

  getAllCustomer(): Promise<any[]>  {
    return new Promise((resolve, reject) => {
      this.http.get("../../assets/data/customers.json").subscribe((response: any) => {
        this.tempCustomers = response
        resolve(this.tempCustomers);
      }, reject);
    });

  }

  getCustomersPagination(page: number): Promise<any[]> {
    this.page = page;
    return new Promise((resolve, reject) => {
      this.getAllCustomer().then(async (res: any) => {
        console.log(this.tempCustomers)
            if (this.newSearchCustomers && this.newSearchCustomers.length) {var apiData: any = this.newSearchCustomers}
            else if (this.newTempCustomers && this.newTempCustomers.length) {var apiData: any = this.newTempCustomers}
            else {var apiData = res; this.newTempCustomers =  res }
            this.apiData = apiData.slice(((page - 1) * 10), (page * 10));
            this.onCustomerViewCountChanged.next(apiData.length);

        this.onCustomerViewChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  async getCustomersBySearch(query: string) {
    const filterVal = query.toLowerCase();

    if (
      this.newTempCustomers && this.newTempCustomers.length) {var apiData: any = this.newTempCustomers
    } else {
      var apiData = this.tempCustomers
     }

    var filteredCustomers = await apiData.filter((item: any) =>
    (item.first_name.toLowerCase() + ' ' + item.last_name.toLowerCase()).includes(filterVal)
    );

    this.newSearchCustomers = filteredCustomers;
    this.onCustomerViewCountChanged.next(this.newSearchCustomers.length);

    this.customers = filteredCustomers.slice(((this.page - 1) * 10), (this.page * 10));

    this.onCustomerViewChanged.next(this.customers);
  }

  async AddCustomer(query: any) {
    console.log(query);
    query.id = await this.tempCustomers.length + 1;

    return new Promise(async (resolve, reject) => {
       await this.newTempCustomers.unshift(query);
      console.log( this.newTempCustomers);

      this.newSearchCustomers = [];
      this.customers =  this.newTempCustomers.slice(((this.page - 1) * 10), (this.page * 10));

      this.onCustomerViewChanged.next(this.customers);
      this.onCustomerViewCountChanged.next(this.newTempCustomers.length);

      resolve(this.newTempCustomers.length);
      });
  }

  EditCustomer(query: any) {
    return new Promise((resolve, reject) => {
      const objIndex = this.tempCustomers.findIndex((customer: any) => customer.id == query.id);
      this.tempCustomers[objIndex] = query;
      this.newSearchCustomers = [];

      this.customers =  this.tempCustomers.slice(((this.page - 1) * 10), (this.page * 10));

      this.onCustomerViewChanged.next(this.customers);


      resolve(this.tempCustomers);
      });
  }
  deleteCustomer(id: number) {
    return new Promise(async (resolve, reject) => {
      const objIndex = this.newTempCustomers.findIndex((customer: any) => customer.id === id);
      if (objIndex !== -1) await this.newTempCustomers.splice(objIndex, 1);

      this.customers =  this.newTempCustomers.slice(((this.page - 1) * 10), (this.page * 10));
      this.newSearchCustomers = [];

      this.onCustomerViewChanged.next(this.customers);

      resolve({success: true, customerCount: this.tempCustomers.length});
      });
  }

}
