import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Permission {
  id: number;
  name: string;
  module: string;
  isGranted: boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: string;
  isSuccess: boolean;
  message: string;
  errors: string[];
}
export interface PermissionResponse {
  data: {
    roleName: string;
    permissions: Permission[];
  };
  status: string;
  isSuccess: boolean;
  message: string;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private apiUrl = `https://localhost:44318/api/Permission`;

  constructor(private http: HttpClient) { }

  // Get all permissions
  getPermissions(): Observable<ApiResponse<Permission[]>> {
    return this.http.get<ApiResponse<Permission[]>>(`${this.apiUrl}/permissions`);
  }

  // Get current user's permissions
  getCurrentUserPermissions(): Observable<PermissionResponse> {
    return this.http.get<PermissionResponse>(`${this.apiUrl}/user/permissions`)
      .pipe(
        tap(response => {
          if (response.isSuccess) {
            const grantedPermissions = response.data.permissions
              .filter(p => p.isGranted)
              .map(p => ({ id: p.id, name: p.name, module: p.module }));
            localStorage.setItem('userPermissions', JSON.stringify(grantedPermissions));
          }
        })
      );
  }

  // Get role permissions without saving to localStorage
  getRolePermissionsWithAllForRole(roleId: number): Observable<PermissionResponse> {
    return this.http.get<PermissionResponse>(`${this.apiUrl}/roles/${roleId}/all-permissions`)
      .pipe(
        tap(response => {
          if (response.isSuccess) {
            // Store only the granted permissions with name
            const grantedPermissions = response.data.permissions
              .filter(p => p.isGranted)
              .map(p => ({ 
                id: p.id, 
                name: p.name, 
                module: p.module 
              }));
           
          }
        })
      );
  }
  getRolePermissionsWithAll(roleId: number): Observable<PermissionResponse> {
    return this.http.get<PermissionResponse>(`${this.apiUrl}/roles/${roleId}/all-permissions`)
      .pipe(
        tap(response => {
          if (response.isSuccess) {
            // Store only the granted permissions with name
            const grantedPermissions = response.data.permissions
              .filter(p => p.isGranted)
              .map(p => ({ 
                id: p.id, 
                name: p.name, 
                module: p.module 
              }));
            localStorage.setItem('userPermissions', JSON.stringify(grantedPermissions));
          }
        })
      );
  }


  hasPermission(permissionName: string): boolean {
    const permissionsStr = localStorage.getItem('userPermissions');
    if (!permissionsStr) return false;

    const permissions = JSON.parse(permissionsStr);
    return permissions.some((p: Permission) => p.name === permissionName);
  }
} 