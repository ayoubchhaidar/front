import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLesoonComponent } from './add-lesoon.component';

describe('AddLesoonComponent', () => {
  let component: AddLesoonComponent;
  let fixture: ComponentFixture<AddLesoonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLesoonComponent]
    });
    fixture = TestBed.createComponent(AddLesoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
