import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleIdentityComponent } from './google-identity.component';

describe('GoogleIdentityComponent', () => {
  let component: GoogleIdentityComponent;
  let fixture: ComponentFixture<GoogleIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
