import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns = ['name', 'price', 'quantity', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set page(
    paginator: MatPaginator
  ) {
    this.dataSource.paginator = paginator;
  }
  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    if (this.ticketService.tickets.length > 0) {
      this.dataSource.data = this.ticketService.tickets;
    }
  }
}
