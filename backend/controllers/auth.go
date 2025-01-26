package controllers

import (
	"encoding/json"
	"net/http"
	"react-form-input-manager/backend/config"
	"react-form-input-manager/backend/models"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)


func Register(w http.ResponseWriter, r *http.Request) {
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}


	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)


	if result := config.DB.Create(&user); result.Error != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}
    userID := strconv.Itoa(int(user.ID))

	registerResponse := models.RegisterResponse{
		User: struct {
			ID       string `json:"id"`
			Username string `json:"username"`
		}{
			ID:       userID,
			Username: user.Username,
		},
	}


	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(registerResponse)
}


func Login(w http.ResponseWriter, r *http.Request) {
	var input models.User
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}


	if result := config.DB.Where("username = ?", input.Username).First(&user); result.Error != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}


	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}


	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}


	loginResponse := models.LoginResponse{
		Token:    tokenString,
		Username: user.Username,
	}


	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(loginResponse)
}
