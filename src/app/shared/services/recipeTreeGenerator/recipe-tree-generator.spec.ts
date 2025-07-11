import { TestBed } from '@angular/core/testing';

import { RecipeTreeGenerator } from './recipe-tree-generator';

describe('RecipeTreeGenerator', () => {
  let service: RecipeTreeGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeTreeGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
