export interface RegisterResponse {
  user: {
    id: string;
    username: string;
  };
}

export interface ApiErrorResponse {
  message: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}
