# Análise


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



# Design

### Requisitos Funcionais

#### Tipo de requisição
* Http GET

#### Dados a serem enviados
* Enviados através de query strings, o nó de orgiem e o nó de destino devem
ser anviados

#### Dados a serem recebidos

* Resposta em formato de texto com a lista com caminho mais forte, custo do caminho, origem e destino.

### Endereço de endpoint

##### Caminho mais forte para Best First

* /caminho-forte?origem={nome}&destino={nome}
    - sendo os nomes os nomes registados pelo utlizador.
    - a resposta devera ser em texto com o caminho, o custo, a origem e o destino.

* Para ambiente dev, usa-se esses dois urls
    - http://localhost:8001/caminho-forte?origem={nome}&destino={nome}

* Para ambiente Deployed
    - https://lapr5-g26-IA.herokuapp.com/caminho-forte?origem={nome}&destino={nome}

##### Caminho mais forte para A-Star

* /caminho-forte-s-star?origem={nome}&destino={nome}
    - sendo os nomes os nomes registados pelo utlizador.
    - a resposta devera ser em texto com o caminho, o custo, a origem e o destino.

* Para ambiente dev, usa-se esses dois urls
    - http://localhost:8001/caminho-forte-a-star?origem={nome}&destino={nome}

* Para ambiente Deployed
    - https://lapr5-g26-IA.herokuapp.com/caminho-forte-a-star?origem={nome}&destino={nome}



##### Caminho mais forte para DFS


* /caminho-forte-dfs?origem={nome}&destino={nome}
    - sendo os nomes os nomes registados pelo utlizador.
    - a resposta devera ser em texto com o caminho, o custo, a origem e o destino.

* Para ambiente dev, usa-se esses dois urls
    - http://localhost:8001/caminho-forte-dfs?origem={nome}&destino={nome}

* Para ambiente Deployed
    - https://lapr5-g26-IA.herokuapp.com/caminho-forte-dfs?origem={nome}&destino={nome}



### Conceitos de Implementação
| O quê                  | Ação                                                         | Onde         | Método                                                       |  
| ---------------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |  
| server.pl | ficheiro pl que implementa a estrutura da api e a integração com MDRS| planeamento | |  
| bestFirst.pl | ficheiro que implementa a solução do caminho mais forte Best First | caminhosFortes | bestfs1(O,D,Cam,Custo)|  
| aStar.pl | ficheiro que implementa a solução do caminho mais forte A star | caminhosFortes | aStar1(O,D,Cam,Custo)|  
| primeiroProfundidade.pl | ficheiro que implementa a solução do caminho mais forte DFS | caminhosFortes | plan_min_lig(O,D,Cam,Custo)|  
| carregadorBC.pl | predicados que carregam a base de conhecimento integrada com MDRS | integracao | carregaBC(), LimparBC()|  



### Design para SPA_Planeamento

#### Visualização

* A Vizualização do caminho será renderizada no caminho 3D

* Os dados a renderizar é a Lista com o caminho até o destino em nós 3D.

### Conceitos de Implementação
| O quê                  | Ação                                                         | Onde         | Método                                                       |  
| ---------------------- | ------------------------------------------------------------ | ------------ | ------------------------------------------------------------ |  
| Visualizar3D | Classe que renderiza os nós do caminho| componentes | React.useEffect()|  
| No | Classe que cria os modelos dos nós | componentes | React.useEffect()|  
| Edge | Classe que cria os modelos dos edges | componentes | React.useEffect()|  

