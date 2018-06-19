import { TestStepNode, TestStepNodeType } from '../test-step-service/test-step.service';
import { TestStepTreeNode } from './test-step-tree-node';

describe('TestStepTreeNode', () => {

  it('can be created', () => {
    // given
    const testStepTree: TestStepNode = { displayName: 'root', type: TestStepNodeType.ROOT, children: [
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
