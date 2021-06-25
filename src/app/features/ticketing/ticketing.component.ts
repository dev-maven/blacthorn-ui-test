import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss'],
})
export class TicketingComponent implements OnInit {
  donationPrices = [50, 100, 200, 500];
  quantities = [];
  bookPrice = 17.99;
  promoForm = false;
  bookObj = {
    title: 'Book: Good Strategy...',
    price: 17.99,
    total: 0,
  };
  constructor(public ticketService: TicketService) {}

  ngOnInit(): void {
    for (let i = 0; i <= 10; i++) {
      if (!this.quantities.includes(i)) {
        this.quantities.push(i);
      }
    }
  }
}
