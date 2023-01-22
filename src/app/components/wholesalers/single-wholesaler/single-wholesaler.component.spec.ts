import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWholesalerComponent } from './single-wholesaler.component';

describe('SingleWholesalerComponent', () => {
  let component: SingleWholesalerComponent;
  let fixture: ComponentFixture<SingleWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
