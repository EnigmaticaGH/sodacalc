import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterStatCalcComponent } from './monster-stat-calc.component';

describe('MonsterStatCalcComponent', () => {
  let component: MonsterStatCalcComponent;
  let fixture: ComponentFixture<MonsterStatCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterStatCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterStatCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
