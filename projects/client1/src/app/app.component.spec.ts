import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleIdentityModule } from '@jin-k/google-identity';
import { take } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        GoogleIdentityModule.forRoot({ clientId: '', scopes: '' })
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should not be connected at begin`, done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.connected$.pipe(take(1)).subscribe(connected => {
      expect(connected).toBeFalse();
      done();
    });
  });
});
