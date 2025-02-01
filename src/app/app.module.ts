import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExistingVisitorComponent } from './existing-visitor/existing-visitor.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; // ✅ Only need this
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { SignatureDialogComponent } from './signature-dialog/signature-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExistingVisitorDialogComponent } from './existing-visitor-dialog/existing-visitor-dialog.component';
import { RegisterVisitorComponent } from './register-visitor/register-visitor.component';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ExistingVisitorComponent,
    SnackBarComponent,
    QrcodeDialogComponent,
    SignatureDialogComponent,
    ExistingVisitorDialogComponent,
    RegisterVisitorComponent,
    OpenDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    QRCodeModule,
    MatDialogModule,  // ✅ Only need this for dialogs
    MatButtonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
