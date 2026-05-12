# `Resumo Inicial`

- 1  Instalar as dependencias
- 2  Iniciar o servidor no index.js com uma função assíncrona
- 3  Criar uma pasta db/connectDB.js para realizar a conexão com o mongoose e importar dentro da função assíncrona no index.js
- 4  Inicializar as rotas seguindo um padrão específico
  - Criar a pasta routes
  - Criar uma pasta para agrupar as rotas daquele módulo
  - Utilizar nomenclatura ex: auth.routes.js
  - Criar um index.js dentro de routes responsável por importar todas as rotas e definir um endpoint base
  - Importar todas as rotas agrupadas no index.js principal do projeto
- 5  Controllers são responsáveis pelas funções de cada rota
  - Criar a pasta controllers
  - Criar um arquivo para cada controller seguindo a nomenclatura ex: auth.controller.js
  - Importar as funções nas rotas
- 6  Models são responsáveis por definir a estrutura e regras dos dados no banco utilizando mongoose.Schema
  - Criar a pasta models
  - Criar um arquivo para cada model seguindo a nomenclatura ex: user.model.js
  - Definir campos, tipos, validações e valores padrões do schema
  - Exportar o model para ser utilizado nas controllers e services
  
-------------------------------------------------------------------------------------------------


# `Preparativos importantes para a criação de um usuario`

- 1  Receber as informações que vem do body da requisição
- 2  Fazer a validação dos dados
- 3  Conferir se esse usuario que esta tentando se cadastrar ja possui um email ativo = (usuario existente)
- 4  Criptografar a senha do usuario para não salvar ela de forma crua no banco de dados da aplicação / sempre quando for criar o user passar a senha com o hash
- 5  Com todas as informações em mãos criar um novo usuario no nosso banco de dados
- 6  `verificationToken` O back end gera um codigo de 6 digitos para o usuario fazer sua auth no seu email
- 7  utilizar o `await user.save()` para que todas nossas alterações sejam salvas no nosso banco MondoDB

-------------------------------------------------------------------------------------------------


# `JWT & COOKIES`

- 1  Criar no .env um JWT_SECRET
- 2  Dentro de utils criar uma função `generatetokenAndSetCookie`
- 3  Utilizar o método signin, passando o userId, o JWT_SECRETS e o expires_in
- 4  na resposta do back-end pro font ele vai salvar nos cookies do navegador uma chave chamada "token" com o valor token
- 5  Utilizando esses parametros para aumentar a segurança
```` 
    httpOnly: true,
    secure: ENV_VARIABLES.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
````

-------------------------------------------------------------------------------------------------


# `Envio de Emails`

- 1 Lib MailTrap
  - Mailtrap: Plataforma de Entrega de Emails.
  - Criar uma pasta mail
    - email.js - `Responsável por enviar os emails utilizando o Mailtrap.`
    - emailTemplate.js - `Armazena os templates HTML dos emails da aplicação (verificação, reset de senha, etc).`
    - mailtrap.config.js - `Configura a conexão com o Mailtrap e define o remetente padrão dos emails.`
- 2 Importa o código base gerado pela documentação do site
- No arqui email.js

-------------------------------------------------------------------------------------------------

# `Verify Email`

- 1 - Criar uma rota post verify-email
- 2 - Criar um controller para a rota `verifyEmail`
- 3 - Recebe o code de 6 digitos digitados pelo usuario no front
- 4 - Procura um usuário com esse código no banco.
- 5 - Verifica se o código ainda não expirou.
- 6 - Marca o email como verificado.
- 7 - Remove o código de verificação do banco
- 8 - Envia email de boas-vindas. Pela função `await sendWelcomeEmail(user.email, user.name)` passando o email e o name para o template
```
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [ { email } ];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "abeaf537-58da-464c-9655-bb6f68e7c63c",
            template_variables: {
                name: name,
                "company_info_name": "Auth Company",
            }

        })
    } catch (error) {
        
    }
}
```