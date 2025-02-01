import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingVisitorDialogComponent } from './existing-visitor-dialog.component';

describe('ExistingVisitorDialogComponent', () => {
  let component: ExistingVisitorDialogComponent;
  let fixture: ComponentFixture<ExistingVisitorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingVisitorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingVisitorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
