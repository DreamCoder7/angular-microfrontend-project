import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PermissionsFormComponent } from '../permissions-form/permissions-form.component';
import {
  Permission,
  PermissionsService,
} from '../../services/permissions.service';

@Component({
  selector: 'app-permissions-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent implements OnInit {
  permissions = signal<Permission[]>([]);
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(
    private permissionsService: PermissionsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.permissionsService
      .getPermissions()
      .subscribe((permissions) => this.permissions.set(permissions));
  }

  openPermissionForm(permission?: Permission): void {
    const dialogRef = this.dialog.open(PermissionsFormComponent, {
      width: '400px',
      data: permission,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPermissions();
      }
    });
  }

  deletePermission(id: number): void {
    this.permissionsService
      .deletePermission(id)
      .subscribe(() => this.loadPermissions());
  }
}
