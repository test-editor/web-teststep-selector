import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { TestStepService, TestStepNodeType } from '../test-step-service/test-step.service';
import { TestStepTreeNode, testStepNode2TreeNode } from './test-step-tree-node';
import { TreeViewerConfig, TreeNode, forEach } from '@testeditor/testeditor-commons';
import { Clipboard } from 'ts-clipboard';
import { MessagingService } from '@testeditor/messaging-service';

@Component({
  selector: 'app-test-step-selector',
  templateUrl: './test-step-selector.component.html',
  styleUrls: ['./test-step-selector.component.css']
})
export class TestStepSelectorComponent implements OnInit {
  private readonly teststepPrefix = '- ';

  model: TreeNode = { name: '<Loading test steps…>', hover: 'Loading test steps…', root: null, children: [] };
  treeConfig: TreeViewerConfig = {
    onClick: this.toggleExpanded,
    onIconClick: this.toggleExpanded,
    onDoubleClick: (node: TestStepTreeNode) => this.copyToClipBoard(node)
  };

  constructor(private testStepService: TestStepService, private messagingService: MessagingService) { }

  updateModel() {
    this.testStepService.getTestSteps().then((testStepTree) => {
      this.model = new TestStepTreeNode(testStepTree);
    });
  }

  private toggleExpanded(node: TreeNode) {
    if (node.expanded !== undefined) {
      node.expanded = !node.expanded;
    }
  }

  private copyToClipBoard(node: TestStepTreeNode) {
    if (node.type === TestStepNodeType.INTERACTION || node.type === TestStepNodeType.MACRO) {
      Clipboard.copy(this.teststepPrefix + node.name);
      this.messagingService.publish('snackbar.display.notification', { message: 'copied to clipboard!' });
    }
  }

  ngOnInit() {
    this.updateModel();
  }

}
