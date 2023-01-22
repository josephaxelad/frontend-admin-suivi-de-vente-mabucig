import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWholesalerComponent } from './edit-wholesaler.component';

describe('EditWholesalerComponent', () => {
  let component: EditWholesalerComponent;
  let fixture: ComponentFixture<EditWholesalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWholesalerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
