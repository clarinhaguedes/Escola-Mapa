package controle

import (
	"net/http"
	"text/template"
)

var temp = template.Must(template.ParseGlob("templates/*.html"))

// Home - Página inicial
func Home(w http.ResponseWriter, r *http.Request) {
	temp.ExecuteTemplate(w, "home.html", nil)
}

// Mapa - Página do mapa
func Mapa(w http.ResponseWriter, r *http.Request) {
	temp.ExecuteTemplate(w, "mapa.html", nil)
}

// Cadastro - Página de cadastro
func Cadastro(w http.ResponseWriter, r *http.Request) {
	temp.ExecuteTemplate(w, "cadastro.html", nil)
}

// Relatorios - Página de relatórios
func Relatorios(w http.ResponseWriter, r *http.Request) {
	temp.ExecuteTemplate(w, "relatorios.html", nil)
}