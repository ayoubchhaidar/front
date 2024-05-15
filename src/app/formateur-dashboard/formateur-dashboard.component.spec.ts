import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurDashboardComponent } from './formateur-dashboard.component';

describe('FormateurDashboardComponent', () => {
  let component: FormateurDashboardComponent;
  let fixture: ComponentFixture<FormateurDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurDashboardComponent]
    });
    fixture = TestBed.createComponent(FormateurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
