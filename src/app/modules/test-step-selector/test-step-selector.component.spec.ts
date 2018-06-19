import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { TestStepSelectorComponent } from './test-step-selector.component';
import { DefaultTestStepService, TestStepNode, TestStepNodeType, TestStepService } from '../test-step-service/test-step.service';
import { mock, when, instance } from 'ts-mockito';
import { By } from '@angular/platform-browser';
import { TreeViewerModule } from '@testeditor/testeditor-commons';
import { element } from 'protractor';

describe('TestStepSelectorComponent', () => {

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

  function testStepTree2Array(tree: TestStepNode): TestStepNode[] {
    if (tree.children) {
      return [ tree ].concat(tree.children.reduce((accumulator, child) => accumulator.concat(testStepTree2Array(child)), []));
    } else {
      return [ tree ];
    }
  }


  let component: TestStepSelectorComponent;
  let fixture: ComponentFixture<TestStepSelectorComponent>;
  let testStepServiceMock: TestStepService;

  beforeEach(async(() => {
    testStepServiceMock = mock(DefaultTestStepService);
    when(testStepServiceMock.getTestSteps()).thenResolve(testStepTree);

    TestBed.configureTestingModule({
      imports: [ TreeViewerModule ],
      declarations: [ TestStepSelectorComponent ],
      providers: [{provide: TestStepService, useValue: instance(testStepServiceMock)}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStepSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays test steps retrieved from service', fakeAsync(() => {
    // given


    // when
    component.updateModel();
    tick();

    // then
    const elementNames = testStepTree2Array(testStepTree).map((node) => node.displayName);
    expect(fixture.debugElement.queryAll(By.css('.tree-view-element'))
      .map((elem) => elem.nativeElement.innerText)).toEqual(elementNames);
  }));
});
