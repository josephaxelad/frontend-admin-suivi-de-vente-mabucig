import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistributionAgencyComponent } from './new-distribution-agency.component';

describe('NewDistributionAgencyComponent', () => {
  let component: NewDistributionAgencyComponent;
  let fixture: ComponentFixture<NewDistributionAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDistributionAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDistributionAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
