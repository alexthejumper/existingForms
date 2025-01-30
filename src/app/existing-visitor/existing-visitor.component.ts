import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Subject, switchMap, Observable } from 'rxjs';
import { takeUntil } from 'rxjs';
import {CompanyRequest, ReasonRequest, VisitorLogRequest, GetReasonResponse, VisitorRequest} from '../model-back';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import {CompanyApiService} from '../company-api.service';
import {BadgeApiService} from '../badge-api.service';
import {ReasonApiService} from '../reason-api.service';
import {VisitorApiService} from '../visitor-api.service';
import {SnackbarService} from '../snackbar.service';
import {QrcodeDialogComponent} from '../qrcode-dialog/qrcode-dialog.component';
import {SignatureDialogComponent} from '../signature-dialog/signature-dialog.component';

@Component({
  selector: 'visitor-fo-existing-visitor',
  templateUrl: './existing-visitor.component.html',
  styleUrl: './existing-visitor.component.scss'
})
export class ExistingVisitorComponent implements OnDestroy, OnInit {
  public registrationForm: FormGroup;
  public showOtherField: boolean = false;
  reason: ReasonRequest[] = [];
  filteredOptions$!: Observable<CompanyRequest[]>;
  qrCodeSuccess = false;
  signatureSuccess = false;
  badgeId!: string;
  visitorId!: string;
  signatureDataUrl!: string;
  private destroy$: Subject<void> = new Subject<void>();

  reasonName!: string;
  archived!: boolean;

  identification!: string;
  badgeName!: string;


