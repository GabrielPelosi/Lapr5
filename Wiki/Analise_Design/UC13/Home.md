
## Analise

### Formato Breve
Como Jogador/Utilizador autenticado, eu pretendo realizar publicações.

Características/Regras de negócio de Publicações:
* Id - Gerado na api.
* Conteúdo - Texto corrido.
* Comentários - Lista de objetos comentários (Um texto corrido, tags e uma reação, mais info na análise da uc criar comentário).
* Autor - Id referente ao utilizador que criou a publicação (Id esse que identifica um jogador na API MDRS (master data rede social)).
* Tags - Lista de palavras chaves que apontam o assunto da publicação.

### Pré-condições
O jogador deve estar autenticado no sistema.

### Pós-condições
A publicação deve ser persistida e no sistema.


### Cenário de sucesso principal (ou fluxo básico)
O jogador inicia o processo de criar uma publicação.
O sistema valida e regista a publicação e informa o Jogador do sucesso da operação.

## Design

### Requisitos Funcionais

* O Serviço que implementara esse Caso de uso é o Master data posts e comentários (MDP ou MDPC).

#### Endereço de endpoint
* /api/Posts
    - esse end-point recebe um requestBody com os seguintes dados.
        - Id do autor com o seguinte formato (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, sendo aceito apenas caracteres hexadecimais, obrigatório).
        - Conteúdo da publicação(String com até 255 caracteres, obrigatório).
        - Conjunto de tags(Lista de palavras únicas, opcional).
    - Método http utilizado será o POST.
    - a resposta ao pedido deverá ser um dto com os dados da postagem criada com o seu id gerado na base de dados.
        - Id da publicação.
        - Id do autor.
        - Conteúdo.
        - Tags.

* Para ambiente dev, deve usar esse URL.
    - http://localhost:8100/api/Posts

* Para ambiente Deployed.
    - https://lapr5-g26-mdp.herokuapp.com/api/Posts
    

### Conceitos de Implementação
| O quê                  | Ação                                                         | Onde         | Método                                                       |  
| ---------------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |  
| PostRoutes | apresenta o endpoint para criar uma nova publicação| api.routes | app.post()|  
| PostController| espoleta execução da camada service para criar uma nova publicação | controllers | createPost(createPostDto) |  
| PostService| implementa a "Appliction Rule" do caso de uso criar publicação| services | createPost(createPostDto) |
| PostMap| realiza a conversão de objetos dto para domain e domain para dto| mappers| toDomain(createPostDto) |  
| PostRepo| executa chamadas na base de dados para persistir a nova publicação  | repos| save(Post) |  
| Post| Implementa as regras de negócio da publicação | domain| Post() |  
| PostCreateRequestDto| representa os dados do corpo da requisição vindo do SPA| dto.posts| PostCreateRequestDto() |  
| PostCreateResponseDto|  representa os dados no corpo da resposta à requisição do SPA | sto.posts| PostCreateResponseDto() |  


