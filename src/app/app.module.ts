import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExistingVisitorComponent } from './existing-visitor/existing-visitor.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import {MatIconModule} from '@angular/material/icon';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {QRCodeModule} from 'angularx-qrcode';
import {MatButtonModule} from '@angular/material/button';
import { SignatureDialogComponent } from './signature-dialog/signature-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ExistingVisitorComponent,
    SnackBarComponent,
    QrcodeDialogComponent,
    SignatureDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogContent,
    MatDialogActions,
    QRCodeModule,
    MatDialogTitle,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
