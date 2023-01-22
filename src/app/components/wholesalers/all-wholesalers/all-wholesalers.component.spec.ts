import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWholesalersComponent } from './all-wholesalers.component';

describe('AllWholesalersComponent', () => {
  let component: AllWholesalersComponent;
  let fixture: ComponentFixture<AllWholesalersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWholesalersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWholesalersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
