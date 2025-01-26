package main

import (
	"log"
	"net/http"
	"react-form-input-manager/backend/config"
	"react-form-input-manager/backend/models"
	"react-form-input-manager/backend/routes"

	"github.com/rs/cors"
)

func main() {
    // Connect to database
    config.ConnectDB()

    // Auto-migrate User model
    config.DB.AutoMigrate(&models.User{})

    // Setup routes
    router := routes.SetupRoutes()

    c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:5173"},
        AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders: []string{"Content-Type", "Authorization"},
    })

    handler := c.Handler(router)

    // Start server
    log.Println("Server is running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}
