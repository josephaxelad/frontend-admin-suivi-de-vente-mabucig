import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionAgenciesComponent } from './distribution-agencies.component';

describe('DistributionAgenciesComponent', () => {
  let component: DistributionAgenciesComponent;
  let fixture: ComponentFixture<DistributionAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributionAgenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
