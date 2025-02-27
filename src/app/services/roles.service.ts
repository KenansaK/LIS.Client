import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
    data: T;
    status: string;
    isSuccess: boolean;
    message: string;
    errors: string[];
  }

  interface Role {
    id: number;
    name: string;
    status: boolean;
  }
  export interface CreateRoleDto {
    name: string;
    status: boolean;
  }

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'https://localhost:44318/api/Role';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${this.apiUrl}/roles`);
  }

  createRole(role: { name: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/roles`, role);
  }

  deleteRole(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/roles/${id}`);
  }

  updateRole(id: number, role: CreateRoleDto): Observable<ApiResponse<Role>> {
    return this.http.put<ApiResponse<Role>>(`${this.apiUrl}/roles/${id}`, role);
  }


}
