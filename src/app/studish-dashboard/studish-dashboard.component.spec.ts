import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudishDashboardComponent } from './studish-dashboard.component';

describe('StudishDashboardComponent', () => {
  let component: StudishDashboardComponent;
  let fixture: ComponentFixture<StudishDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudishDashboardComponent]
    });
    fixture = TestBed.createComponent(StudishDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
