import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBuildings } from './total-buildings';

describe('TotalBuildings', () => {
  let component: TotalBuildings;
  let fixture: ComponentFixture<TotalBuildings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBuildings],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalBuildings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
