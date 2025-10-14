package main

import (
	"log"
	"net/http"
)

func main() {
	// Servir arquivos estáticos
	http.Handle("/static/", http.StripPrefix("/static/", 
		http.FileServer(http.Dir("static"))))

	// Rotas para páginas HTML completas
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "templates/home.html")
	})

	http.HandleFunc("/mapa", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "templates/mapa.html")
	})

	http.HandleFunc("/cadastro", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "templates/cadastro.html")
	})

	http.HandleFunc("/relatorios", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "templates/relatorios.html")
	})

	log.Println("🚀 Servidor MPA rodando em http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}