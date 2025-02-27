import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authorizationApiUrl = 'https://localhost:44318/api/Authentication'; // Replace with your API URL
  private usersApiUrl = 'https://localhost:44318/api/Users'; // Replace with your API URL
  private refreshTokenTimeout: any;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log('No token found'); // Debug log
      return false;
    }

    // Remove 'Bearer ' prefix if it exists
    const jwtToken = token.replace('Bearer ', '');
    
    try {
      // Get the payload part of the JWT
      const payload = JSON.parse(atob(jwtToken.split('.')[1]));
      // Check if token is expired
      const expiry = payload.exp * 1000; // Convert to milliseconds
      const isValid = expiry > Date.now();
      console.log('Token valid:', isValid); // Debug log
      return isValid;
    } catch (error) {
      console.error('Token validation error:', error); // Debug log
      return false;
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.authorizationApiUrl}`, credentials).pipe(
      tap(response => {
        console.log('🔍 Login response:', response);
        if (response.isSuccessful) {
          this.saveToken(response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.startRefreshTokenTimer(response.accessToken);
        }
      })
    );
  }
  
  

  getUserPermissions(): Observable<any> {
    return this.http.get<any>(`${this.authorizationApiUrl}/user-permissions`)
      .pipe(
        tap(response => {
          if (response.isSuccess) {
            localStorage.setItem('userPermissions', JSON.stringify(response.data));
          }
        })
      );
  }

  signUp(user: {
    username: string;
    fullName: string;
    password: string;
    email: string;
    phoneNumber: string;
    roleId: number;
  status: number;
  }): Observable<any> {
    const userWithStaticValues = {
      ...user,
      roleId: 2,  // Static value for roleId
      status: 1    // Static value for status
    };
    return this.http.post<any>(`${this.usersApiUrl}`, userWithStaticValues);
  }
  
  saveToken(token: string): void {
    // Don't add 'Bearer ' prefix when saving
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (!token) return null;

    try {
      const jwtToken = token.replace('Bearer ', '');
      const payload = JSON.parse(atob(jwtToken.split('.')[1]));
      const expires = new Date(payload.exp * 1000);
      
      if (expires.getTime() <= Date.now()) {
        console.warn('🔍 Token expired, attempting refresh');
        this.refreshToken().subscribe();
        return null;
      }
      
      return `Bearer ${token}`;
    } catch (error) {
      console.error('🔍 Error parsing token:', error);
      return null;
    }
  }

  logout(): void {
    this.stopRefreshTokenTimer(); // Stop the timer
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userPermissions'); // Clear permissions as well
  }
  

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('🔍 Attempting to refresh token with:', refreshToken);
    
    if (!refreshToken) {
      console.log('🔍 No refresh token found');
      return throwError(() => 'No refresh token available');
    }

    // Encode the refresh token to handle special characters
    const encodedRefreshToken = encodeURIComponent(refreshToken);
    
    return this.http.get<any>(`${this.authorizationApiUrl}?refreshToken=${encodedRefreshToken}`)
      .pipe(
        tap(response => {
          console.log('🔍 Refresh token API response:', response);
          if (response.isSuccessful) {
            console.log('🔍 Saving new tokens');
            this.saveToken(response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.startRefreshTokenTimer(response.accessToken);
          } else {
            console.error('🔍 Refresh token response not successful:', response);
          }
        }),
        catchError(error => {
          console.error('🔍 Refresh token error details:', {
            status: error.status,
            statusText: error.statusText,
            error: error.error,
            url: error.url
          });
          return throwError(() => error);
        })
      );
  }

  private startRefreshTokenTimer(token: string) {
    this.stopRefreshTokenTimer();
    
    try {
      const jwtToken = token.replace('Bearer ', '');
      const payload = JSON.parse(atob(jwtToken.split('.')[1]));
      const expires = new Date(payload.exp * 1000);
      // Refresh 30 seconds before expiry instead of 10
      const timeout = expires.getTime() - Date.now() - (30 * 1000);
      
      console.log('🔍 Current time:', new Date());
      console.log('🔍 Token expires at:', new Date(expires));
      console.log('🔍 Setting refresh timer for:', new Date(Date.now() + timeout));
      console.log('🔍 Timeout duration (ms):', timeout);
      
      if (timeout <= 0) {
        console.warn('🔍 Token already expired or about to expire');
        this.refreshToken().subscribe();
        return;
      }

      this.refreshTokenTimeout = setTimeout(() => {
        console.log('🔍 Auto refresh timer triggered');
        this.refreshToken().subscribe({
          next: (response) => console.log('🔍 Auto refresh successful:', response),
          error: (error) => {
            console.error('🔍 Auto refresh token failed:', error);
            // Retry once if it fails
            setTimeout(() => {
              console.log('🔍 Retrying refresh token...');
              this.refreshToken().subscribe({
                error: (retryError) => {
                  console.error('🔍 Retry also failed:', retryError);
                  this.handleRefreshError();
                }
              });
            }, 1000);
          }
        });
      }, timeout);
    } catch (error) {
      console.error('🔍 Error setting refresh timer:', error);
    }
  }

  private handleRefreshError() {
    console.warn('🔍 Handling refresh error - logging out');
    this.logout();
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }
}
