import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZennyScriptTutorialComponent } from './zenny-script-tutorial.component';

describe('ZennyScriptTutorialComponent', () => {
  let component: ZennyScriptTutorialComponent;
  let fixture: ComponentFixture<ZennyScriptTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZennyScriptTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZennyScriptTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
