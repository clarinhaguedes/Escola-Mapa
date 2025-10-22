package controle

import "net/http"

func VerificarAutenticacao(r *http.Request) bool {
    cookie, err := r.Cookie("session")
    if err != nil {
        return false
    }
    return sessoes[cookie.Value] != ""
}

func GetUsuarioLogado(r *http.Request) string {
    cookie, err := r.Cookie("session")
    if err != nil {
        return ""
    }
    return sessoes[cookie.Value]
}