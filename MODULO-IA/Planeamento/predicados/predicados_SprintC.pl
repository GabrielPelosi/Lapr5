

:- dynamic node_din/3.
:- dynamic edge_din/4.

:-dynamic melhor_sol_minlig/2.
:- dynamic conta_sol/1.
:- dynamic maior_forca/1.
:- dynamic contAstar/1.
:- dynamic contBest/1.


node(a,0,195).
node(b,1,175).
node(c,1,135).
node(d,1,100).
node(e,1,105).
node(f,2,110).
node(g,2,95).
node(h,2,85).
node(i,2,70).
node(j,3,60).
node(l,3,50).
node(m,3,55).
node(n,3,45).
node(o,4,40).
node(p,4,25).
node(q,4,15).
node(r,4,10).
node(s,6,5).
node(t,6,0).
node(u,6,9).
node(v,7,10).
node(x,7,5).
node(z,8,8).

node(falha,9,60).


edge1(a,b,45,30).
edge1(a,c,32,54).
edge1(a,d,16,23).
edge1(a,e,30,45).
edge1(b,e,25,34).
edge1(d,e,30,21).
edge1(c,d,26,35).
edge1(c,f,23,34).
edge1(c,i,37,36).
edge1(d,f,22,29).
edge1(f,h,23,18).
edge1(f,m,25,15).
edge1(f,i,25,24).
edge1(i,m,23,19).
edge1(e,f,48,35).
edge1(e,g,16,25).
edge1(e,j,32,18).
edge1(g,h,23,28).
edge1(g,l,20,30).
edge1(g,j,22,54).
edge1(h,m,25,6).
edge1(h,n,27,43).
edge1(h,l,23,56).
edge1(j,l,16,87).
edge1(j,o,20,43).
edge1(l,n,19,43).
edge1(l,o,22,32).
edge1(m,n,32,24).
edge1(m,p,25,54).
edge1(n,p,34,23).
edge1(n,r,20,43).
edge1(o,n,25,42).
edge1(o,q,15,42).
edge1(p,r,31,86).

edge1(o,p,15,42).
edge1(p,q,31,86).
edge1(p,r,50,100).

edge1(r,s,54,9000).
edge1(r,t,100,-8988).


%Camada 5
edge1(s,u,56,78).
edge1(s,v,67,89).

edge1(t,v,31,86).
edge1(t,u,50,100).
edge1(u,v,54,9000).
edge1(u,x,100,-8988).
edge1(v,z,56,78).
edge1(v,x,67,89).

%Camada 6
edge1(x,r,31,86).
edge1(x,z,50,100).
edge1(z,s,54,9000).
edge1(z,t,100,-8988).

edge1(z,falha,89,6908).

%primeiro em profundidade multi critério
dfs(Orig,Dest,Cam,F):-dfs2(Orig,Dest,[Orig],Cam,F).

dfs2(Dest,Dest,LA,Cam,0):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam,F):-node_din(Act,_,_),(edge_din(Act,NX,F0,FR);edge_din(NX,Act,FR,F0)),
    node_din(NX,_,_),\+ member(NX,LA),dfs2(NX,Dest,[NX|LA],Cam,F1), calcula_custo_multi(F0,FR,R), F is F1 + R.



