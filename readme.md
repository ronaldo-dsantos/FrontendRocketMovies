# Frontend RocketMovies

RocketMovies é uma aplicação web responsiva desenvolvida em React para gerenciar e avaliar filmes. Os usuários podem criar contas, fazer login, adicionar avaliações e gerenciar informações sobre seus filmes favoritos.

## 📈 Funcionalidades

- **Cadastro e Login:** 
    - Registro de usuários e autenticação segura via JWT.
- **Gerenciamento de Filmes:**
    - Adicionar novos filmes
    - Editar detalhes e avaliações
    - Excluir filmes
    - Listagem de filmes cadastrados
- **Perfis de Usuário:**
    - Atualização de informações
    - Upload de avatar

## 👨‍💻 Tecnologias Utilizadas

- React.js (Vite)
- React Router DOM (para navegação)
- Styled Components (para estilização)
- Axios (para comunicação com a API)
- Context API (para gerenciamento de autenticação)
- Local Storage (para armazenamento de sessão)

## 🚀 Instalação e Configuração

1. **Clonar o Repositório**

        ```bash
        git clone https://github.com/ronaldo-dsantos/FrontendRocketMovies.git
        cd FrontendRocketMovies
        ```

2. **Instalar Dependências**

        ```bash
        npm install
        ```

3. **Executar o Projeto**

        ```bash
        npm run dev
        ```

        A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

## 🔒 Autenticação

A autenticação é baseada em JWT, e o token é armazenado no Local Storage. As requisições autenticadas devem incluir o cabeçalho:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

## 📚 Estrutura do Projeto

- `src/components`: Componentes reutilizáveis (botões, inputs, etc.)
- `src/pages`: Páginas principais da aplicação
- `src/services`: Configuração do Axios para chamadas à API
- `src/context`: Contexto global para autenticação
- `src/styles`: Estilização global com Styled Components

## 🏆 Licença

Este projeto está licenciado sob a MIT License.

## 💙 Desenvolvido por Ronaldo Domingues.