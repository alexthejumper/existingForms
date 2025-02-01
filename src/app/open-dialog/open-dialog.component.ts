import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ExistingVisitorDialogComponent} from '../existing-visitor-dialog/existing-visitor-dialog.component';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrl: './open-dialog.component.scss'
})
export class OpenDialogComponent {

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ExistingVisitorDialogComponent)
  }

}
