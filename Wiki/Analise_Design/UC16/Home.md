
## Analise & Design - MDRS

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

### Requisitos Funcionais

#### Tipo de requisição
* Http GET

#### Dados a serem enviados
 * Ido do jogador autenticado

#### Dados a serem recebidos

* Dto com o nome do jogador e o valor da sua fortaleza de rede.

#### Endereço de endpoint
* /api/Jogadores/fortaleza/{id}
    - sendo esse id dinâmico enviado através de request params.
    - a resposta devera ser um dto com o somatório das forças de ligação.
    
* Para ambiente dev, usa-se esses dois urls
    - https://localhost:5000/api/Jogadores/fortaleza/{id}
    - http://localhost:5001/api/Jogadores/fortaleza/{id}
    
* Para ambiente Deployed
    - https://lapr5-g26.herokuapp.com/api/Jogadores/{id}


### Conceitos de Implementação
| O quê                  | Ação                                                         | Onde         | Método                                                       |  
| ---------------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |  
| JogadorController |utiliza a camada service para buscar a fortaleza| controllers | getFortalezaByJogador(Guid id)|  
| JogadorService| utiliza a camada repo para buscar a fortaleza | domain | getFortalezaByJogador(Guid id)|  
| JogadorService| faz o somatório das forças de sua ligação|domain | getFortalezaByJogador(Guid id)|  
| JogadorRepository| busca o jogador autenticado pelo id recebido no request| infrastructure| getByIdAsync(Guid id) |  
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
| ConsultarFortalezaView.js| - | - | - |  
| ConsultarFortalezaController.js| - | - | - |  
| ConsultarFortalezaViewModel.js| - | - | - |  
| ConsultarFortalezaModel.js| - | - | - |  
| ConsultarFortalezaMapper.js| - | - | - |  
| ConsultarFortalezaService.js| - | - | - |  


