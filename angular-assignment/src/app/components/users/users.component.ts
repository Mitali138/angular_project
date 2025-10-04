import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { UserService } from '../../services/user.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  private gridApi!: GridApi;
  
  columnDefs: ColDef[] = [
    { field: 'id', sortable: true, filter: true, width: 90 },
    { field: 'firstName', sortable: true, filter: true },
    { field: 'lastName', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'gender', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    { field: 'birthDate', sortable: true, filter: true },
    { field: 'bloodGroup', sortable: true, filter: true }
  ];

  rowData: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => this.rowData = users,
      error: (err) => console.error(err)
    });
  }
onGridReady(params: any) {
    this.gridApi = params.api;
  }
  onSearch(event: any) {
    const searchValue = event.target.value;
    this.gridApi.setQuickFilter(searchValue);
  }
}
