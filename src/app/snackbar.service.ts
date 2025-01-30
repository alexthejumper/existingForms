import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IconMap} from './model-front';
import {SnackBarComponent} from './snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, type: 'success' | 'error' = 'success', duration = 3000) {
    const icons: { [key: string]: string } = {
      success: 'check_circle',
      error: 'error'
    };

    const panelClassMap: IconMap = {
      success: 'snack-bar-success',
      error: 'snack-bar-error'
    };

    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,

        icon: icons[type]
      },

      duration,

      horizontalPosition: 'right',

      verticalPosition: 'top',

      panelClass: panelClassMap[type]
    });
  }
}
