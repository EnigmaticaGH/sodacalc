import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicStatsComponent } from './relic-stats.component';

describe('RelicStatsComponent', () => {
  let component: RelicStatsComponent;
  let fixture: ComponentFixture<RelicStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelicStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelicStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
