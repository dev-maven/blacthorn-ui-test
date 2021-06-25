import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blacthorn-ui-test';
  showLoadingIndicator = true;

  constructor(private ticketService: TicketService, public router: Router) {}

  ngOnInit(): void {
    timer(2000).subscribe(() => (this.showLoadingIndicator = false));
    this.ticketService.retrieveTicket();
  }

  goToAdmin(): void {
    this.router.navigateByUrl('/admin');
  }
  goToClient(): void {
    this.router.navigateByUrl('/');
  }
}
