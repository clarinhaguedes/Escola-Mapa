# Copilot Instructions for Escola-Mapa

## Visão Geral
Este projeto é uma aplicação web em Go para visualização de mapas escolares. A estrutura principal está dividida em três componentes:
- `main.go`: Ponto de entrada, inicializa o servidor e integra os módulos.
- `controle/`: Lógica de controle, manipula dados e regras de negócio.
- `rotas/`: Define as rotas HTTP e integra templates.
- `templates/`: Contém arquivos HTML para renderização das páginas.
- `static/`: Recursos estáticos (CSS, JS).

## Fluxo de Dados
- O servidor Go serve páginas HTML via rotas definidas em `rotas/rotas.go`.
- O controle de dados e lógica está em `controle/controle.go`.
- Os arquivos estáticos são servidos diretamente para o frontend.

## Convenções Específicas
- Templates HTML ficam em `templates/` e são renderizados via rotas.
- CSS e JS ficam em `static/css/` e `static/js/`.
- Funções de controle devem ser chamadas pelas rotas, não diretamente pelo main.
- Estrutura modular: cada pasta tem responsabilidade clara.

## Build e Execução
- Para rodar o projeto: `go run main.go`
- Não há scripts customizados de build/test.
- O projeto não utiliza frameworks externos além da biblioteca padrão do Go.

## Exemplos de Padrões
- Rotas são registradas em `rotas/rotas.go` usando funções do pacote `net/http`.
- O controle de dados é feito em funções separadas em `controle/controle.go`.
- O HTML é renderizado usando `html/template`.

## Integrações
- Não há dependências externas além do Go padrão (verifique `go.mod`).
- Comunicação entre módulos é feita por chamadas diretas de função.

## Recomendações para Agentes
- Mantenha a separação entre controle, rotas e templates.
- Ao adicionar novas páginas, crie o HTML em `templates/` e registre a rota em `rotas/rotas.go`.
- Para lógica de negócio, adicione funções em `controle/controle.go`.
- Siga o padrão de modularização para facilitar manutenção.

## Arquivos-Chave
- `main.go`: inicialização do servidor
- `controle/controle.go`: lógica de negócio
- `rotas/rotas.go`: definição de rotas
- `templates/Index.html`: template principal
- `static/css/style.css` e `static/js/scripts.js`: recursos estáticos

---
Se alguma seção estiver incompleta ou pouco clara, forneça feedback para ajustes.
