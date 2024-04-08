import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizContentComponent } from './quiz-content.component';

describe('QuizContentComponent', () => {
  let component: QuizContentComponent;
  let fixture: ComponentFixture<QuizContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizContentComponent]
    });
    fixture = TestBed.createComponent(QuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
