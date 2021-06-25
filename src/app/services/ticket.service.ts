import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private router: Router) {}
  tickets: Ticket[] = [
    {
      title: 'Free Ticket',
      deadline: '1 hour',
      description:
        'Free ticket for anyone to make a valuable contribution towards our future online events programme. Thank you.',
      availableTickets: 4,
      price: 0,
    },
    {
      title: 'Alumni Base Ticket',
      deadline: '5 days',
      description:
        'This live stream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
      availableTickets: 3,
      price: 95.99,
    },
    {
      title: 'Alumni VIP Ticket',
      deadline: '5 days',
      description:
        'This live stream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
      availableTickets: 5,
      price: 3500,
    },
    {
      title: 'Platinum Ticket',
      deadline: '7 days',
      description: '',
      availableTickets: 10,
      price: 8000,
    },
  ];

  total = 0;
  tax = 0;
  bookQuantity = 0;
  bookTotal = 0;

  selectedTickets = [];
  waitListItems = [];
  confirmedWaitList = [];
  selectedDonation;
  defaultTicketList = [];

  public addTicket(quantity: number, ticket: Ticket): void {
    if (ticket.availableTickets >= quantity) {
      this.removeTicket(ticket, 'selectedTickets');
      this.removeTicket(ticket, 'waitListTickets');
      this.selectedTickets.push({
        title: ticket.title,
        total: +quantity,
        price: +ticket.price,
        selected: +quantity,
      });
    } else {
      this.removeTicket(ticket, 'selectedTickets');
      this.selectedTickets.push({
        title: ticket.title,
        total: +ticket.availableTickets,
        price: +ticket.price,
        selected: +quantity,
      });
      this.removeTicket(ticket, 'waitListTickets');
      this.waitListItems.push({
        title: ticket.title,
        total: quantity - ticket.availableTickets,
        added: ticket.availableTickets,
        price: +ticket.price,
      });
    }

    this.getTotal();
  }

  showWaitList(title, listType): void {
    switch (listType) {
      case 'waitList':
        return this.waitListItems.find((ticket) => ticket.title === title);

      case 'confirmedWaitList':
        return this.confirmedWaitList.find((ticket) => ticket.title === title);
      default:
        break;
    }
  }

  removeTicket(ticket, listType): void {
    switch (listType) {
      case 'selectedTickets':
        const index = this.selectedTickets.findIndex(
          (savedTicket) => savedTicket.title === ticket.title
        );
        if (index > -1) {
          this.selectedDonation =
            ticket.title === 'Donation' ? 0 : this.selectedDonation;
          this.selectedTickets.splice(index, 1);
        }
        this.getTotal();
        break;

      case 'waitListTickets':
        const waitListIndex = this.waitListItems.findIndex(
          (savedTicket) => savedTicket.title === ticket.title
        );
        if (waitListIndex > -1) {
          this.waitListItems.splice(waitListIndex, 1);
        }
        break;

      case 'confirmedWaitList':
        const confirmedIndex = this.confirmedWaitList.findIndex(
          (savedTicket) => savedTicket.title === ticket.title
        );
        if (confirmedIndex > -1) {
          this.confirmedWaitList.splice(confirmedIndex, 1);
        }
        break;
      default:
        break;
    }
  }

  confirmWaitList(item): void {
    this.confirmedWaitList.push(item);
    this.removeTicket(item, 'waitListTickets');
  }

  getTotal(): void {
    if (this.selectedTickets.length > 0) {
      this.total = this.selectedTickets.reduce(
        (sum, ticket) => sum + ticket.total * ticket.price,
        0
      );
      this.tax = (4.1345 / 100) * this.total;
    } else {
      this.total = 0;
      this.tax = 0;
    }
  }

  getTicketQuantity(item): number {
    const result = this.selectedTickets.find(
      (x) => x.title === item.title
    )?.selected;
    return result > 0 ? result : 0;
  }

  addDonation(donation): void {
    this.selectedDonation = donation;
    const donationObj = {
      title: 'Donation',
      price: this.selectedDonation,
      total: 1,
    };
    this.removeTicket(donationObj, 'selectedTickets');
    this.selectedTickets.push(donationObj);
    this.getTotal();
  }

  addBook(quantity): void {
    const bookObj = {
      title: 'Book: Good Strategy...',
      fullTitle: 'Book: Good Strategy - Bad Strategy',
      price: 17.99,
      total: +quantity,
      selected: +quantity,
    };
    this.removeTicket(bookObj, 'selectedTickets');
    this.selectedTickets.push(bookObj);
    this.getTotal();
  }

  retrieveTicket(): void {
    this.defaultTicketList = this.tickets;
    const tickets = localStorage.getItem('tickets');
    if (tickets) {
      this.selectedTickets = JSON.parse(tickets);
      this.selectedDonation = this.selectedTickets.find(
        (x) => x.title === 'Donation'
      )?.price;
    }
    const waitList = localStorage.getItem('waitList');
    if (waitList) {
      this.confirmedWaitList = JSON.parse(waitList);
    }

    const eventTickets = localStorage.getItem('eventTickets');
    if (eventTickets) {
      this.tickets = JSON.parse(eventTickets);
      this.defaultTicketList = this.tickets;
    }
    this.getTotal();
  }

  checkout(): void {
    if (this.selectedTickets.length > 0) {
      localStorage.setItem('tickets', JSON.stringify(this.selectedTickets));
      localStorage.setItem('waitList', JSON.stringify(this.confirmedWaitList));
      this.router.navigateByUrl('/checkout');
    }
  }

  updateTicket(title: string, newValue: Ticket): void {
    const index = this.tickets.findIndex((x) => x.title === title);
    this.tickets[index] = newValue;
    localStorage.setItem('eventTickets', JSON.stringify(this.tickets));
  }

  addNewTicket(newValue: Ticket): void {
    this.tickets.push(newValue);
    localStorage.setItem('eventTickets', JSON.stringify(this.tickets));
  }

  revertTicket() {
    this.tickets = this.defaultTicketList;
  }
}
