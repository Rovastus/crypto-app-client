import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExportsDialogComponent } from './dialog/exports-dialog.component';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
})
export class ExportsComponent implements OnInit {
  dataString!: string | null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExportsDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((update: boolean) => {
      console.log('The dialog was closed');
    });
  }
}
