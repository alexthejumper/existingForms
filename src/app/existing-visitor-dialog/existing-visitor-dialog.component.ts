import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';
import {VisitorLogResponse} from '../model-back';
import {ExistingVisitorService} from '../existing-visitor.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'visitor-fo-existing-visitor-dialog',
  templateUrl: './existing-visitor-dialog.component.html',
  styleUrl: './existing-visitor-dialog.component.scss'
})
export class ExistingVisitorDialogComponent implements OnInit, OnDestroy{
  visitorForm: FormGroup;
  visitorSuggestions: VisitorLogResponse[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  clockIn: string = '';

  private datePipe: DatePipe;

  fullName!: string;
  companyName!: string;

  constructor(
    private fb: FormBuilder,
    private visitorService: ExistingVisitorService,
    private dialogRef: MatDialogRef<ExistingVisitorDialogComponent>,
    private router: Router
  ) {
    this.visitorForm = this.fb.group({
      fullName: [''],
      companyName: [''],
      clockIn: [{value: '', disabled: true}]
    });

    this.datePipe = new DatePipe('en-US');
  }

  ngOnInit() {
    this.visitorForm.get('fullName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fullName: string) => {
        this.fetchSuggestions(fullName, 'fullName');
      });

    this.visitorForm.get('companyName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((companyName: string) => {
        this.fetchSuggestions(companyName, 'companyName');
      });
  }

  /*ngOnInit(): void {
    this.visitorForm.get('fullName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fullName: string) => {
        this.fetchSuggestions(fullName, 'fullName');
      });
  }*/

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  fetchSuggestions(query: string, field: string) {
    if (query.length > 2) {
      let firstName = '';
      let lastName = '';
      let companyName = '';

      if (field === 'fullName') {
        [firstName, lastName] = query.split(' ');
      }
      else if (field === 'companyName') {
        companyName = query;
      }


      this.visitorService.getVisitorsByDetails(firstName, lastName || '', companyName)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: VisitorLogResponse[]) => {


          const sortedVisitors = response.sort((a, b) => new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime());
          const uniqueVisitors = sortedVisitors.filter((visitor, index, self) =>
          index === self.findIndex((v) => v.visitor.firstName === visitor.visitor.firstName && v.visitor.lastName === visitor.visitor.lastName)
          );

          console.log("unique vis: " + uniqueVisitors);

          this.visitorSuggestions = uniqueVisitors;
        });
    }
  }


  updateClockIn(visitor: VisitorLogResponse) {
    if (visitor.clockIn) {
      const formattedClockIn = this.datePipe.transform(visitor.clockIn, 'MMMM dd, yyyy, h:mm a');
      this.visitorForm.get('clockIn')?.setValue(formattedClockIn);
    }
  }

  selectVisitor(visitor: VisitorLogResponse) {
    if (visitor && visitor.visitor) {
      const fullName = visitor.visitor.firstName + ' ' + visitor.visitor.lastName;
      const companyName = visitor.visitor.company.companyName;

      this.visitorForm.get('fullName')?.setValue(fullName);
      this.visitorForm.get('companyName')?.setValue(companyName);

      if (visitor.clockIn) {
        this.updateClockIn(visitor);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  /*loadExisting() {
    this.router.navigate(['/existing-visitor'], {
      queryParams: { fullName: this.fullName, companyName: this.companyName }
    });
  }*/

  // Custom function to handle submission
  submitForm(fullName: string, companyName: string) {
    if (!fullName || !companyName) {
      alert("Both fields are required!");
      return;
    }

    this.router.navigate(['/existing-visitor'], {
      queryParams: { fullName, companyName }
    });
  }

  /*onSubmit() {
    this.router.navigate(['/existing-visitor'], {
      queryParams: { fullName: this.fullName, companyName: this.companyName }
    });
  }*/


  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
