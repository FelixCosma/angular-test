import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TreeDataService, TreeNode } from './tree-data.service';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTreeDataService: jasmine.SpyObj<TreeDataService>;

  const mockTreeData: TreeNode[] = [
    { id: 1, children: [{ id: 2, parent_id: 1, children: [] }] },
    { id: 3, children: [] }
  ];

  beforeEach(async () => {
    mockTreeDataService = jasmine.createSpyObj('TreeDataService', ['getTree', 'addNode']);
    mockTreeDataService.getTree.and.returnValue([...mockTreeData]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, TreeNodeComponent, AppComponent],
      providers: [{ provide: TreeDataService, useValue: mockTreeDataService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the tree data on initialization', () => {
    expect(component.tree).toEqual(mockTreeData);
  });

  it('should call addNode and refresh the tree when addNode is called', () => {
    mockTreeDataService.getTree.and.returnValue([
      { id: 1, children: [{ id: 2, parent_id: 1, children: [] }, { id: 4, parent_id: 1, children: [] }] },
      { id: 3, children: [] }
    ]);

    component.addNode(1);

    expect(mockTreeDataService.addNode).toHaveBeenCalledWith(1);

    component.loadTree();

    expect(component.tree[0].children.length).toBe(2); // Should be 2 after adding a new child
  });
});
