import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelector } from './item-selector';

describe('ItemSelector', () => {
  let component: ItemSelector;
  let fixture: ComponentFixture<ItemSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
