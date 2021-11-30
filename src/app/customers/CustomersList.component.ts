import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from './customers.service';


@Component({
  selector: 'app-CustomersList',
  templateUrl: './CustomersList.component.html',
  styleUrls: ['./CustomersList.component.css']
})
export class CustomersListComponent implements OnInit {
  cardView: boolean = true;
  listView: boolean = false;
  jsonData: any;
  page: any;
  paginationSize: any;
  customers: any;

  isDataEmpty: boolean = true;
  submitted: boolean = false;
  customerForm: FormGroup;
  @ViewChild('drawer') drawer: MatSidenav;
  currentCustomer: any;
  filterValue: string = '';

  constructor(
    private _CustomersService: CustomersService,
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {
     this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.page = params['page'];
    });
  }

  ngOnInit() {
    this.paginationSize = this._CustomersService.onCustomerViewCountChanged.value;
    this.changePage();
    this.buildForm();

  }

  ViewLayout(viewT: string) {
    if (viewT === "Card") {this.cardView = true; this.listView = false;}
    if (viewT === "list") {this.cardView = false; this.listView = true;}
  }

  changePage(e?: any) {
    if(e) this.router.navigate(['/Customers/' + e]);
    this._CustomersService.onCustomerViewChanged.subscribe((res) => {
      this.customers = res;
    })
  }




  applyFilter(event: any) {
    this.page = 1;

    const filterValue = (event.target as HTMLInputElement).value;

    this._CustomersService.getCustomersBySearch(filterValue);

    setTimeout(() => {
      this.paginationSize = this._CustomersService.onCustomerViewCountChanged.value;
    }, 100);
  }

  buildForm(data?: any) {
    this.customerForm = this.fb.group({
      first_name: [data ? data.first_name : '', Validators.required],
      last_name: [data ? data.last_name : '', Validators.required],
      six: [data ? data.six : 'male', Validators.required],
      state: [data ? data.state : '', Validators.required],
      city: [data ? data.city : '', Validators.required],
    });
  }

  onsubmit() {
    this.submitted = true;
    var formValue = this.customerForm.value;
     console.log(formValue)
     if (this.customerForm.valid) {
      this._CustomersService.AddCustomer(formValue).then((res) => {
        console.log(res)
        this.paginationSize = res;

        this.drawer.toggle();
        this.router.navigate(['/Customers/1']);

      })
    } else  {
      console.log('Invalid')
    }
  }

  getActionData(e: any) {
    if(e[1] === "edit") {
      console.log(e);

      this.isDataEmpty = false;
      this.currentCustomer = e[0];
      this.drawer.toggle();
      this.buildForm(e[0])
    } else {
      this.deleteCustomer(e[0].id)
    }
  }

  newCustomerSidebar() {
    this.isDataEmpty = true;
    this.buildForm()
    this.drawer.toggle();
    this.buildForm()
  }

  updateCustomer() {
    this.submitted = true;
    this.customerForm.value.id = this.currentCustomer.id;

    if (this.customerForm.valid) {
      this._CustomersService.EditCustomer(this.customerForm.value).then((res) => {
        const objIndex = this.customers.findIndex((customer: { id: number; }) => customer.id ==  this.currentCustomer.id);
        this.customers[objIndex] = this.customerForm.value;
        this.drawer.toggle();
        this.router.navigate(['/Customers/1']);

      })
    } else  {
      console.log('Invalid')
    }
  }

  deleteCustomer(id: number) {

    this._CustomersService.deleteCustomer(id).then((res: any) => {
      this.paginationSize = res.customerCount;
      this.router.navigate(['/Customers/1']);

      console.log(res);
    })
  }

}
