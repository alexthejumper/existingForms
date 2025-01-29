import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  template: `
    <div class="snack-bar-container">
      <mat-icon class="snack-bar-icon">{{ data.icon }}</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [
    `
      .snack-bar-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .snack-bar-icon {
        font-size: 20px;
      }
    `
  ]
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; icon: string }) {}
}
