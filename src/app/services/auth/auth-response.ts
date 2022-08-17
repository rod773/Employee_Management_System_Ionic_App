export interface AuthResponse {
  status: string;
  data: {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    authToken: string;
    expiresIn: number;
  };
}
