export interface RegisterResponse {
  user: {
    id: string;
    username: string;
  };
  token?: string;
}

export interface ApiErrorResponse {
  message: string;
}
