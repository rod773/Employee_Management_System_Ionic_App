export interface AuthResponse {
  user: {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    authToken: string;
    expiresIn: number;
  };
}
