import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingVisitorComponent } from './existing-visitor.component';

describe('ExistingVisitorComponent', () => {
  let component: ExistingVisitorComponent;
  let fixture: ComponentFixture<ExistingVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingVisitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
