import { Injectable } from '@angular/core';
import { HttpProviderService } from '../http-provider-service/http-provider.service';
import { TestStepServiceConfig } from './test-step-service-config';

export enum TestStepNodeType {
  ROOT = 'root',
  NAMESPACE = 'namespace',
  COMPONENT = 'component',
  INTERACTION = 'interaction',
  MACRO_COLLECTION = 'macroCollection',
  MACRO = 'macro',
  ELEMENT = 'element'
}
export interface TestStepNode {
  displayName: string;
  type: TestStepNodeType;
  children: TestStepNode[];
}

export abstract class TestStepService {
  abstract async getTestSteps(): Promise<TestStepNode>;
}

@Injectable()
export class DefaultTestStepService extends TestStepService {
  private static readonly URL_SUFFIX = '/step-tree';

  constructor(private config: TestStepServiceConfig, private httpProvider: HttpProviderService) {
    super();
  }

  async getTestSteps(): Promise<TestStepNode> {
    const client = await this.httpProvider.getHttpClient();
    console.log('URL is ' + this.config.testStepServiceUrl);
    return await client.get<TestStepNode>(this.config.testStepServiceUrl + DefaultTestStepService.URL_SUFFIX).toPromise();
  }
}
