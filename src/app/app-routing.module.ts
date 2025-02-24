import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExistingVisitorDialogComponent} from './existing-visitor-dialog/existing-visitor-dialog.component';
import {ExistingVisitorComponent} from './existing-visitor/existing-visitor.component';
import {RegisterVisitorComponent} from './register-visitor/register-visitor.component';

const routes: Routes = [
  { path: '', component: ExistingVisitorDialogComponent },
  { path: 'existing-visitor', component: RegisterVisitorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
