import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private ticketService: TicketService) {}
  title = 'blacthorn-ui-test';

  ngOnInit(): void {
    this.ticketService.retrieveTicket();
  }
}
