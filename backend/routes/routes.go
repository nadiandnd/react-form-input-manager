package routes

import (
	"react-form-input-manager/backend/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
    router := mux.NewRouter()

    router.HandleFunc("/api/register", controllers.Register).Methods("POST")
    router.HandleFunc("/api/login", controllers.Login).Methods("POST")

    return router
}
