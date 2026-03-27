export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "customer"
}

export interface LoginDTO {
  email: string;
  password: string;
}
