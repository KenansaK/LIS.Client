import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  isEmailConfirmed: boolean;
  phoneNumber: string;
  lastLoginTime: string | null;
  roleId: number;
  status: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface CreateUserDto {
  username: string;
  fullName: string;
  password: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  status: number;
}
interface PaginationQuery {
    pageIndex: number;
    pageSize: number;
    searchTerm?: string;
    sortColumn?: string;
    sortAscending: boolean;
  }
  interface PaginatedResponse<T> {
    data: {
      totalRecords: number;
      pageIndex: number;
      pageSize: number;
      totalPages: number;
      users: T[];
    };
    status: string;
    isSuccess: boolean;
    message: string;
    errors: string[];
  }
interface ApiResponse<T> {
    data: T;
    status: string;
    isSuccess: boolean;
    message: string;
    errors: any[];
  }
 

interface Permission {
  id: number;
  permissionCode: string;
  permissionName: string;
  module: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://localhost:44318/api/Users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getPaginatedUsers(query: PaginationQuery): Observable<PaginatedResponse<any>> {
    
    return this.http.post<PaginatedResponse<any>>(`${this.apiUrl}/GetPaginatedUsers`, query);
  }

  createUser(user: CreateUserDto): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<CreateUserDto>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

 

  

  
}
