import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpdfComponent } from './uploadpdf.component';

describe('UploadpdfComponent', () => {
  let component: UploadpdfComponent;
  let fixture: ComponentFixture<UploadpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadpdfComponent]
    });
    fixture = TestBed.createComponent(UploadpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
