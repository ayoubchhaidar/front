import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCourseComponent } from './generate-course.component';

describe('GenerateCourseComponent', () => {
  let component: GenerateCourseComponent;
  let fixture: ComponentFixture<GenerateCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateCourseComponent]
    });
    fixture = TestBed.createComponent(GenerateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
