import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestStepService } from './modules/test-step-service/test-step.service';
import { TestStepSelectorComponent } from './modules/test-step-selector/test-step-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    TestStepSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
