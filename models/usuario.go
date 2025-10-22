package models

import "time"

type Usuario struct {
    ID        int       `json:"id"`
    Nome      string    `json:"nome"`
    Email     string    `json:"email"`
    Senha     string    `json:"senha"`
    CriadoEm  time.Time `json:"criado_em"`
}