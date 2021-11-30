import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-cardView',
  templateUrl: './cardView.component.html',
  styleUrls: ['./cardView.component.css']
})
export class CardViewComponent implements OnInit {
  @Output() customerEvent = new EventEmitter<any>();
  @Input() customers: any;


  constructor( ) { }

  ngOnInit() { }

  actionItem(value: any, action: string) {
    this.customerEvent.emit([value, action]);
  }

}
