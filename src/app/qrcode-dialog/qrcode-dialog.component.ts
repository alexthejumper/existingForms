import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qrcode-dialog',
  template: `
    <h2 mat-dialog-title>QR Code</h2>
    <mat-dialog-content>
      <qrcode [qrdata]="data.qrData" [width]="200"></qrcode>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
    `
  ]
})
export class QrcodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { qrData: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
