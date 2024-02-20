import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifSetupComponent } from './verif-setup.component';

describe('VerifSetupComponent', () => {
  let component: VerifSetupComponent;
  let fixture: ComponentFixture<VerifSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifSetupComponent]
    });
    fixture = TestBed.createComponent(VerifSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
