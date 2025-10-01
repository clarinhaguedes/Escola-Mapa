package rotas

import (
	"modulo/controle"
	"net/http"
)

func CarregarRotas() {

	http.HandleFunc("/", controle.Index)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
}
