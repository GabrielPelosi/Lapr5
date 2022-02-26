
## Analise & Design - MDRS

### Formato Breve
Como Jogador/Utilizador autenticado, 
eu pretendo realizar a consulta da Leader-Board de fortaleza de rede.

### Pré-condições
O jogador deve estar autenticado no sistema.

### Pós-condições
n/a

### Cenário de sucesso principal (ou fluxo básico)
O jogador inicia o processo de consulta da Leader-Board fortaleza de rede.
O sistema informa ao Jogador a Leader-Board

## Design

### Requisitos Funcionais

#### Tipo de requisição
* Http GET

#### Dados a serem enviados
n\a

#### Dados a serem recebidos

* Dto com uma lista ordenada de forma descendente pelo número da fortaleza de todos
os jogadores registados

#### Endereço de endpoint
* /api/Jogadores/leader-board/fortaleza/
    - sendo esse id dinâmico enviado através de request params.
    - a resposta devera ser um dto com o somatório das forças de ligação.

* Para ambiente dev, usa-se esses dois urls
    - https://localhost:5000/api/Jogadores/leader-board/fortaleza/
    - http://localhost:5001/api/Jogadores/leader-board/fortaleza/

* Para ambiente Deployed
    - https://lapr5-g26.herokuapp.com/api/Jogadores/leader-board/fortaleza/


### Conceitos de Implementação
| O quê                  | Ação                                                         | Onde         | Método                                                       |  
| ---------------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |  
| JogadorController |utiliza a camada service para buscar o leader borad fortaleza| controllers | getFortalezaLeaderBoard()|  
| JogadorService| utiliza a camada repo para buscar a fortaleza | domain | getFortalezaLeaderBoard()|  
| JogadorService| faz o somatório das forças de sua ligação|domain | getFortalezaLeaderBoard()|  
| JogadorRepository| busca o jogador autenticado pelo id recebido no request| infrastructure| getAllAsync() |  
| Jogador| instancia o jogador autenticado| domain| - |  
| FortalezaDto| representa o pacote http de resposta com a fortaleza do jogador | domain| - |  



## Analise & Design - SPA_MDRS

### Formato Breve
Como Jogador/Utilizador autenticado, eu pretendo realizar a consulta da minha fortaleza de rede.

### Pré-condições
O jogador deve estar autenticado no sistema.

### Pós-condições
n/a

### Cenário de sucesso principal (ou fluxo básico)
O jogador inicia o processo de consulta de fortaleza de rede.
O sistema informa ao Jogador a sua fortaleza.

## Design

### Conceitos de Implementação
| O quê                  | Ação                                                         | Onde         | Método                                                       |  
| ---------------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |  
| App.js | -| - | -|  
| ConsultarLeaderBoardFortalezaView.js| apresenta a view | leaderBoard | - |  
| ConsultarLeaderBoardFortalezaController.js| realiza a conexão com o mdrs | leaderBoard | - |  
| ConsultarLeaderBoardFortalezaViewModel.js| conhece as regras de negocio para gerencias a estado do leader board | leaderBoard | - |  
| ConsultarLeaderBoardFortalezaModel.js| model do leader board | leaderBoard | - |  
| ConsultarLeaderBoardFortalezaMapper.js| convertor de objectos para respostas e dtos | leaderBoard | - |  
| ConsultarLeaderBoardFortalezaService.js| classe externa para realizar requisoções ao mdrs | Service | - |  


