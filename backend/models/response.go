package models

type RegisterResponse struct {
	User struct {
		ID       string `json:"id"`
		Username string `json:"username"`
	} `json:"user"`
}

type ApiErrorResponse struct {
	Message string `json:"message"`
}

type LoginResponse struct {
	Token    string `json:"token"`
	Username string `json:"username"`
}