plan_minlig(Orig,Dest,Corte,LCaminho_minlig,MF,NSOL):-
		carregar_bc_din(Orig,Corte),
		get_time(Ti),
		(melhor_caminho_minlig(Orig,Dest,MF);true),
		retract(melhor_sol_minlig(LCaminho_minlig,MF)),
                retract(conta_sol(NSOL)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl,
		limpar_bc_din().

melhor_caminho_minlig(Orig,Dest,MForca):-
		asserta(melhor_sol_minlig(_,0)),
                asserta(conta_sol(0)),
		dfs(Orig,Dest,LCaminho, MForca),
		atualiza_melhor_minlig(LCaminho,MForca),
		fail.

atualiza_melhor_minlig(LCaminho, MForca):-
		melhor_sol_minlig(_,N),
		N<MForca, retract(melhor_sol_minlig(_,_)),
                conta_sol(NS),
		asserta(melhor_sol_minlig(LCaminho,MForca)),
                NS1 is NS + 1,
		retract(conta_sol(_)),
                asserta(conta_sol(NS1)).



%A start para caminho mais forte multi critério

aStar_mais_forte(Orig,Dest,Cam,Custo,Corte,N):-
	carregar_bc_din(Orig,Corte),
	retractall(contAstar(_)),
	asserta(contAstar(0)),
	get_time(Ti),
        aStar_mais_forte_2(Dest,[(_,0,[Orig])],Cam,Custo,Corte),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	contAstar(N),
	limpar_bc_din().



aStar_mais_forte_2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
         reverse([Dest|T],Cam).


aStar_mais_forte_2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Corte):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
	(Dest\==Act,edge_din(Act,X,CustoX,CustoY),\+ member(X,LA),
	 calcula_custo_multi(CustoX,CustoY,R),
	CaX is R + Ca, estimativa_majorante_2(X,EstX,Corte), %Trocas R por CustoX para comutar entre forca lig e multicriterio
	CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	reverse(TodosOrd,TodosRe),
	contAstar(N),
	N1 is N + 1,
	retractall(contAstar(_)),
	asserta(contAstar(N1)),
	aStar_mais_forte_2(Dest,TodosRe,Cam,Custo,Corte).
% ========================================================================
% Função multi critério

calcula_custo_multi(CustoX,CustoY,R):-
		((CustoY > 200)   ->   (R1 is 200)   ; ( (CustoY < (-200)) -> R1 is (-200);R1 is CustoY)),

		R is (CustoX * 0.3) + (R1*0.7).
% ========================================================================

% Estimativa com o nivel do no, o valor de corte e a maior forca da rede
% dinamica


estimativa_majorante_2(Nodo1,Estimativa,Corte):-
	node_din(Nodo1,X1,_),
	maior_forca(F),
        Estimativa is (Corte - X1)*F.

%========================================================

%Best frist para caminho mais forte funçaõ multi criterio
:-dynamic cont_best/1.


bestfs1(Orig,Dest,Cam,Custo,Corte,NS):-
	carregar_bc_din(Orig,Corte),
	retractall(contBest(_)),
	asserta(contBest(0)),
	get_time(Ti),
	bestfs12(Dest,[[Orig]],Cam,Custo),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	write('Caminho='),write(Cam),nl,contBest(NS),limpar_bc_din().

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
	  findall((R,[X|LA]),(edge_din(Act,X,CX,CY),
			       calcula_custo_multi(CX,CY,R),
	  \+member(X,LA)),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  contBest(N),
	  N1 is N + 1,
	  retractall(contBest(_)),
	  asserta(contBest(N1)),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12(Dest,LLA2,Cam,Custo)
	 )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C):-!,edge_din(Act,X,C,_).
calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1),
					edge_din(Act,X,C,_),S is S1+C.

%================================================================
%Predicados BC dinamica

get_dados_edge(X,Z,A,B):-retract(edge_din(X,Z,A,B)).

get_dados_node(Nome,Nivel,Y):-retract(node_din(Nome,Nivel,Y)).


carregar_bc_din(Orig,Corte):-
		tamanho_rede(Orig,Corte,G),
	set_bc_din(G),get_maior_forca().

get_maior_forca():-findall(F,edge_din(_,_,F,_),R),
		findall(F2,edge_din(_,_,_,F2),R2),
		sort(0,@>=,R,RR),
		sort(0,@>=,R2,RR2),
		(set_maior_forca(RR,RR2); true).

set_maior_forca([A|_],[B|_]):-
		((A > B) -> (asserta(maior_forca(A))); (asserta(maior_forca(B)))).



%Limpar bc dinamica
limpar_bc_din():-retractall(edge_din(_,_,_,_)),
		retractall(node_din(_,_,_)),
		retractall(maior_forca(_)).

%Criar bc dinamica
set_bc_din([]).

set_bc_din([X|L]):-node(X,Nivel,Y),asserta(node_din(X,Nivel,Y)),
            set_ligacoes_din(X),set_bc_din(L).

set_ligacoes_din(X):-
	findall((Z),(edge1(X,Z,AB,AC),asserta(edge_din(X,Z,AB,AC))),_).

% perdicado para buscar todos os nos até o n nivel da rede, mesmo usado
% no sprintB
%
tamanho_rede(O,LV,G):-bfs([O],[],LV,0,G),!.

bfs([],V,_,_,G):-reverse(V,G).

bfs(_,V,LV,N,G):-N>LV,reverse(V,G).

bfs(L,V,LV,N,G):-tamanho_rede_1(L,[],V,T,P),N1 is N+1,bfs(T,P,LV,N1,G).

tamanho_rede_1([],L,V,L,V):-!.

tamanho_rede_1([X|L],L2,V,T,P):-member(X,V),tamanho_rede_1(L,L2,V,T,P).

tamanho_rede_1([X|L],L2,V,T,P):-
        vizinhos(X,V,R),
        append(L2,R,L3),
        tamanho_rede_1(L,L3,[X|V],T,P).

vizinhos(X,V,R):-findall(Z,(edge1(X,Z,_,_),\+member(Z,V)),R).
% ======================================================================



%primeiro em profundidade fLigacao
dfs_fLigacao(Orig,Dest,Cam,F):-dfs2_fLigacao(Orig,Dest,[Orig],Cam,F).

