import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns = [
    'name',
    'price',
    'availableTickets',
    'description',
    'actions',
  ];
  ticketForm: FormGroup;
  text = '';
  buttonCaption = '';
  selectedTicket = '';
  quantities = [];
  showTable = true;

  constructor(public ticketService: TicketService, private fb: FormBuilder) {}

  ngOnInit(): void {
    for (let i = 0; i <= 10; i++) {
      if (!this.quantities.includes(i)) {
        this.quantities.push(i);
      }
    }
  }

  // doFilter(filterValue: string): void {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  edit(row): void {
    this.selectedTicket = row.title;
    this.ticketForm = this.populateForm(row);
    this.text = 'Edit Ticket';
    this.buttonCaption = 'Update';
    this.showTable = false;
  }

  add(): void {
    this.ticketForm = this.createForm();
    this.text = 'Add Ticket';
    this.buttonCaption = 'Create';
    this.showTable = false;
  }

  populateForm(ticket: Ticket): FormGroup {
    return this.fb.group({
      title: [ticket.title, Validators.required],
      description: [ticket.description],
      price: [ticket.price, Validators.required],
      availableTickets: [ticket.availableTickets, Validators.required],
      deadline: [ticket.deadline, Validators.required],
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      availableTickets: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.selectedTicket) {
      this.ticketService.updateTicket(
        this.selectedTicket,
        this.ticketForm.value
      );
      this.showTable = true;
    } else {
      this.ticketService.addNewTicket(this.ticketForm.value);
      this.showTable = true;
    }
  }

  quantitySelected(value: number): void {
    this.ticketForm.patchValue({
      availableTickets: value,
    });
  }
}
