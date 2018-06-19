import { Injectable } from '@angular/core';

export enum TestStepType {
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
  type: TestStepType;
  children: TestStepNode[];
}

export abstract class TestStepService {
  abstract async getTestSteps(): Promise<TestStepType>;
}

@Injectable()
export class DefaultTestStepService implements TestStepService {

  constructor() { }

  async getTestSteps(): Promise<TestStepType> {
    throw new Error('Method not implemented.');
  }
}
