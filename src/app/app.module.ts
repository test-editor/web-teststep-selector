import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestStepService } from './modules/test-step-service/test-step.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TestStepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
