import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { TestStepService, DefaultTestStepService, TestStepNode, TestStepNodeType } from './test-step.service';
import { TestStepServiceConfig } from './test-step-service-config';
import { MessagingService, MessagingModule } from '@testeditor/messaging-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpProviderService } from '../http-provider-service/http-provider.service';

describe('TestStepService', () => {
  let serviceConfig: TestStepServiceConfig;
  let messagingService: MessagingService;
  let mockClient: HttpClient;

  beforeEach(() => {
    serviceConfig = { testStepServiceUrl: 'http://localhost:8080/index' };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MessagingModule.forRoot()
      ],
      providers: [
        { provide: TestStepService, useClass: DefaultTestStepService },
        { provide: TestStepServiceConfig, useValue: serviceConfig },
        HttpProviderService,
        HttpClient
       ]
    });

    messagingService = TestBed.get(MessagingService);
    mockClient = TestBed.get(HttpClient);

    const subscription = messagingService.subscribe('httpClient.needed', () => {
      subscription.unsubscribe();
      messagingService.publish('httpClient.supplied', { httpClient: mockClient });
    });
  });

  it('should be created', inject([TestStepService], (service: TestStepService) => {
    expect(service).toBeTruthy();
  }));

  it('should transform root node from json', fakeAsync(inject([HttpTestingController, TestStepService],
    (httpMock: HttpTestingController, stepService: TestStepService) => {
      // given
      const testStepRequest = {
        method: 'GET',
        url: serviceConfig.testStepServiceUrl
      };
      const mockResponse = { displayName: 'root', type: 'root', children: [] };

      // when
      stepService.getTestSteps()

        // then
        .then((rootNode) =>
              expect(rootNode).toEqual({ displayName: 'root', type: TestStepNodeType.ROOT, children: [ ] }));

      httpMock.match(testStepRequest)[0].flush(mockResponse);
    })));

  it('should transform nontrivial tree from json', fakeAsync(inject([HttpTestingController, TestStepService],
    (httpMock: HttpTestingController, stepService: TestStepService) => {
      // given
      const testStepRequest = {
        method: 'GET',
        url: serviceConfig.testStepServiceUrl
      };
      const mockResponse = {
        displayName: 'root', type: 'root',
        children: [
          { displayName: 'org.testeditor', type: 'namespace',
            children: [
              { displayName: 'DummyComponent', type: 'component',
                children: [
                  { displayName: 'some interaction', type: 'interaction',
                    children: [] },
                  { displayName: 'Button', type: 'element',
                    children: [
                      { displayName: 'click <Button>', type: 'interaction',
                        children: [] }
                    ]}
                ]}
            ]},
          { displayName: 'com.example', type: 'namespace',
            children: [
              { displayName: 'MyMacros', type: 'macroCollection',
                  children: [
                    { displayName: 'my first macro "param"', type: 'macro',
                      children: []}
                  ]}
            ]},
          { displayName: './.', type: 'namespace',
            children: null }
        ]};

      let thenExpectionsExecuted = false;

      // when
      stepService.getTestSteps()

        // then
        .then((rootNode) => {
          thenExpectionsExecuted = true;
          expect(rootNode.displayName).toEqual('root');
          expect(rootNode.children.length).toEqual(3);
          expect(rootNode.children[0].displayName).toEqual('org.testeditor');
          expect(rootNode.children[0].children[0].displayName).toEqual('DummyComponent');
          expect(rootNode.children[0].children[0].type).toEqual(TestStepNodeType.COMPONENT);
          expect(rootNode.children[0].children[0].children[1].children[0].displayName).toEqual('click <Button>');
          expect(rootNode.children[1].displayName).toEqual('com.example');
          expect(rootNode.children[1].type).toEqual(TestStepNodeType.NAMESPACE);
          expect(rootNode.children[2].displayName).toEqual('./.');
          expect(rootNode.children[2].type).toEqual(TestStepNodeType.NAMESPACE);
        });

      httpMock.match(testStepRequest)[0].flush(mockResponse);
      tick();
      expect(thenExpectionsExecuted).toBeTruthy();

    })));

});
