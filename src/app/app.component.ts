import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeDataService, TreeNode } from './tree-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TreeNodeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tree';
  tree: TreeNode[] = [];

  constructor(private treeDataService: TreeDataService) {
    this.loadTree();
  }

  loadTree(): void {
    this.tree = this.treeDataService.getTree();
  }

  handleNodeAdded(): void {
    this.loadTree();
  }

  addNode(parentId: number): void {
    this.treeDataService.addNode(parentId);
    this.loadTree();
  }
}
