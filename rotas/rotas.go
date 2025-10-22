package rotas

import (
	"modulo/controle"
	"net/http"
)

func Carregar() {
	// Arquivos estáticos (CSS, JS)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	
	// Rotas das páginas
	http.HandleFunc("/", controle.Home)
	http.HandleFunc("/mapa", controle.Mapa)
	http.HandleFunc("/cadastro", controle.Cadastro) 
	http.HandleFunc("/relatorios", controle.Relatorios)
}
