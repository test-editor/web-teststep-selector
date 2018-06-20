import { TreeNode } from '@testeditor/testeditor-commons';
import { TestStepNode } from '../test-step-service/test-step.service';

export class TestStepTreeNode implements TreeNode {

  private _children: TestStepTreeNode[];
  hover: string;
  expanded = true;
  collapsedCssClasses = 'category fas fa-caret-right';
  expandedCssClasses = 'category fas fa-caret-down';
  leafCssClasses = 'fas fa-square';

  constructor(private testStepTree: TestStepNode) {
    this.hover = `Type: ${firstToUpper(splitCamelCase(this.testStepTree.type))}`;
  }

  get name(): string {
    return this.testStepTree.displayName;
  }

  get children(): TreeNode[] {
    if (!this._children) {
      if (this.testStepTree.children) {
        this._children = this.testStepTree.children.map((testStep) => new TestStepTreeNode(testStep));
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
