import { TestStepService, TestStepNode, TestStepNodeType } from './modules/test-step-service/test-step.service';

export class TestStepServiceMock extends TestStepService {
  async getTestSteps(): Promise<TestStepNode> {
    return { displayName: 'Available Test Steps', type: TestStepNodeType.ROOT, children: [
      { displayName: 'org.testeditor', type: TestStepNodeType.NAMESPACE, children: [
        { displayName: 'DummyComponent', type: TestStepNodeType.COMPONENT, children: [
          { displayName: 'some interaction', type: TestStepNodeType.INTERACTION, children: [] },
          { displayName: 'Button', type: TestStepNodeType.ELEMENT, children: [
            { displayName: 'click <Button>', type: TestStepNodeType.INTERACTION, children: [] }
          ]}
        ]}
      ]},
      { displayName: 'com.example', type: TestStepNodeType.NAMESPACE, children: [
        { displayName: 'MyMacros', type: TestStepNodeType.MACRO_COLLECTION, children: [
          { displayName: 'my first macro "param"', type: TestStepNodeType.MACRO, children: []}
        ]}
      ]},
      { displayName: './.', type: TestStepNodeType.NAMESPACE, children: null }
    ]};
  }
}
