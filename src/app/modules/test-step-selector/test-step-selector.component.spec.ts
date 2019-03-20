import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { TestStepSelectorComponent } from './test-step-selector.component';
import { DefaultTestStepService, TestStepNode, TestStepNodeType, TestStepService } from '../test-step-service/test-step.service';
import { mock, when, instance } from 'ts-mockito';
import { By } from '@angular/platform-browser';
import { TreeViewerModule } from '@testeditor/testeditor-commons';
import { MessagingService, MessagingModule } from '@testeditor/messaging-service';
import { Clipboard } from 'ts-clipboard';
import { DebugElement } from '@angular/core';

describe('TestStepSelectorComponent', () => {

  const testStepTree: TestStepNode = { displayName: 'Test Steps', type: TestStepNodeType.ROOT, children: [
    { displayName: 'org.testeditor', type: TestStepNodeType.NAMESPACE, children: [
      { displayName: 'DummyComponent', type: TestStepNodeType.COMPONENT, children: [
        { displayName: 'some interaction', type: TestStepNodeType.INTERACTION, children: [] },
        { displayName: 'zzz interaction', type: TestStepNodeType.INTERACTION, children: [] },
        { displayName: 'another interaction', type: TestStepNodeType.INTERACTION, children: [] },
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
    { displayName: '::', type: TestStepNodeType.NAMESPACE, children: null }
  ]};

  const nodeNamesInExpectedOrder = [
    'Test Steps',
      '::',
      'com.example',
        'MyMacros',
          'my first macro "param"',
      'org.testeditor',
        'DummyComponent',
          'another interaction',
          'Button',
            'click <Button>',
          'some interaction',
          'zzz interaction'];

  let component: TestStepSelectorComponent;
  let fixture: ComponentFixture<TestStepSelectorComponent>;
  let testStepServiceMock: TestStepService;
  let messagingService: MessagingService;

  beforeEach(async(() => {
    testStepServiceMock = mock(DefaultTestStepService);
    when(testStepServiceMock.getTestSteps()).thenResolve(testStepTree);

    TestBed.configureTestingModule({
      imports: [ TreeViewerModule, MessagingModule.forRoot() ],
      declarations: [ TestStepSelectorComponent ],
      providers: [{provide: TestStepService, useValue: instance(testStepServiceMock)}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    messagingService = TestBed.get(MessagingService);
    fixture = TestBed.createComponent(TestStepSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays test steps retrieved from service, ordered alphabetically by name', fakeAsync(() => {
    // when
    component.updateModel();
    tick();
    fixture.detectChanges();

    // then
    expect(fixture.debugElement.queryAll(By.css('.tree-view-element'))
      .map((elem) => elem.nativeElement.innerText)).toEqual(nodeNamesInExpectedOrder);
  }));

  it('collapses node on click', fakeAsync(() => {
    // given
    component.updateModel();
    tick();
    fixture.detectChanges();
    const rootElement = fixture.debugElement.query(By.css('.tree-view-element')).nativeElement;

    // when
    rootElement.click();
    tick();
    fixture.detectChanges();

    // then
    const hiddenSubtree = fixture.debugElement.query(By.css('.tree-view > .collapsed-subtree'));
    expect(hiddenSubtree).toBeTruthy();
  }));

  it('copies test step prefixed with "- " to clipboard when double-clicking leaf element', fakeAsync(() => {
    // given
    const expectedPositionOfSomeInteraction = 10;
    component.updateModel();
    tick();
    fixture.detectChanges();
    const treeElements = fixture.debugElement.queryAll(By.css('.tree-view-item-key'));

    // when
    treeElements[expectedPositionOfSomeInteraction].triggerEventHandler('dblclick', new MouseEvent('dblclick'));
    fixture.detectChanges();
    tick();

    // then
    expect(Clipboard['_data']).toEqual('- some interaction');
  }));

  it('does not copy anything to clipboard when double-clicking inner (non-leaf) element', fakeAsync(() => {
    // given
    Clipboard['_data'] = '';
    component.updateModel();
    tick();
    fixture.detectChanges();
    const treeElements = fixture.debugElement.queryAll(By.css('.tree-view-item-key'));

    // when
    treeElements[2].triggerEventHandler('dblclick', new MouseEvent('dblclick'));
    fixture.detectChanges();
    tick();

    // then
    expect(Clipboard['_data']).toEqual('');
  }));

  it('sends "copied to clipboard!" message to snackbar via message bus on double-click', fakeAsync(() => {
    // given
    const expectedPositionOfSomeInteraction = 10;
    let actualMessage = null;
    const subscription = messagingService.subscribe('snackbar.display.notification', (payload) => actualMessage = payload.message);
    component.updateModel();
    tick();
    fixture.detectChanges();
    const treeElements = fixture.debugElement.queryAll(By.css('.tree-view-item-key'));

    // when
    treeElements[expectedPositionOfSomeInteraction].triggerEventHandler('dblclick', new MouseEvent('dblclick'));
    fixture.detectChanges();
    tick();

    // then
    expect(actualMessage).toEqual('copied to clipboard!');

    // cleanup
    subscription.unsubscribe();
  }));

});
