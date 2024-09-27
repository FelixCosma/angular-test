import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeNodeComponent } from './tree-node.component';
import { TreeNode } from '../tree-data.service';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeNodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
    component.node = { id: 1, children: [] } as TreeNode;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
