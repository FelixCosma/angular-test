import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode, TreeDataService } from '../tree-data.service';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;
  @Output() nodeAdded = new EventEmitter<void>();

  constructor(private treeDataService: TreeDataService) {}

  addChildNode(): void {
    this.treeDataService.addNode(this.node.id);
    this.nodeAdded.emit();
  }
}
