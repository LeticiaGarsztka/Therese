# Thérèse Objetos Litúrgicos 🌹
Baseado na proposta de um Projeto React, criei uma loja de objetos litúrgicos que realiza o CRUD dos objetos, através da página `DataList`, uma `Modal`, que permite a visualização maior da imagem e de mais 2 dados, que não aparecem quando os dados são listados. Além disso, também é possível visualizar as informações da desenvolvedora, na página `About` (primeira a ser exibida).

<br>

# Compreendendo como Rodar o Código 🌹

- Copie a URL do meu repositório em HTTPS.
- Deixe o `browser` de sua preferência aberto.
- No Visual Studio Code, clone meu repositório, com: `git clone ` + a URL do meu repositório.
- Salve o meu projeto na pasta desejada.
- Abra a pasta em que você realizou o download do meu projeto.
- Entre na pasta `banco` e abra o `script.bd` para alterar as senha do banco de dados.
- Abra 2 terminais `cmd`, um para o frontend e outro para o backend.
    - Para backend, faça: `cd backend/api`.
    - Para frontend, faça: `cd frontend`.
- Em ambos os terminais, dê o comando `npm i` para instalar as dependências.
- Assim que terminar a instalação, dê o comando `npm start`.
- Volte no `browser` por você escolhido e a aplicação estará aberta.

<br>

# Informações Sobre o Código 🌹

- Aplicação WEB que utiliza: 
    - `React` no Frontend com CSS desenvolvido à mão, isto é, sem a utilização de bibliotecas de estilização. 
        - Possui 3 telas principais: Listagem dos Dados e CRUD, a visualização detalhada de um item, bem como nome e informações sobre a desenvolvedora.
        - Comunicação com a API utilizando o `Fetch API`.
        - Realiza o tratamento de erros e exibe mensagens para o usuário.
    - `Node.js`com `Express` no Backend.
        - Implementação de um servidor utilizando o Express.
        - Utilização de endpoints `RESTful` para as operações de `CRUD`.
        - Implementação do `CORS` para permitir as requisições do Frontend.
        - Implementações de validações nos dados recebidos.
    
    
    - `MySQL` como Banco de Dados
        - Utiliza 6 campos relevantes, sendo eles: id, nome, descrição, preço, quantidade e foto (autoral) do produto.
        - Configuração de conexões e consultas por `query`.
