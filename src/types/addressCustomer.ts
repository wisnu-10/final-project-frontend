export type AddressCustomerDTO = {
  id: string
  recipientName: string;
  recipientPhoneNumber: string;
  label: string;
  address: string;
  districtId: number;
  districtName: string;
  cityId: number;
  cityName: string;
  provinceId: number;
  provinceName: string;
  postalCode: string;
  notes?: string | null;
  latitude: number;
  longitude: number;
  isPrimary: boolean;
};

interface AddressResponse {
  addresses: AddressCustomerDTO[];
}