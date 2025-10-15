package rotas

import (
	"modulo/controle"
	"net/http"
)

<<<<<<< HEAD
func Carregar() {
	// Arquivos estáticos (CSS, JS)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	
	// Rotas das páginas
	http.HandleFunc("/", controle.Home)
	http.HandleFunc("/mapa", controle.Mapa)
	http.HandleFunc("/cadastro", controle.Cadastro) 
	http.HandleFunc("/relatorios", controle.Relatorios)
}
=======
func CarregarRotas() {

	http.HandleFunc("/", controle.Index)
	http.HandleFunc("/", controle.Mapa)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

}

>>>>>>> f658b47da6adea7c5970499791e4958aacf54fb8
