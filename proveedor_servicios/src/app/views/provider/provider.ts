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
import { ProviderModel, UserFilter, ReportSummary } from '../../models/base/provider.model';
import { Services } from '../services/services';
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
  displayedColumns: string[] = ['expand', 'id', 'nit', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<ProviderModel>([]);

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
    this.getProvider('');
    this.getDashboard();
  }

  expandedElement: ProviderModel | null = null;

  toggleRow(element: ProviderModel): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpansionDetailRow = (row: ProviderModel) => this.expandedElement === row;

  onSearch() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProvider(payload: string) {
    this.handleLoading = true;
    this.customerService.getProvider(payload).subscribe({
      next: (response: ApiResponse<ProviderModel[]>) => {
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

  getDashboard() {
    this.handleLoading = true;
    this.customerService.getDashboard().subscribe({
      next: (response: ApiResponse<ReportSummary>) => {
        if (response.status === 200) {
          // Convertimos la data para ngx-charts
          this.clientsChartData = response.data.clientsByCountry.map((c) => ({
            name: c.countryName,
            value: c.clientsCount,
          }));

          this.servicesChartData = response.data.servicesByCountry.map((s) => ({
            name: s.countryName,
            value: s.servicesCount,
          }));
        }
      },
      complete: () => {
        this.handleLoading = false;
      },
    });
  }

  openOrdersDialog(customer: ProviderModel) {
    this.dialog.open(Services, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: { customerId: customer.providerId, customerName: customer.name },
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProviderDialogComponent, {
      width: '1500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Proveedor creado:', result);
        this.getProvider('');
        // TODO: Llamar al servicio backend para guardar
        // this.providerService.create(result).subscribe(...)
      }
    });
  }

  //openNewOrdersDialog(customer: OrderPrediction) {
  //this.dialog.open(NewOrderComponent, {
  //width: '1500px',
  //data: { customerId: customer.customerId, customerName: customer.customerName },
  //});
  //}
}
