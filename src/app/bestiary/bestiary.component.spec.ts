import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestiaryComponent } from './bestiary.component';

describe('BestiaryComponent', () => {
  let component: BestiaryComponent;
  let fixture: ComponentFixture<BestiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
