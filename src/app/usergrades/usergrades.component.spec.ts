import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergradesComponent } from './usergrades.component';

describe('UsergradesComponent', () => {
  let component: UsergradesComponent;
  let fixture: ComponentFixture<UsergradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsergradesComponent]
    });
    fixture = TestBed.createComponent(UsergradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
