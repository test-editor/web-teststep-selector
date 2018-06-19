import { TestStepNode, TestStepType } from '../test-step-service/test-step.service';
import { TestStepTreeNode } from './test-step-tree-node';

describe('TestStepTreeNode', () => {

  it('can be created', () => {
    // given
    const testStepTree: TestStepNode = { displayName: 'root', type: TestStepType.ROOT, children: [
      { displayName: 'org.testeditor', type: TestStepType.NAMESPACE, children: [
        { displayName: 'DummyComponent', type: TestStepType.COMPONENT, children: [
          { displayName: 'some interaction', type: TestStepType.INTERACTION, children: [] },
          { displayName: 'Button', type: TestStepType.ELEMENT, children: [
            { displayName: 'click <Button>', type: TestStepType.INTERACTION, children: [] }
          ]}
        ]}
      ]},
      { displayName: 'com.example', type: TestStepType.NAMESPACE, children: [
        { displayName: 'MyMacros', type: TestStepType.MACRO_COLLECTION, children: [
          { displayName: 'my first macro "param"', type: TestStepType.MACRO, children: []}
        ]}
      ]},
      { displayName: './.', type: TestStepType.NAMESPACE, children: null }
    ]};

    // when
    const actualNode = new TestStepTreeNode(testStepTree);

    // then
    expect(actualNode.name).toEqual('root');
    expect(actualNode.hover).toEqual('Type: Root');
    expect(actualNode.children.length).toEqual(3);

    expect(actualNode.children[0].name).toEqual('org.testeditor');
    expect(actualNode.children[0].hover).toEqual('Type: Namespace');
    expect(actualNode.children[0].children.length).toEqual(1);

    expect(actualNode.children[0].children[0].name).toEqual('DummyComponent');
    expect(actualNode.children[0].children[0].hover).toEqual('Type: Component');
    expect(actualNode.children[0].children[0].children.length).toEqual(2);

    expect(actualNode.children[0].children[0].children[0].name).toEqual('some interaction');
    expect(actualNode.children[0].children[0].children[0].hover).toEqual('Type: Interaction');
    expect(actualNode.children[0].children[0].children[0].children.length).toEqual(0);

    expect(actualNode.children[0].children[0].children[1].name).toEqual('Button');
    expect(actualNode.children[0].children[0].children[1].hover).toEqual('Type: Element');
    expect(actualNode.children[0].children[0].children[1].children.length).toEqual(1);

    expect(actualNode.children[0].children[0].children[1].children[0].name).toEqual('click <Button>');
    expect(actualNode.children[0].children[0].children[1].children[0].hover).toEqual('Type: Interaction');
    expect(actualNode.children[0].children[0].children[1].children[0].children.length).toEqual(0);

    expect(actualNode.children[1].name).toEqual('com.example');
    expect(actualNode.children[1].hover).toEqual('Type: Namespace');
    expect(actualNode.children[1].children.length).toEqual(1);

    expect(actualNode.children[1].children[0].name).toEqual('MyMacros');
    expect(actualNode.children[1].children[0].hover).toEqual('Type: Macro Collection');
    expect(actualNode.children[1].children[0].children.length).toEqual(1);

    expect(actualNode.children[1].children[0].children[0].name).toEqual('my first macro "param"');
    expect(actualNode.children[1].children[0].children[0].hover).toEqual('Type: Macro');
    expect(actualNode.children[1].children[0].children[0].children.length).toEqual(0);

    expect(actualNode.children[2].name).toEqual('./.');
    expect(actualNode.children[2].hover).toEqual('Type: Namespace');
    expect(actualNode.children[2].children.length).toEqual(0);
  });
});
