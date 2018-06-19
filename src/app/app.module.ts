import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestStepSelectorModule } from './modules/test-step-selector/test-step-selector.module';
import { MessagingModule } from '@testeditor/messaging-service';
import { TestStepService } from './modules/test-step-service/test-step.service';
import { TestStepServiceMock } from './test-step-service-mock';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, TestStepSelectorModule.forRoot({ testStepServiceUrl: 'http://localhost:8080/index' }), MessagingModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: TestStepService, useClass: TestStepServiceMock }
  ]
})
export class AppModule { }
