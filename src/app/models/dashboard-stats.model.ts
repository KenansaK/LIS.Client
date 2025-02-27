export interface DashboardStats {
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