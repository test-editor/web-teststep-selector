import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { TestStepService, TestStepNodeType } from '../test-step-service/test-step.service';
import { TestStepTreeNode, testStepNode2TreeNode } from './test-step-tree-node';
import { TreeViewerConfig, TreeNode } from '@testeditor/testeditor-commons';

@Component({
  selector: 'app-test-step-selector',
  templateUrl: './test-step-selector.component.html',
  styleUrls: ['./test-step-selector.component.css']
})
export class TestStepSelectorComponent implements OnInit {
  model: TreeNode = { name: '<Loading test steps…>', hover: 'Loading test steps…', children: [] };
  treeConfig: TreeViewerConfig = {  };

  constructor(private testStepService: TestStepService, private changeDetector: ChangeDetectorRef) { }

  updateModel() {
    this.testStepService.getTestSteps().then((testStepTree) => {
      this.model = new TestStepTreeNode(testStepTree);
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit() {
    this.updateModel();
  }

}
