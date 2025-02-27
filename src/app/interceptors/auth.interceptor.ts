import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable() 
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don't intercept the refresh token request itself
    if (request.url.includes('refreshToken')) {
      return next.handle(request);
    }

    let token = this.authService.getToken();
    console.log('🔍 Request URL:', request.url);
    console.log('🔍 Current token:', token);

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('🔍 Error status:', error.status);
        console.log('🔍 Is refreshing:', this.isRefreshing);
        console.log('🔍 Has refresh token:', !!localStorage.getItem('refreshToken'));
        console.log('🔍 Error details:', error);

        if (error.status === 401 && !request.url.includes('refreshToken')) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken && !this.isRefreshing) {
            console.log('🔍 Starting token refresh process');
            this.isRefreshing = true;
            
            return this.authService.refreshToken().pipe(
              switchMap((response) => {
                console.log('🔍 Refresh token response:', response);
                this.isRefreshing = false;
                
                if (response.isSuccessful) {
                  console.log('🔍 Token refresh successful');
                  // Retry the original request with new token
                  const newRequest = request.clone({
                    setHeaders: { Authorization: `Bearer ${response.accessToken}` }
                  });
                  return next.handle(newRequest);
                } else {
                  console.log('🔍 Token refresh failed - response not successful');
                  this.handleSessionExpired();
                  return throwError(() => error);
                }
              }),
              catchError((refreshError) => {
                console.error('🔍 Token refresh error:', refreshError);
                this.isRefreshing = false;
                this.handleSessionExpired();
                return throwError(() => refreshError);
              }),
              finalize(() => {
                this.isRefreshing = false;
              })
            );
          }
        }
        return throwError(() => error);
      })
    );
  }

  private handleSessionExpired() {
    console.warn('Session expired, logging out...');
    this.authService.logout();
    Swal.fire({
      icon: 'error',
      title: 'Session Expired',
      text: 'Your session has expired. Please log in again.',
      confirmButtonText: 'OK',
      allowOutsideClick: false, // Prevent clicking outside
      allowEscapeKey: false // Prevent escape key
    }).then(() => {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url }
      });
    });
  }
}