  constructor(
    private fb: FormBuilder,
    private companyApiService: CompanyApiService,
    private reasonsApiService: ReasonApiService,
    private visitorApiService: VisitorApiService,
    private badgeApiService: BadgeApiService,
    private readonly snackBarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.registrationForm = this.fb.group({
      visitorId: [],
      firstName: [
        { value: '', disabled: true},
        [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')],
      ],
      lastName: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')],
      ],
      contactNumber: [
        [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)],
      ],
      reasonId: [''],
      otherReason: ['', [Validators.pattern('^[^0-9]+$')]],
      companyId: [],
      companyName: [''],
      signaturePad: [''],
      badgeId: ['', [Validators.required]],
      attendeeName: ['']
    });
  }

  ngOnInit() {
    this.filteredOptions$ = this.registrationForm
    .get('companyName')!
    .valueChanges.pipe(
      switchMap((value) => this.companyApiService.getCompanies(value))
    );

    this.loadReasons();
    this.loadPrefilledData();
  }

  loadPrefilledData(): void {
    const fetchedData = {
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      reasonId: "880e8400-e29b-41d4-a716-446655440001",
      companyId: "550e8400-e29b-41d4-a716-446655440000",
      attendeeName: 'John Doe',
      otherReason: '',
      companyName: 'TechCorp',
    };

    this.signatureDataUrl = "johndoe";
    this.visitorId = "660e8400-e29b-41d4-a716-446655440000";
    this.reasonName = "Interview";
    this.archived = false;

    this.badgeId =  "770e8400-e29b-41d4-a716-446655440000";
    this.identification = "ID001";
    this.badgeName = "Visitor Badge";

    this.registrationForm.patchValue({
      firstName: fetchedData.firstName,
      lastName: fetchedData.lastName,
      contactNumber: fetchedData.contactNumber,
      reasonId: fetchedData.reasonId.toString(),
      companyName: fetchedData.companyName,
      companyId: fetchedData.companyId,
      badgeId: this.badgeId,
    });

    console.log(fetchedData.reasonId);

    this.registrationForm.get('firstName')?.disable();
    this.registrationForm.get('lastName')?.disable();
  }

  private loadReasons(): void {
    this.reasonsApiService
    .getReasons(0, 10)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: GetReasonResponse) => {
        this.reason = response.content.map((item) => ({
          reasonId: item.reasonId,
          reason: item.reason,
        }));
      },
      error: (error) => {
        this.snackBarService.open(error.message || 'Failed to load reasons');
      },
    });
  }

  onCompanySelect(event: MatAutocompleteSelectedEvent): void {
    const selectedCompany = event.option.value;
    if (selectedCompany?.companyId) {
      this.registrationForm
      .get('companyId')?.
      setValue(selectedCompany.companyId);

      this.registrationForm
      .get('companyName')?.
      setValue(selectedCompany.companyName);
    }
  }

  onReasonsOfVisitChange(event: MatSelectChange): void {
    const selectedReasonId = event.value;
    this.showOtherField = selectedReasonId === 'otherReason';

    if (this.showOtherField) {
      this.registrationForm.get('reasonId')?.setValue(null);
      this.registrationForm.get('otherReason')?.setValidators(Validators.required);
    }
    else {
      this.registrationForm.get('otherReason')?.setValue(null);
      this.registrationForm.get('reasonId')?.setValue(selectedReasonId);
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (!this.registrationForm.valid) {
      this.snackBarService.open('Please fill in all the required information to proceed.');
      return;
    }

    /*if (this.qrCodeSuccess && this.signatureSuccess) {
      const reasonId =
      this.registrationForm.value.reasonId === 'otherReason'
      ? null
      : this.registrationForm.value.reasonId;

      const visitorRequest: VisitorRequest = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        contactNumber: this.registrationForm.value.contactNumber,
        company: {
          companyId: this.registrationForm.value.companyId,
          companyName: this.registrationForm.value.companyName
        }
      };

      const visitorLogRequest: VisitorLogRequest = {
        visitor: {
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.lastName,
          contactNumber: this.registrationForm.value.contactNumber,
          company: {
            companyId: this.registrationForm.value.companyId,
            companyName: this.registrationForm.value.companyName
          }
        },
        badgeId: this.registrationForm.value.badgeId,
        reasonId: reasonId,
        otherReason: this.registrationForm.value.otherReason,
        signature: this.signatureDataUrl,
        attendeeName: this.registrationForm.value.attendeeName
      };

      const createVisitorLog$ = this.visitorApiService.createExistingVisitorLog(visitorLogRequest);
      const updateVisitor$ = this.visitorApiService.updateExistingVisitor(visitorRequest);

      forkJoin([createVisitorLog$, updateVisitor$]).subscribe({
        next: () => {
          this.registrationForm.reset();
          this.showOtherField = false;
          this.snackBarService.open('Visitor log created and visitore updated.');
        },
        error: (error) => {
          this.snackBarService.open(
            error.message || 'Failed to create or update visitor log'
          );
        }
      });
    }*/


    const reasonId =
      this.registrationForm.value.reasonId === 'otherReason'
        ? null
        : this.registrationForm.value.reasonId;


    console.log(this.registrationForm.value.firstName);

    const visitorRequest: VisitorRequest = {
      visitorId: this.visitorId,
      firstName: this.registrationForm.get('firstName')?.value || '',
      lastName: this.registrationForm.get('lastNam')?.value || '',
      contactNumber: this.registrationForm.value.contactNumber,
      company: {
        companyId: this.registrationForm.value.companyId,
        companyName: this.registrationForm.value.companyName
      }
    };

    const visitorLogRequest: VisitorLogRequest = {
      visitor: {
        visitorId: this.visitorId,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        contactNumber: this.registrationForm.value.contactNumber,
        company: {
          companyId: this.registrationForm.value.companyId,
          companyName: this.registrationForm.value.companyName
        }
      },

      reason: {
        reasonId: reasonId,
        reasonName: this.reasonName,
        archived: this.archived
      },

      badge: {
        badgeId: this.badgeId,
        identification: this.identification,
        badgeName: this.badgeName
      },
      signature: this.signatureDataUrl,
      attendeeName: this.registrationForm.value.attendeeName
    };

    const createVisitorLog$ = this.visitorApiService.createExistingVisitorLog(visitorLogRequest);
    const updateVisitor$ = this.visitorApiService.updateExistingVisitor(visitorRequest);

    forkJoin([createVisitorLog$, updateVisitor$]).subscribe({
      next: () => {
        this.registrationForm.reset();
        this.showOtherField = false;
        this.snackBarService.open('Visitor log created and visitor updated.');
      },
      error: (error) => {
        this.snackBarService.open(
          error.message || 'Failed to create or update visitor log'
        );
      }
    });

    this.qrCodeSuccess = false;
    this.signatureSuccess = false;
  }


  backToMainMenu(): void {
    this.router.navigate(['main-menu']);
  }

  openQRCodeDialog(): void {
    const dialogRef = this.dialog.open(QrcodeDialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (badgeId) => {
        if (badgeId) {
          this.badgeId = badgeId;
          this.registrationForm.patchValue({ badgeId });
          this.qrCodeSuccess = true;
          this.snackBarService.open('QR code scanned successfully.');
        } else {
          this.snackBarService.open('No Badge ID scanned.');
        }
      },
      error: (error) => {
        this.snackBarService.open('Failed to verify badge. Badge is in use.');
      }
    });
  }


  openSignatureDialog(): void {
    const dialogRef = this.dialog.open(SignatureDialogComponent);

    dialogRef.afterClosed().subscribe((signatureDataUrl) => {
      if (signatureDataUrl) {
        this.signatureDataUrl = signatureDataUrl;
        this.signatureSuccess = true;
        this.snackBarService.open('Signature Added Successfully');
      }
    });
  }

}
