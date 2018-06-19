import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewerModule } from '@testeditor/testeditor-commons';
import { TestStepSelectorComponent } from './test-step-selector.component';
import { TestStepServiceConfig } from '../test-step-service/test-step-service-config';
import { DefaultTestStepService, TestStepService } from '../test-step-service/test-step.service';
import { HttpProviderService } from '../http-provider-service/http-provider.service';

@NgModule({
  imports: [
    CommonModule, TreeViewerModule
  ],
  declarations: [
    TestStepSelectorComponent
  ],
  exports: [
    TestStepSelectorComponent
  ]
})
export class TestStepSelectorModule {
  static forRoot(testStepServiceConfig: TestStepServiceConfig): ModuleWithProviders {
    return {
      ngModule: TestStepSelectorModule,
      providers: [
        { provide: TestStepServiceConfig, useValue: testStepServiceConfig},
        { provide: TestStepService, useClass: DefaultTestStepService},
        HttpProviderService
      ]
    };
  }
}
