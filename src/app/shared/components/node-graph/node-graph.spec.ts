import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGraph } from './node-graph';

describe('NodeGraph', () => {
  let component: NodeGraph;
  let fixture: ComponentFixture<NodeGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
