import { TestBed } from '@angular/core/testing';

import { ExamthinkInterceptor } from './examthink.interceptor';

describe('ExamthinkInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ExamthinkInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ExamthinkInterceptor = TestBed.inject(ExamthinkInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
