import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { UserModel } from '../../types/models/user.models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      id: [null as number | null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    if (data) {
      this.userForm.patchValue(data);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value as UserModel;
      if (user.id) {
        this.userService
          .updateUser(user)
          .subscribe(() => this.dialogRef.close(true));
      } else {
        this.userService
          .addUser(user)
          .subscribe(() => this.dialogRef.close(true));
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
