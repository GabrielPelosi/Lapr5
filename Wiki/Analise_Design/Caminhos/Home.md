
## Analise & Design - Planeamento, Visualização, MDRS

### Formato Breve
Como Jogador/Utilizador autenticado, eu pretendo visualiar de forma diferenciada os caminhos entre os jogadores


### Pré-condições
O jogador deve estar autenticado no sistema.

### Pós-condições
n/a

### Cenário de sucesso principal (ou fluxo básico)
O jogador inicia o processo de consulta deos caminhos.
O sistema rendirza em formato 3D o caminho até um dado utilizador.

## Design

### Requisitos Funcionais

#### Tipo de requisição de SPA para Planeamento
* Http GET

#### Dados a serem enviados
* Query Strings na URL com origem=Nome do jogador de Origem
* Query String na URL com destino=Nome do jogador destino

* Em caso de ativar estados de humor, enviar na queri string:
    * estado=Valor em string do estado
    * valor= Valor numérico do estado

#### Dados a serem recebidos

* Texto separao por |. com origem,destino e o caminho.

#### Endereço de endpoint
* /caminho-forte-dfs-estados?origem={origem}&destino={destino}&estado={estado}&valor={valor}
* /caminho-forte-best-estados?origem={origem}&destino={destino}&estado={estado}&valor={valor}
* /caminho-forte-a-star-estados?origem={origem}&destino={destino}&estado={estado}&valor={valor}
* /caminho-forte-dfs?origem={origem}&destino={destino}
* /caminho-forte-best?origem={origem}&destino={destino}
* /caminho-forte-s-star?origem={origem}&destino={destino}
* /caminho-curto?origem={origem}&destino={destino}
* /caminho-seguro?origem={origem}&destino={destino}



#### Tipo de requisição do Planeamento para MDRS
* Http GET

#### Dados a serem enviados
n/a

#### Dados a serem recebidos

* JSON com todos os dados dos jogadores e ligações
* Devem ser tratados somente id,nome,estado de humo,valor do estado e tags dos jogadores
* Das Ligações devems ser tratadas os nomes que são ligados e força de ligação

#### Endereço de endpoint

* /api/Jogadores
* /api/Ligacao