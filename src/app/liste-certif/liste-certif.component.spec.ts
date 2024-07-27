import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCertifComponent } from './liste-certif.component';

describe('ListeCertifComponent', () => {
  let component: ListeCertifComponent;
  let fixture: ComponentFixture<ListeCertifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCertifComponent]
    });
    fixture = TestBed.createComponent(ListeCertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
