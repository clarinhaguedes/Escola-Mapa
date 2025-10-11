package main

import (
	"fmt"
	"modulo/rotas"
	"net/http"
)

func main () {
	rotas.CarregarRotas()
	fmt.Println(" esse é um teste")
	http.ListenAndServe(":8080", nil)
}