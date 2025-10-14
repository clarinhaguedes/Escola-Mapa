package main

import (
	"log"
	"net/http"
	"modulo/rotas"
)

func main() {
	// Carrega TODAS as rotas
	rotas.Carregar()
	
	// Inicia o servidor
	log.Println("🚀 Servidor rodando em http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}