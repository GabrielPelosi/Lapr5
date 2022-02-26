
:-consult('/integracaoMDRS').

bestfs1(Orig,Dest,Cam,Custo):-
	get_time(Ti),
	bestfs12(Dest,[[Orig]],Cam,Custo),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	write('Caminho='),write(Cam),nl.

bestfs12(Dest,[[Dest|T]|_],Cam,Custo):-
	reverse([Dest|T],Cam),
	calcula_custo(Cam,Custo).

bestfs12(Dest,[[Dest|_]|LLA2],Cam,Custo):-
	!,
	bestfs12(Dest,LLA2,Cam,Custo).


bestfs12(Dest,LLA,Cam,Custo):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12(Dest,[LA|LLA1],Cam,Custo))
	 ;
	 (
	  findall((R,[X|LA]),(ligacao(Act,X,CX),
			       calcula_custo_multi(CX,0,R),
	  \+member(X,LA)),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12(Dest,LLA2,Cam,Custo)
	 )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C):-!,ligacao(Act,X,C).
calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1),
					ligacao(Act,X,C),S is S1+C.


calcula_custo_multi(CustoX,CustoY,R):-  R is (CustoX * 0.3) + (CustoY*0.7).


