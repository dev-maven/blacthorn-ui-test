import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  ticketGroup;
  bookGroup;
  countries = [
    'United States',
    'United Kingdom',
    'China',
    'North Korea',
    'Germany',
    'Spain',
    'Canada',
    'South Africa',
    'Nigeria',
    'Switzerland',
  ];
  constructor(private fb: FormBuilder, private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketGroup = this.fb.array([]);
    this.bookGroup = this.fb.array([]);
    if (this.ticketService.selectedTickets.length > 0) {
      // Populate forms with Tickets
      this.ticketService.selectedTickets.forEach((element) => {
        if (element.title !== 'Donation' && !element.title.includes('Book')) {
          for (let i = 0; i < element.total; i++) {
            this.populateTicketForm(element);
          }
        } else if (element.title.includes('Book')) {
          for (let i = 0; i < element.total; i++) {
            this.populateBookForm(element);
          }
        }
      });
    }
  }

  populateTicketForm(ticket): void {
    this.ticketGroup.push(
      this.fb.group({
        ticketName: [ticket.title],
        firstName: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        lastName: ['', Validators.required, Validators.email],
        jobTitle: [''],
        company: [''],
        country: [''],
        price: [ticket.price],
      })
    );
  }

  populateBookForm(ticket): void {
    this.bookGroup.push(
      this.fb.group({
        ticketName: [ticket.fullTitle],
        firstName: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        lastName: ['', Validators.required, Validators.email],
        jobTitle: [''],
        company: [''],
        country: [''],
        price: [ticket.price],
        deliveryAddress: ['', Validators.required],
      })
    );
  }
}
