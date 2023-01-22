import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDistributionAgenciesComponent } from './all-distribution-agencies.component';

describe('AllDistributionAgenciesComponent', () => {
  let component: AllDistributionAgenciesComponent;
  let fixture: ComponentFixture<AllDistributionAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDistributionAgenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDistributionAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
