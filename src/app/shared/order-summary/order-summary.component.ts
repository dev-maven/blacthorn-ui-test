import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  constructor(public ticketService: TicketService, private router: Router) {}
  promoForm = false;
  @Input() checkout: boolean;

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/');
  }
}
