import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWholesalerComponent } from './new-wholesaler.component';

describe('NewWholesalerComponent', () => {
  let component: NewWholesalerComponent;
  let fixture: ComponentFixture<NewWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
