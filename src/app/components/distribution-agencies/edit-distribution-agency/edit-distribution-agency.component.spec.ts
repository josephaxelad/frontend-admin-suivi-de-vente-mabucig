import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistributionAgencyComponent } from './edit-distribution-agency.component';

describe('EditDistributionAgencyComponent', () => {
  let component: EditDistributionAgencyComponent;
  let fixture: ComponentFixture<EditDistributionAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDistributionAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDistributionAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
