import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStepSelectorComponent } from './test-step-selector.component';

describe('TestStepSelectorComponent', () => {
  let component: TestStepSelectorComponent;
  let fixture: ComponentFixture<TestStepSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStepSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStepSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
