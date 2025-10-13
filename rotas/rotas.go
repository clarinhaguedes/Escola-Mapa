package rotas

import (
	"modulo/controle"
	"net/http"
)

func CarregarRotas() {

	http.HandleFunc("/", controle.Index)
	http.HandleFunc("/", controle.Mapa)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

}

