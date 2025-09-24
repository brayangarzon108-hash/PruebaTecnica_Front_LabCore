import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PatienstRequest, DynamicFieldRequest } from '../../../models/base/provider.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from '../../../models/application/api-response.model';
import { CustomerOrders } from '../../../services/base/customers.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
import { MatTreeNodePadding } from '@angular/material/tree';
import { PatienstModel, UserFilter, ReportSummary } from '../../../models/base/provider.model';

@Component({
  selector: 'app-create-provider-dialog',
  templateUrl: './create-provider-dialog.html',
  styleUrls: ['./create-provider-dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    provideNativeDateAdapter(), // 👈 Esto resuelve tu error
  ],
})
export class CreateProviderDialogComponent {
  providerForm!: FormGroup;
  cities: any[] = [];
  modeModal: boolean = false;
  documentTypes = [
    { valueId: 1, value: 'CC', viewValue: 'Cédula de Ciudadanía' },
    { valueId: 2, value: 'CE', viewValue: 'Cédula de Extranjería' },
    { valueId: 3, value: 'TI', viewValue: 'Tarjeta de Identidad' },
    { valueId: 4, value: 'PP', viewValue: 'Pasaporte' },
  ];

  constructor(
    private customerService: CustomerOrders,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProviderDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { dataInfo: PatienstModel | null; visibility: boolean }
  ) {}

  ngOnInit() {
    this.providerForm = this.fb.group({
      Id: [0],
      TypeDocument: [
        { value: null, disabled: this.data.visibility ? true : false },
        Validators.required,
      ],
      Document: [{ value: '', disabled: this.data.visibility ? true : false }, Validators.required],
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
      Phone: [0],
      BirthDate: ['', Validators.required],
      Email: [''],
      Enabled: [true],
      CityId: [null, Validators.required],
    });

    this.getCities();

    if (this.data && this.data.dataInfo) {
      this.modeModal = this.data.visibility;

      this.providerForm.patchValue({
        Id: this.data.dataInfo.id,
        TypeDocument: this.data.dataInfo.typeDocument,
        Document: this.data.dataInfo.document,
        Name: this.data.dataInfo.name,
        LastName: this.data.dataInfo.lastName,
        Phone: this.data.dataInfo.phone,
        BirthDate: this.data.dataInfo.birthDate,
        Email: this.data.dataInfo.email,
        Enabled: this.data.dataInfo.enabled,
        CityId: this.data.dataInfo.cityId,
      });
    }
  }

  getCities() {
    this.customerService.getCities().subscribe({
      next: (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.cities = response.data;
          console.log(response);
        }
      },
      complete: () => {},
    });
  }

  save() {
    if (this.providerForm.valid) {
      const provider: PatienstRequest = this.providerForm.value;

      this.customerService.upsertPatients(provider).subscribe({
        next: (response: ApiResponse<string>) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Proveedor creado con éxito ✅',
              showConfirmButton: false,
              timer: 5000,
              position: 'top-end',
              toast: true,
            });

            this.dialogRef.close(true);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
              confirmButtonText: 'Cerrar',
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message,
            confirmButtonText: 'Cerrar',
          });
        },
      });
    } else {
      this.providerForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos Obligatorios',
        text: 'Registre todos los campos obligatorios.',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  close() {
    this.modeModal = false;
    this.dialogRef.close();
  }
}
