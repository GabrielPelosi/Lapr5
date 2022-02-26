
## Analise

Para aumentar o realismo do vizualização em 3D, será implementado
um sistema de moviemntos do jogador em primeira pessoa.

* Comandos:
    - w -> avançar
    - s -> recuar
    - a -> andar para esquerda
    - d -> andar para direita
    - mover rato para esquerda -> olhar para esquerda
    - mover rato para direita -> olhar para direita
    

## Design

* Será usado uma biblioteca FirstPersonControl, que está dentro do three js
  para habilitar os comandos em primeira pessoa.

* A biblioteca FirstPersonControl não integra com a OrbitControls pois
  utilizam a mesma camera com os memsmo listeners. Dado esse problema
  deverá ser implementado um botão para realizar a troca de tipo de visualização.

* Um botão para Orbit e um botão para Primeira pessoa.