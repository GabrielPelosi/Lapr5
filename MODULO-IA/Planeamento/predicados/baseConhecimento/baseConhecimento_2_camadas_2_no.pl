


no(1,ana,[natureza,pintura,musica,sw,porto]).
%===primeira==camada
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
%===segunda===camada
no(23,joao,[natureza]).
no(24,bernardo,[natureza,cinema,pizza]).
%========
no(200,sara,[natureza,moda,musica,sw,coimbra]).



ligacao(1,11,6,9).
ligacao(1,12,3,4).

ligacao(11,23,7,8).
ligacao(11,24,9,8).

ligacao(12,23,8,3).
ligacao(12,24,5,6).

ligacao(23,200,6,9).
ligacao(24,200,66,98).
























