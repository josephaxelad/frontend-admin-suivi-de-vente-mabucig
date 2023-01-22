import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCodesQrComponent } from './all-codes-qr.component';

describe('AllCodesQrComponent', () => {
  let component: AllCodesQrComponent;
  let fixture: ComponentFixture<AllCodesQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCodesQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCodesQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
