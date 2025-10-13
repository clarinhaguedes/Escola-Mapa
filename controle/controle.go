package controle

import (
	"net/http"
	"text/template"
)

var temp = template.Must(template.ParseGlob("templates/*.html"))

func Index(W http.ResponseWriter, r *http.Request) {
	temp.ExecuteTemplate(W, "Index", nil)
}

func Mapa(W http.ResponseWriter, r *http.Request) {
	temp.Execute(W, "Mapa")
}
