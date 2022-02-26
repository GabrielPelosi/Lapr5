
## Analise

Será implementado na vizualização 3D comandos do tipo orbit para melhor
manipulação da visão.

* Comando:
    - botão esquerdo do rato –> orbit
    - botão direito do rato -> pan
    - scroll para frente -> zoom para frente
    - scroll para atrás -> zoom para atrás

## Design

* Será usado uma biblioteca OrbitControls, que está dentro do three js
  para habilitar os comandos orbit,pan e zoom.

* A biblioteca OrbitControls  não integra com a FirstPersonControl pois
  utilizam a mesma camera com os memsmo listeners. Dado esse problema
  deverá ser implementado um botão para realizar a troca de tipo de visualização.

* Um botão para Orbit e um botão para Primeira pessoa.