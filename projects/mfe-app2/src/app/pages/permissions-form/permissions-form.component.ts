import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  Permission,
  PermissionsService,
} from '../../services/permissions.service';

@Component({
  selector: 'app-permissions-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.scss'],
})
export class PermissionsFormComponent {
  permissionForm: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PermissionsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Permission,
    private permissionsService: PermissionsService
  ) {
    this.permissionForm = this.fb.group({
      id: [null as number | null],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (data) {
      this.permissionForm.patchValue(data);
    }
  }

  onSubmit(): void {
    if (this.permissionForm.valid) {
      const permission = this.permissionForm.value as Permission;
      if (permission.id) {
        this.permissionsService
          .updatePermission(permission)
          .subscribe(() => this.dialogRef.close(true));
      } else {
        this.permissionsService
          .addPermission(permission)
          .subscribe(() => this.dialogRef.close(true));
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
