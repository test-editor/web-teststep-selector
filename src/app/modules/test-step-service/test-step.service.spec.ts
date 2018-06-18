import { TestBed, inject } from '@angular/core/testing';

import { TestStepService, DefaultTestStepService } from './test-step.service';
import { TestStepServiceConfig } from './test-step-service-config';
import { MessagingService, MessagingModule } from '@testeditor/messaging-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
});
