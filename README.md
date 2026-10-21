# 📚 Biblioteca Web

Sistema web completo e responsivo para gerenciamento de acervo de livros e usuários de uma biblioteca, desenvolvido com HTML5, CSS3 e JavaScript ES6+.

---

## 📸 Sobre o Projeto

O **Biblioteca Web** é uma aplicação voltada para a gestão simplificada de bibliotecas. Permite realizar login de administradores, cadastrar e listar livros, além de gerenciar os usuários cadastrados e visualizar estatísticas do sistema.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação de Usuários:** Login seguro com controle de acesso e sessão.
- 📊 **Dashboard:** Indicadores e dados consolidados sobre livros e leitores.
- 📚 **Gestão de Livros:** Cadastro completo e listagem interativa de acervo.
- 👤 **Gestão de Usuários:** Cadastro e controle de leitores e operadores.
- 💾 **Persistência Local:** Armazenamento de dados no navegador (`LocalStorage`).

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3, JavaScript (ES6+ Modules)
- **Gerenciador de Pacotes / Servidor:** Node.js, npm, `live-server`

---

## 📁 Estrutura de Pastas do Projeto

```text
biblioteca-web/
│
├── login/
│   ├── login.html
│   ├── login.js
│   └── login.css
│
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.js
│   └── dashboard.css
│
├── cadastro-usuario/
│   ├── cadastro-usuario.html
│   ├── cadastro-usuario.js
│   └── cadastro-usuario.css
│
├── cadastro-livro/
│   ├── cadastro-livro.html
│   ├── cadastro-livro.js
│   └── cadastro-livro.css
│
├── listagem-livro/
│   ├── listagem-livro.html
│   ├── listagem-livro.js
│   └── listagem-livro.css
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── estatisticas.js
│   ├── usuarios.js
│   ├── livros.js
│   ├── Usuario.js
│   └── Livro.js
│
├── dados/
│   ├── usuarios-sistema.js
│   ├── livros-cadastrados.js
│   └── usuarios-cadastrados.js
│
├── assets/
│   ├── images/
│   └── icons/
│ 
├── index.html
├── README.md
└── package.json

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão 14 ou superior)

### ⚙️ Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/rodrigo-gr-pereira/bibliotecaWeb]([https://github.com/rodrigo-gr-pereira/bibliotecaWeb.git)

