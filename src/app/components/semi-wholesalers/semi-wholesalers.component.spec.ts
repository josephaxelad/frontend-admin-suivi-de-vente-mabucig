import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiWholesalersComponent } from './semi-wholesalers.component';

describe('SemiWholesalersComponent', () => {
  let component: SemiWholesalersComponent;
  let fixture: ComponentFixture<SemiWholesalersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemiWholesalersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemiWholesalersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
