import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
    data: T;
    status: string;
    isSuccess: boolean;
    message: string;
    errors: any[];
  }

@Injectable({
  providedIn: 'root'
})

export class RolePermissionsService {
  private apiUrl = 'https://localhost:44318/api/RolePermission';

  constructor(private http: HttpClient) { }
  

  getRolePermissions(roleId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/roles/${roleId}/permissions`);
  }


  
  AssignPermissionToRole(roleId: number, permissionId: number): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/roles/${roleId}/permissions?permissionId=${permissionId}`;
    return this.http.post<ApiResponse<any>>(url, {});
  }

  deletePermissionFromRole(roleId: number, permissionId: number): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/roles/${roleId}/permissions?permissionId=${permissionId}`;
    console.log('Making DELETE API call to:', url);
    return this.http.delete<ApiResponse<any>>(url);
  }

}

