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
export class BranchService {
  private apiUrl = 'https://localhost:44317/api/Branches';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.apiUrl);
  }

  getBranchById(branchId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${branchId}`);
  }

  createBranch(branch: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, branch);
  }

  updateBranch(branchId: number, branch: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${branchId}`, branch);
  }

  deleteBranch(branchId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${branchId}`);
  }

  getAddressesByBranchId(branchId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${branchId}/addresses`);
  }

  getAddressById(branchId: number, addressId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${branchId}/addresses/${addressId}`);
  }
} 