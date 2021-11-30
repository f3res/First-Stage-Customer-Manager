import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-listView',
  templateUrl: './listView.component.html',
  styleUrls: ['./listView.component.css']
})
export class ListViewComponent implements OnInit {
  @Output() customerEvent = new EventEmitter<string>();
  @Input() customers: any;

  constructor( ) {
   }

  ngOnInit() {
  }

  editItem(value: string) {
    this.customerEvent.emit(value);
  }
}
