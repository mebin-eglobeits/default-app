export interface CustomerAddressInterface {
    id?: number;
    customer_id?: number;
    region_code?: string;
    region?: string;
    region_id: number;
    country_id: string;
    street: string[];
    telephone: string;
    postcode: string;
    city: string;
    firstname: string;
    lastname: string;
    email?: string;
    default_shipping?: boolean;
    default_billing?: boolean;
    same_as_billing?: number;
}
