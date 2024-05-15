import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmissionsComponent } from './view-submissions.component';

describe('ViewSubmissionsComponent', () => {
  let component: ViewSubmissionsComponent;
  let fixture: ComponentFixture<ViewSubmissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubmissionsComponent]
    });
    fixture = TestBed.createComponent(ViewSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
