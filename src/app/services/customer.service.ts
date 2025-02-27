import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  data: T;
  status: string;
  isSuccess: boolean;
  message: string;
  errors: any[];
}

interface CustomerCreate {
  companyCommercialName: string;
  companyLegalName: string;
  businessType: number;
  customerCode: string;
  customerNumber: string;
  registrationNumber: string;
  status: number;
  billingExternalCode: string;
  externalCode: string;
  storeBarcodePrefix: string;
  logoBase64: string;
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
    customers: T[];
  };
  status: string;
  isSuccess: boolean;
  message: string;
  errors: string[];
}

interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  draftCustomers: number;
  inactiveCustomers: number;
  recentCustomers: {
    id: number;
    companyCommercialName: string;
    customerCode: string;
    status: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = 'https://localhost:44317/api/Customers'; 

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.apiUrl);
  }

  getCustomerById(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: CustomerCreate): Observable<ApiResponse<any>> {
    const payload = {
      companyCommercialName: customer.companyCommercialName,
      companyLegalName: customer.companyLegalName,
      businessType: Number(customer.businessType),
      customerCode: customer.customerCode,
      customerNumber: customer.customerNumber,
      registrationNumber: customer.registrationNumber,
      status: Number(customer.status),
      billingExternalCode: customer.billingExternalCode,
      externalCode: customer.externalCode,
      storeBarcodePrefix: customer.storeBarcodePrefix,
      logoBase64: customer.logoBase64
    };
    
    return this.http.post<ApiResponse<any>>(this.apiUrl, payload);
  }

  updateCustomer(id: number, customer: CustomerCreate): Observable<ApiResponse<any>> {
    const payload = {
      companyCommercialName: customer.companyCommercialName,
      companyLegalName: customer.companyLegalName,
      businessType: Number(customer.businessType),
      customerCode: customer.customerCode,
      customerNumber: customer.customerNumber,
      registrationNumber: customer.registrationNumber,
      status: Number(customer.status),
      billingExternalCode: customer.billingExternalCode,
      externalCode: customer.externalCode,
      storeBarcodePrefix: customer.storeBarcodePrefix,
      logoBase64: customer.logoBase64
    };

    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, payload);
  }

  deleteCustomer(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  getPaginatedCustomers(query: PaginationQuery): Observable<PaginatedResponse<any>> {
    
    return this.http.post<PaginatedResponse<any>>(`${this.apiUrl}/GetPaginatedCustomers`, query);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.getPaginatedCustomers({
      pageIndex: 1,
      pageSize: 100000,
      searchTerm: "",
      sortColumn: "",
      sortAscending: true
    }).pipe(
      map(response => {
        return {
          totalCustomers: response.data.totalRecords,
          activeCustomers: response.data.customers.filter(c => c.status === 1).length,
          inactiveCustomers: response.data.customers.filter(c => c.status === 2).length,
          draftCustomers: response.data.customers.filter(c => c.status === 4).length,
          recentCustomers: response.data.customers.map(c => ({
            id: c.id,
            companyCommercialName: c.companyCommercialName,
            customerCode: c.customerCode,
            status: c.status
          }))
        };
      })
    );
  }

  getBranchesByCustomerId(customerId: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${customerId}/branches`);
  }
}
