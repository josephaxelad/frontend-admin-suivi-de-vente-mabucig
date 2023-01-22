import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSemiWholesalerComponent } from './new-semi-wholesaler.component';

describe('NewSemiWholesalerComponent', () => {
  let component: NewSemiWholesalerComponent;
  let fixture: ComponentFixture<NewSemiWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSemiWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSemiWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
