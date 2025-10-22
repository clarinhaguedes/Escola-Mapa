package controle

import (
    "html/template"
    "net/http"
)

// Carrega os templates corretamente
var temp = template.Must(template.ParseFiles(
    "templates/home.html",
    "templates/mapa.html",     
    "templates/cadastro.html",
    "templates/relatorios.html",
    "templates/login.html",     // 🆕 ADICIONADO
    "templates/registro.html",  // 🆕 ADICIONADO
    "templates/dashboard.html", // 🆕 ADICIONADO
))

func Home(w http.ResponseWriter, r *http.Request) {
    // Verificar se usuário está logado para mostrar menu diferente
    dados := map[string]interface{}{
        "Logado": VerificarAutenticacao(r),
        "Usuario": GetUsuarioLogado(r),
    }
    temp.ExecuteTemplate(w, "home.html", dados)
}

func Mapa(w http.ResponseWriter, r *http.Request) {
    temp.ExecuteTemplate(w, "mapa.html", nil)
}

func Cadastro(w http.ResponseWriter, r *http.Request) {
    temp.ExecuteTemplate(w, "cadastro.html", nil)
}

func Relatorios(w http.ResponseWriter, r *http.Request) {
    temp.ExecuteTemplate(w, "relatorios.html", nil)
}