import { Component } from '@angular/core';
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
import { ProviderRequest, DynamicFieldRequest } from '../../../models/base/provider.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from '../../../models/application/api-response.model';
import { CustomerOrders } from '../../../services/base/customers.service';
import Swal from 'sweetalert2';

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
  ],
})
export class CreateProviderDialogComponent {
  providerForm: FormGroup;

  constructor(
    private customerService: CustomerOrders,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProviderDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.providerForm = this.fb.group({
      TaxId: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Enabled: [true],
      dynamicFields: this.fb.array([]), // campos dinámicos
    });
  }

  get dynamicFields(): FormArray {
    return this.providerForm.get('dynamicFields') as FormArray;
  }

  addCustomField() {
    this.dynamicFields.push(
      this.fb.group({
        FieldName: ['', Validators.required],
        FieldValue: [''],
        Enabled: [true],
      })
    );
  }

  removeCustomField(index: number) {
    this.dynamicFields.removeAt(index);
  }

  save() {
    if (this.providerForm.valid) {
      const provider: ProviderRequest = this.providerForm.value;

      this.customerService.upsertProvider(provider).subscribe({
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
      Swal.fire({
        icon: 'warning',
        title: 'Campos Obligatorios',
        text: 'Registre todos los campos obligatorios.',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
