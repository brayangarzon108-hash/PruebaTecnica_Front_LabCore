import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiResponse } from '../../models/application/api-response.model';
import { CustomerOrders } from '../../services/base/customers.service';
import { PatienstModel, UserFilter, ReportSummary } from '../../models/base/provider.model';
import { CreateProviderDialogComponent } from './create-provider-dialog/create-provider-dialog';
import { AuthService } from '../../services/auth/auth.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

//import { NewOrderComponent } from '../customer-neworders-dialog/customer-neworders-dialog';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgxChartsModule,
  ],
  templateUrl: './provider.html',
  styleUrls: ['./provider.scss'],
})
export class Provider implements OnInit {
  displayedColumns: string[] = [
    'id',
    'descdocument',
    'document',
    'name',
    'lastname',
    'email',
    'phone',
    'actions',
  ];
  dataSource = new MatTableDataSource<PatienstModel>([]);
  checked: boolean = false;
  dataRow!: PatienstModel | null;

  summary?: ReportSummary;

  clientsChartData: any[] = [];
  servicesChartData: any[] = [];

  view: [number, number] = [600, 300]; // tamaño gráfico
  showLegend = true;
  showLabels = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';
  handleLoading: boolean = false;
  row: any;

  constructor(private customerService: CustomerOrders, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPatienst('');
  }

  onSearch() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.getPatienst(filterValue);
  }

  getPatienst(payload: string) {
    this.handleLoading = true;
    this.customerService.getPatienst(payload).subscribe({
      next: (response: ApiResponse<PatienstModel[]>) => {
        if (response.status === 200) {
          this.dataSource.data = response.data;

          // Aseguramos que paginator y sort se re-asignen
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(response);
        }
      },
      complete: () => {
        this.handleLoading = false;
      },
    });
  }

  openCreateDialog(dataRow: PatienstModel | null, visibility: boolean) {
    const dialogRef = this.dialog.open(CreateProviderDialogComponent, {
      width: '1500px',
      data: { dataInfo: dataRow, visibility: visibility },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Proveedor creado:', result);
        this.getPatienst('');
      }
    });
  }
}
