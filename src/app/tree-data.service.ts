import { Injectable } from '@angular/core';

export interface TreeNode {
  id: number;
  parent_id?: number;
  children: TreeNode[];
}

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {
  private data: TreeNode[] = [
    { id: 1, children: [] },
    { id: 2, parent_id: 1, children: [] },
    { id: 3, parent_id: 1, children: [] },
    { id: 4, parent_id: 2, children: [] },
    { id: 5, parent_id: 2, children: [] },
    { id: 6, parent_id: 4, children: [] },
    { id: 7, parent_id: 3, children: [] }
  ];

  getTree(): TreeNode[] {
    return this.buildTree(this.data);
  }

  addNode(parentId: number): void {
    const newNode = {
      id: this.data.length + 1,
      parent_id: parentId,
      children: []
    };
    this.data.push(newNode);
  }

  private buildTree(data: TreeNode[]): TreeNode[] {
    const tree: TreeNode[] = [];
    const lookup = new Map<number, TreeNode>();

    data.forEach(item => {
      lookup.set(item.id, { ...item, children: [] });
    });

    data.forEach(item => {
      if (item.parent_id) {
        const parent = lookup.get(item.parent_id);
        if (parent) {
          parent.children.push(lookup.get(item.id)!);
        }
      } else {
        tree.push(lookup.get(item.id)!);
      }
    });

    return tree;
  }
}
