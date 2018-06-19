import { Injectable } from '@angular/core';

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
export class DefaultTestStepService implements TestStepService {

  constructor() { }

  async getTestSteps(): Promise<TestStepNode> {
    throw new Error('Method not implemented.');
  }
}
