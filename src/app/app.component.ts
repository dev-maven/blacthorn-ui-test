import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
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
  currentUrl: string;

  constructor(
    private ticketService: TicketService,
    public router: Router,
    location: PlatformLocation
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
        location.onPopState(() => {
          window.location.reload();
        });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    this.ticketService.retrieveTicket();
  }

  goToAdmin(): void {
    this.router.navigateByUrl('/admin');
  }
  goToClient(): void {
    this.router.navigateByUrl('/');
  }
}
