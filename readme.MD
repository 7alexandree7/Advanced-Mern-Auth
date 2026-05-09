*** Resumo Inicial ***

1 - Instalar as dependencias

2 - Iniciar o servidor no index.js com uma função assíncrona

3 - Criar uma pasta db/connectDB.js para realizar a conexão com o mongoose e importar dentro da função assíncrona no index.js

4 - Inicializar as rotas seguindo um padrão específico
  - Criar a pasta routes
  - Criar uma pasta para agrupar as rotas daquele módulo
  - Utilizar nomenclatura ex: auth.routes.js
  - Criar um index.js dentro de routes responsável por importar todas as rotas e definir um endpoint base
  - Importar todas as rotas agrupadas no index.js principal do projeto

5 - Controllers são responsáveis pelas funções de cada rota
  - Criar a pasta controllers
  - Criar um arquivo para cada controller seguindo a nomenclatura ex: auth.controller.js
  - Importar as funções nas rotas

6 - Models são responsáveis por definir a estrutura e regras dos dados no banco utilizando mongoose.Schema
  - Criar a pasta models
  - Criar um arquivo para cada model seguindo a nomenclatura ex: user.model.js
  - Definir campos, tipos, validações e valores padrões do schema
  - Exportar o model para ser utilizado nas controllers e services