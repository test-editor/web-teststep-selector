import { TreeNode } from '@testeditor/testeditor-commons';
import { TestStepNode, TestStepNodeType } from '../test-step-service/test-step.service';

export class TestStepTreeNode implements TreeNode {

  private _children: TestStepTreeNode[];
  hover: string;
  collapsedCssClasses = 'category fas fa-caret-right';
  expandedCssClasses = 'category fas fa-caret-down';
  leafCssClasses: string;

  constructor(private testStepTree: TestStepNode) {
    this.hover = `Type: ${firstToUpper(splitCamelCase(this.testStepTree.type))}`;
    if (testStepTree.children && testStepTree.children.length > 0) {
      this['expanded'] = true;
    }
    switch (testStepTree.type) {
      case TestStepNodeType.INTERACTION: this.leafCssClasses = 'fas fa-cog'; break;
      case TestStepNodeType.MACRO: this.leafCssClasses = 'fas fa-cogs'; break;
      // other node types are meant as containers; empty ones get styled like a collapsed inner node
      default: this.leafCssClasses = 'category fas fa-caret-right'; break;
    }
  }

  get name(): string {
    return this.testStepTree.displayName;
  }

  get type(): TestStepNodeType {
    return this.testStepTree.type;
  }

  get children(): TreeNode[] {
    if (!this._children) {
      if (this.testStepTree.children) {
        this._children = this.testStepTree.children.map((testStep) => new TestStepTreeNode(testStep))
          .sort((nodeA, nodeB) => {
            return nodeA.name.localeCompare(nodeB.name);
          });
      } else {
        this._children = [];
      }

    }
    return this._children;
  }

}

export function testStepNode2TreeNode(testStepTree: TestStepNode): TreeNode {
  return {
    name: testStepTree.displayName,
    hover: `Type: ${firstToUpper(splitCamelCase(testStepTree.type))}`,
    children: mapTestStepNodes(testStepTree.children),
    expanded: true
  };
}

function mapTestStepNodes(testStepNodes: TestStepNode[]): TreeNode[] {
  if (testStepNodes) {
    return testStepNodes.map((testStep) => testStepNode2TreeNode(testStep));
  } else {
    return [];
  }
}

function firstToUpper(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function splitCamelCase(string: string): string {
  return string.replace(/[A-Z]/g, ' $&');
}
