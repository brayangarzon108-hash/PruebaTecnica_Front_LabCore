import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ApiResponse } from '../../models/application/api-response.model';
import { CustomerOrders } from '../../services/base/customers.service';
import { ServicesInfo } from '../../models/base/services.model';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateServicesDialog } from './create-services-dialog/create-services-dialog';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
})
export class Services {
  displayedColumns: string[] = ['serviceId', 'name', 'hourlyRate', 'countries'];
  infodataSource = new MatTableDataSource<ServicesInfo>([]);
  handleLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(
    private customerService: CustomerOrders,
    private dialogRef: MatDialogRef<Services>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number; customerName: string }
  ) {}

  ngOnInit() {
    this.getServices(this.data.customerId);
  }

  onSearch() {
    this.infodataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.infodataSource.filter = filterValue.trim().toLowerCase();
  }

  getServices(payload: number) {
    this.handleLoading = true;
    this.customerService.getServices(payload).subscribe({
      next: (response: ApiResponse<ServicesInfo[]>) => {
        if (response.status === 200) {
          this.infodataSource.data = response.data;
          console.log(response);
        }
      },
      complete: () => {
        this.handleLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    this.infodataSource.paginator = this.paginator;
    this.infodataSource.sort = this.sort;
  }

  close() {
    this.dialogRef.close();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateServicesDialog, {
      width: '1500px',
      data: { customerId: this.data.customerId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Servicio creado:', result);
        this.getServices(this.data.customerId);
        // TODO: Llamar al servicio backend para guardar
        // this.providerService.create(result).subscribe(...)
      }
    });
  }
}
