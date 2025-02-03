import {Component, OnDestroy, OnInit} from '@angular/core';
import { CompanyApiService} from '../company-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, filter, Observable, Subject, Subscription, switchMap, takeUntil} from 'rxjs';
import {
  CompanyRequest,
  GetReasonResponse,
  ReasonRequest,
  VisitorLogRequest2,
} from '../model-back';
import {ReasonApiService, ReasonTest} from '../reason-api.service';
import {VisitorApiService} from '../visitor-api.service';
import {BadgeApiService} from '../badge-api.service';
import {SnackbarService} from '../snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatSelectChange} from '@angular/material/select';
import {QrcodeDialogComponent} from '../qrcode-dialog/qrcode-dialog.component';
import {SignatureDialogComponent} from '../signature-dialog/signature-dialog.component';

@Component({
  selector: 'visitor-fo-register-visitor',
  templateUrl: './register-visitor.component.html',
  styleUrl: './register-visitor.component.scss'
})
export class RegisterVisitorComponent implements OnDestroy, OnInit{

  protected readonly onsubmit = onsubmit;

  public registrationForm: FormGroup;
  public showOtherField: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();


  filteredOptions$!: Observable<CompanyRequest[]>;

  qrCodeSuccess = false;
  signatureSuccess = false;
  badgeId!: string;
  signatureDataUrl!: string;

  isExistingVisitor: boolean = false;

  fullName!: string;
  companyName!: string;

  firstName1!: string;
  lastName1!: string;

  contactNumber!: string;

  reasonTypes: ReasonTest[] = [];

  constructor(
    private fb: FormBuilder,
    private companyApiService: CompanyApiService,
    private reasonApiService: ReasonApiService,
    private visitorApiService: VisitorApiService,
    private badgeApiService: BadgeApiService,
    private readonly snackBarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.isExistingVisitor = this.route.snapshot.routeConfig?.path === 'existing-visitor';
    this.registrationForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z]+$')
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z]+$')
        ]
      ],

      contactNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ]
      ],

      reasonId: [''],
      otherReason: ['', [Validators.pattern('^[^0-9]+$')]],
      companyId: [''],
      companyName: [''],
      signaturePad: [''],
      badgeId: ['', [Validators.required]],
      attendeeName: [
        '',
        [Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]
      ]
    });
  }


  ngOnInit() {
    this.filteredOptions$ = this.registrationForm
      .get('companyName')!
      .valueChanges.pipe(
        debounceTime(300),
        filter((value): value is string => !!value && value.length >= 2),
        switchMap((value) => this.companyApiService.getCompanies(value))
      );

    /*this.loadReasons();*/

    this.loadReasonTypeList();

    if (this.isExistingVisitor) {
      this.route.queryParams.subscribe(params => {
        this.fullName = params['fullName'];
        this.companyName = params['companyName'];

        [this.firstName1, this.lastName1] = this.fullName.split(' ');

        console.log("yes");

        this.visitorApiService.getContactNumber(this.firstName1, this.lastName1)
          .subscribe(
            response => {
              console.log("Response contact number: " + response.contactNumber);
              this.contactNumber = response.contactNumber;
            },
            error => {
              this.contactNumber = 'Not found';
            }
          );

        console.log("yes2");
      });

      this.registrationForm.patchValue( {
        firstName: this.firstName1,
        lastName: this.lastName1,
        companyName: this.companyName,
        contactNumber: this.contactNumber
      }    );
    }
  }

  /*private loadReasons() {
    this.reasonApiService
      .getReasons(0, 10)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetReasonResponse) => {
          this.reason = response.content.map((item) => ({
            reasonId: item.reasonId,
            reason: item.reason
          }));
        },
        error: (error) => {
          this.showErrorSnackBar(error.message || 'Failed to load reasons');
        }
      });
  }*/

  private loadReasonTypeList() {
    this.reasonApiService.getReasonsList().subscribe(
      (data) => {
        this.reasonTypes = data;
      },
      (error) => {
        console.error('Error fetching reasons: ', error);
      }
    )
  }

  onCompanySelect(event: MatAutocompleteSelectedEvent): void {
    const selectedCompany = event.option.value;

    if (selectedCompany?.companyId) {
      this.registrationForm
        .get('companyId')?.setValue(selectedCompany.companyId);

      this.registrationForm
        .get('companyName')?.setValue(selectedCompany.companyName);
    }
  }

  onReasonsOfVisitChange(event: MatSelectChange) {
    const selectedReasonId = event.value;
    this.showOtherField = selectedReasonId === 'otherReason';

    if (this.showOtherField) {
      this.registrationForm.get('reasonId')?.setValue('otherReason');

      this.registrationForm
        .get('otherReason')?.setValidators(Validators.required);
    }
    else {
      this.registrationForm.get('otherReason')?.setValue(null);

      this.registrationForm
        .get('reasonId')?.setValue(selectedReasonId);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (!this.registrationForm.valid) {
      this.snackBarService.open(
        'Please fill in all the required information to proceed', 'error'
      );
      return;
    }

    if (this.qrCodeSuccess && this.signatureSuccess) {
      const reasonId =
        this.registrationForm.value.reasonId === 'otherReason' ? null : this.registrationForm.value.reasonId;

      const visitorLogDto: VisitorLogRequest2 = {
        reasonId: reasonId,
        badgeId: this.registrationForm.value.badgeId,
        otherReason: this.registrationForm.value.otherReason,
        signature: this.signatureDataUrl,
        attendeeName: this.registrationForm.value.attendeeName,
        visitor: {
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.lastName
        },
        company: {
          companyId: this.registrationForm.value.companyId,
          companyName: this.registrationForm.value.companyName
        },
      }
    }
    else {
      this.openMissingInfoSnackbar();
    }

    this.qrCodeSuccess = false;
    this.signatureSuccess = false;
  }

  showErrorSnackBar(errorMessage: string) {
    this.snackBarService.open(`Error: ${errorMessage}`, 'error', 5000);
  }

  openMissingInfoSnackbar() {
    this.snackBarService.open(
      'Please fill in all the required information to proceed',
      'error',
      5000
    );
  }

  backToMainMenu() {
    this.router.navigate(['main-menu']);
  }

  openQRCodeDialog() {
    const dialogRef = this.dialog.open(QrcodeDialogComponent);

    dialogRef.afterClosed().subscribe((badgeId) => {

      if (badgeId) {
        this.badgeApiService.checkBadgeValidity(badgeId).subscribe({
          next: (response) => {
            if (response) {
              this.badgeId = badgeId;
              this.registrationForm.patchValue({ badgeId });
              this.qrCodeSuccess = true;
              this.snackBarService.open('QR Code Scanned Successfully');
            }
          },
          error: () => {
            this.snackBarService.open('Failed to verify badge, badge is in use', 'error');
          }
        });
      }
      else {
        this.snackBarService.open('No badge ID scanned', 'error');
      }
    });
  }

  openSignatureDialog() {
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
