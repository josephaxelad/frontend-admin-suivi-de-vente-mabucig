import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSemiWholesalerComponent } from './single-semi-wholesaler.component';

describe('SingleSemiWholesalerComponent', () => {
  let component: SingleSemiWholesalerComponent;
  let fixture: ComponentFixture<SingleSemiWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSemiWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSemiWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
