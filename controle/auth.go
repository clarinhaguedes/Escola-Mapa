package controle

import (
    "fmt"
    "modulo/models"
    "net/http"
    "time"
)

// Simulação de banco de dados em memória
var usuarios = make(map[string]models.Usuario)
var sessoes = make(map[string]string)

func Login(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        temp.ExecuteTemplate(w, "login.html", nil)
        return
    }

    // Processar login
    email := r.FormValue("email")
    senha := r.FormValue("senha")

    usuario, existe := usuarios[email]
    if !existe || usuario.Senha != senha {
        temp.ExecuteTemplate(w, "login.html", map[string]string{
            "Erro": "Email ou senha incorretos",
        })
        return
    }

    // Criar sessão
    sessionID := gerarSessionID()
    sessoes[sessionID] = email

    http.SetCookie(w, &http.Cookie{
        Name:    "session",
        Value:   sessionID,
        Expires: time.Now().Add(24 * time.Hour),
    })

    http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
}

func Registro(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        temp.ExecuteTemplate(w, "registro.html", nil)
        return
    }

    // Processar registro
    nome := r.FormValue("nome")
    email := r.FormValue("email")
    senha := r.FormValue("senha")

    if _, existe := usuarios[email]; existe {
        temp.ExecuteTemplate(w, "registro.html", map[string]string{
            "Erro": "Email já cadastrado",
        })
        return
    }

    usuarios[email] = models.Usuario{
        ID:       len(usuarios) + 1,
        Nome:     nome,
        Email:    email,
        Senha:    senha,
        CriadoEm: time.Now(),
    }

    http.Redirect(w, r, "/login", http.StatusSeeOther)
}

func Dashboard(w http.ResponseWriter, r *http.Request) {
    // Verificar se usuário está logado
    cookie, err := r.Cookie("session")
    if err != nil || sessoes[cookie.Value] == "" {
        http.Redirect(w, r, "/login", http.StatusSeeOther)
        return
    }

    email := sessoes[cookie.Value]
    usuario := usuarios[email]

    temp.ExecuteTemplate(w, "dashboard.html", usuario)
}

func Logout(w http.ResponseWriter, r *http.Request) {
    cookie, err := r.Cookie("session")
    if err == nil {
        delete(sessoes, cookie.Value)
    }

    http.SetCookie(w, &http.Cookie{
        Name:    "session",
        Value:   "",
        Expires: time.Now(),
    })

    http.Redirect(w, r, "/", http.StatusSeeOther)
}

func gerarSessionID() string {
    return fmt.Sprintf("%d", time.Now().UnixNano())
}