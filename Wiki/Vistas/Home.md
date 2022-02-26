- [Vistas](#vistas)
    - [**Modelo de Domínio**](../ModeloDominio/Home.md)
    - **Nível 1**
        - [**Diagrama de cenários**](../Cenarios/Home.md)
        - [Vista Lógica](../Nível%201/VL.md)
        - **Vista de Processos**
             - [UC3](../Nível%201/Docs/UC3/UC3_N1.jpg)
             - [UC5](../Nível%201/Docs/UC5/Home.md)
             - [UC6](../Nível%201/Docs/UC6/Home.md)
             - [UC7](../Nível%201/Docs/UC7/Home.md)
             - [UC8](../Nível%201/Docs/UC8/Home.md)
             - [UC9](../Nível%201/Docs/UC9/Home.md)
             - [UC10](../Nível%201/Docs/UC10/Home.md)
             - [UC11](../Nível%201/Docs/UC11/Home.md)
             - [UC12](../Nível%201/Docs/UC12/Home.md)
             - [UC13](../Nível%201/Docs/UC13/Home.md)
             - [UC14](../Nível%201/Docs/UC14/Home.md)
             - [UC16](../Nível%201/Docs/UC16/Home.md)
             - [UC20](../Nível%201/Docs/UC20/Home.md)
             - [UC22a](../Nível%201/Docs/UC22a/Home.md)
             - [UC22b](../Nível%201/Docs/UC22b/Home.md)
             - [UC27](../Nível%201/Docs/UC27/Home.md)
             - [UC33](../Nível%201/Docs/UC33/Home.md)
             - [UC35](../Nível%201/Docs/UC35/Home.md)
    - **Nível 2**
        - [Vista Lógica](../Nível%202/VL.md)
        - [Vista de Implementação](../Nível%202/VI.md)
        - [Vista Física](../Nível%202/VF.md)
        - **Vista de Processos**
             - [UC3](../Nível%202/Docs/UC3/Home.md)
             - [UC5](../Nível%202/Docs/UC5/Home.md)
             - [UC6](../Nível%202/Docs/UC6/Home.md)
             - [UC7](../Nível%202/Docs/UC7/Home.md)
             - [UC8](../Nível%202/Docs/UC8/Home.md)
             - [UC9](../Nível%202/Docs/UC9/Home.md)
             - [UC10](../Nível%202/Docs/UC10/Home.md)
             - [UC11](../Nível%202/Docs/UC11/Home.md)
             - [UC12](../Nível%202/Docs/U12/Home.md)
             - [UC13](../Nível%202/Docs/UC13/Home.md)
             - [UC14](../Nível%202/Docs/UC14/Home.md)  
             - [UC16](../Nível%202/Docs/UC16/Home.md)
             - [UC20](../Nível%202/Docs/UC20/Home.md)
             - [UC22a](../Nível%202/Docs/UC22a/Home.md)
             - [UC22b](../Nível%202/Docs/UC22b/Home.md)
             - [UC27](../Nível%202/Docs/UC27/Home.md)
             - [UC33](../Nível%202/Docs/UC33/Home.md)
             - [UC35](../Nível%202/Docs/UC35/Home.md)
    - **Nível 3**
        - [Vista Lógica](../Nível%203/VL.md)
        - [Vista Lógica alternativa arquitetura em camadas](../Nível%203/VL_Alternativa_Camada/Home.md)
        - [Vista lógica alternativa resumida arquitetura em cebola](../Nível%203/VL_Alternativa_Resumida_Cebola/Home.md) 
        - [Vista de Implementação](../Nível%203/VI.md)
        - **Vista de Processos**
            - [UC3](../Nível%203/Docs/UC3/Home.md)
            - [UC5](../Nível%203/Docs/UC5/Home.md)
            - [UC6](../Nível%203/Docs/UC6/Home.md)
            - [UC7](../Nível%203/Docs/UC7/Home.md)
            - [UC8](../Nível%203/Docs/UC8/Home.md)
            - [UC9](../Nível%203/Docs/UC9/Home.md)
            - [UC10](../Nível%203/Docs/UC10/Home.md)
            - [UC11](../Nível%203/Docs/UC11/Home.md)
            - [UC12](../Nível%203/Docs/U12/Home.md)
            - [UC13](../Nível%203/Docs/UC13/Home.md)
            - [UC14](../Nível%203/Docs/UC14/Home.md)
            - [UC16](../Nível%203/Docs/UC16/Home.md)
            - [UC20](../Nível%203/Docs/UC20/Home.md)
            - [UC22a](../Nível%203/Docs/UC22a/Home.md)
            - [UC22b](../Nível%203/Docs/UC22b/Home.md)
            - [UC27](../Nível%203/Docs/UC27/Home.md)
            - [UC33](../Nível%203/Docs/UC33/Home.md)
            - [UC35](../Nível%203/Docs/UC35/Home.md)

--------------------------------------------------------




# Vistas
Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [Krutchen-1995]() propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

* Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
* Vista de processos: relativa ao fluxo de processos ou interações no sistema;
* Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
* Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
* Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [Brown-2020]() [C4-2020]() defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade. Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma: - Nível 1: Descrição (enquadramento) do sistema como um todo; - Nível 2: Descrição de contentores do sistema; - Nível 3: Descrição de componentes dos contentores; - Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [UML-2020]() [UMLDiagrams-2020]().