dfs2_fLigacao(Dest,Dest,LA,Cam,0):-!,reverse(LA,Cam).
dfs2_fLigacao(Act,Dest,LA,Cam,F):-node_din(Act,_,_),(edge_din(Act,NX,F0,_);edge_din(NX,Act,_,F0)),
    node_din(NX,_,_),\+ member(NX,LA),dfs2_fLigacao(NX,Dest,[NX|LA],Cam,F1), F is F1 + F0.



plan_minlig_fLigacao(Orig,Dest,Corte,LCaminho_minlig,MF,NSOL):-
		carregar_bc_din(Orig,Corte),
		get_time(Ti),
		(melhor_caminho_minlig_fLigacao(Orig,Dest,MF);true),
		retract(melhor_sol_minlig(LCaminho_minlig,MF)),
                retract(conta_sol(NSOL)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl,
		limpar_bc_din().

melhor_caminho_minlig_fLigacao(Orig,Dest,MForca):-
		asserta(melhor_sol_minlig(_,0)),
                asserta(conta_sol(0)),
		dfs_fLigacao(Orig,Dest,LCaminho, MForca),
		atualiza_melhor_minlig_fLigacao(LCaminho,MForca),
		fail.

atualiza_melhor_minlig_fLigacao(LCaminho, MForca):-
		melhor_sol_minlig(_,N),
		N<MForca, retract(melhor_sol_minlig(_,_)),
                conta_sol(NS),
		asserta(melhor_sol_minlig(LCaminho,MForca)),
                NS1 is NS + 1,
		retract(conta_sol(_)),
                asserta(conta_sol(NS1)).



%A start para caminho mais forte fLigacao

aStar_mais_forte_fLigacao(Orig,Dest,Cam,Custo,Corte,NS):-
	carregar_bc_din(Orig,Corte),
	retractall(contAstar(_)),
	asserta(contAstar(0)),
	get_time(Ti),
        aStar_mais_forte_2_fLigacao(Dest,[(_,0,[Orig])],Cam,Custo,Corte),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	contAstar(NS),
	limpar_bc_din().



aStar_mais_forte_2_fLigacao(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
         reverse([Dest|T],Cam).


aStar_mais_forte_2_fLigacao(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Corte):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
	(Dest\==Act,edge_din(Act,X,CustoX,_),\+ member(X,LA),
	CaX is CustoX + Ca, estimativa_majorante_2_fLigacao(X,EstX,Corte), %Trocas R por CustoX para comutar entre forca lig e multicriterio
	CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	reverse(TodosOrd,TodosRe),
	contAstar(N),
	N1 is N + 1,
	retractall(contAstar(_)),
	asserta(contAstar(N1)),
	aStar_mais_forte_2_fLigacao(Dest,TodosRe,Cam,Custo,Corte).

% ========================================================================

% Estimativa com o nivel do no, o valor de corte e a maior forca da rede
% dinamica


estimativa_majorante_2_fLigacao(Nodo1,Estimativa,Corte):-
	node_din(Nodo1,X1,_),
	maior_forca(F),
        Estimativa is (Corte - X1)*F.

%========================================================

%Best frist para caminho mais forte fLigacao

bestfs1_fLigacao(Orig,Dest,Cam,Custo,Corte,NS):-
	carregar_bc_din(Orig,Corte),
	retractall(contBest(_)),
	asserta(contBest(0)),
	get_time(Ti),
	bestfs12_fLigacao(Dest,[[Orig]],Cam,Custo),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	write('Caminho='),write(Cam),nl,contBest(NS),limpar_bc_din().

bestfs12_fLigacao(Dest,[[Dest|T]|_],Cam,Custo):-
	reverse([Dest|T],Cam),
	calcula_custo_fLigacao(Cam,Custo).

bestfs12_fLigacao(Dest,[[Dest|_]|LLA2],Cam,Custo):-
	!,
	bestfs12_fLigacao(Dest,LLA2,Cam,Custo).


bestfs12_fLigacao(Dest,LLA,Cam,Custo):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12_fLigacao(Dest,[LA|LLA1],Cam,Custo))
	 ;
	 (
	  findall((CX,[X|LA]),(edge_din(Act,X,CX,_),

	  \+member(X,LA)),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos_fLigacao(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  contBest(N),
	  N1 is N + 1,
	  retractall(contBest(_)),
	  asserta(contBest(N1)),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12_fLigacao(Dest,LLA2,Cam,Custo)
	 )).

member1_fLigacao(LA,[LA|LAA],LAA).
member1_fLigacao(LA,[_|LAA],LAA1):-member1_fLigacao(LA,LAA,LAA1).

retira_custos_fLigacao([],[]).
retira_custos_fLigacao([(_,LA)|L],[LA|L1]):-retira_custos_fLigacao(L,L1).

calcula_custo_fLigacao([Act,X],C):-!,edge_din(Act,X,C,_).
calcula_custo_fLigacao([Act,X|L],S):-calcula_custo_fLigacao([X|L],S1),
					edge_din(Act,X,C,_),S is S1+C.
