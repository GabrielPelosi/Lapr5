



no(1,ana,[natureza,pintura,musica,sw,porto]).
%===primeira==camada
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
%===segunda===camada
no(23,joao,[natureza]).
no(24,bernardo,[natureza,cinema,pizza]).
%===terceira===camada
no(31,ricardo,[natureza]).
no(32,manuel,[natureza,cinema,pizza]).
%========
no(200,sara,[natureza,moda,musica,sw,coimbra]).



ligacao(1,11,6,9).
ligacao(1,12,3,6).

ligacao(11,23,5,6).
ligacao(11,24,5,6).

ligacao(12,23,6,9).
ligacao(12,24,4,1).

ligacao(23,31,6,2).
ligacao(23,32,3,6).

ligacao(24,31,6,7).
ligacao(24,32,5,6).


ligacao(31,200,66,88).
ligacao(32,200,6,9).

