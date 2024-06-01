import { TestBed } from '@angular/core/testing';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {AppHtppEzInterceptor} from "./app-htpp-ez.interceptor";

describe('appHtppEzInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppHtppEzInterceptor, useClass: AppHtppEzInterceptor }
      ]
    });

    interceptor = TestBed.inject(AppHtppEzInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept requests', () => {
    const req = new HttpRequest<any>('GET', 'https://example.com/api');
    const handler: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        // Mocking the response here
        return of(new HttpResponse({ status: 200, body: {} }));
      }
    };

    const intercepted = interceptor.intercept(req, handler);

    expect(intercepted).toBeTruthy();
    // You can add more expectations here based on your interceptor behavior
  });
});
