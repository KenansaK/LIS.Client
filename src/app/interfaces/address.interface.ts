import { Country } from './branch.interface';

export interface Address {
    id: number;
    country: Country;
    city: string;
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    locationCode1: string;
    locationCode2: string;
    locationCode3: string;
    faxNumber: string;
    contactName: string;
    email: string;
    phone: string;
    countryName?: string; // Added for display purposes
} 