import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRatios } from './quick-ratios';

describe('QuickRatios', () => {
  let component: QuickRatios;
  let fixture: ComponentFixture<QuickRatios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickRatios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickRatios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
