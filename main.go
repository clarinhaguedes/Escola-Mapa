package main

import (
	"fmt"
	"modulo/rotas"
	"net/http"
)

func main () {
	rotas.CarregarRotas()
	fmt.Println("O servidor está rodando na porta 8080")
	http.ListenAndServe(":8080", nil)
}