import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSemiWholesalersComponent } from './all-semi-wholesalers.component';

describe('AllSemiWholesalersComponent', () => {
  let component: AllSemiWholesalersComponent;
  let fixture: ComponentFixture<AllSemiWholesalersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSemiWholesalersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSemiWholesalersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
