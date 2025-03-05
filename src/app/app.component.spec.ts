import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {DebitFormComponent} from './debit-form/debit-form.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent],
      providers: [provideAnimations()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
