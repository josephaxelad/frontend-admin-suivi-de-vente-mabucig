import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSemiWholesalerComponent } from './edit-semi-wholesaler.component';

describe('EditSemiWholesalerComponent', () => {
  let component: EditSemiWholesalerComponent;
  let fixture: ComponentFixture<EditSemiWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSemiWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSemiWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
