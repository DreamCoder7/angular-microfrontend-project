import { Component, signal } from '@angular/core';
import { UserModel } from '../types/models/user.models';
import { UserFormComponent } from '../pages/user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  imports: [UserFormComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  users = signal<UserModel[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(private dialog: MatDialog) {}

  openUserForm(user?: UserModel) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.id) {
          this.users.update((users) =>
            users.map((u) => (u.id === result.id ? result : u))
          );
        } else {
          this.users.update((users) => [
            ...users,
            { ...result, id: users.length + 1 },
          ]);
        }
      }
    });
  }

  deleteUser(id: number) {
    this.users.update((users) => users.filter((u) => u.id !== id));
  }
}
