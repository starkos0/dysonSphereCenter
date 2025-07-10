import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalItems } from './total-items';

describe('TotalItems', () => {
  let component: TotalItems;
  let fixture: ComponentFixture<TotalItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalItems],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
