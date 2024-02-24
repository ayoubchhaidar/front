import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsMaterialsComponent } from './lessons-materials.component';

describe('LessonsMaterialsComponent', () => {
  let component: LessonsMaterialsComponent;
  let fixture: ComponentFixture<LessonsMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsMaterialsComponent]
    });
    fixture = TestBed.createComponent(LessonsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
