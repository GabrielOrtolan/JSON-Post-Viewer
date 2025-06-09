# JSON Post Viewer

Aplicação em React desenvolvida como parte de uma avaliação técnica. O objetivo é consumir a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para listar e exibir detalhes de posts.

## Funcionalidades

- **Listagem de Posts:** A página principal exibe uma lista paginada com todos os posts da API.
- **Detalhes do Post:** Ao clicar em um post, uma nova aba é aberta mostrando o conteúdo completo do post e informações sobre o autor.
- **Busca de Autor:** A página de detalhes realiza uma segunda chamada à API para buscar e exibir os dados do autor correspondente.
- **Paginação:** A lista de posts é dividida em páginas para uma melhor experiência de usuário.

## Tecnologias Utilizadas

- **React.js:** Biblioteca principal para a construção da interface.
- **Vite:** Ferramenta de build e servidor de desenvolvimento.
- **React Router DOM:** Para o gerenciamento de rotas.
- **Material-UI (MUI):** Para os componentes de interface e estilização.
- **Axios:** Para realizar as chamadas à API.

## Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone [https://github.com/GabrielOrtolan/prova.git](https://github.com/GabrielOrtolan/prova.git)

# 2. Acesse a pasta do projeto
cd prova

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev