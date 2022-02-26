

:- dynamic node_din/6.
:- dynamic edge_din/4.

:-dynamic melhor_sol_minlig/2.
:- dynamic conta_sol/1.

node(a,0,195,alegria,0.5,[natureza,moda,musica,sw,coimbra]).
node(b,1,175,angustia,0.6,[natureza,moda,tecnologia,cinema]).
node(c,1,135,medo,0.9,[natureza,teatro,carros,porto]).
node(d,1,100,dececao,0.4,[natureza,futebol,sw,jogos,porto]).
node(e,1,105,remorso,0.8,[natureza,teatro,tecnologia,futebol,porto]).
node(f,2,110,raiva,0.9,[natureza,musica,cinema,lisboa,moda]).
node(g,2,95,alegria,0.6,[natureza,carros,futebol,coimbra]).
node(h,2,85,alegria,0.4,[natureza,cinema,musica,tecnologia,porto]).
node(i,2,70,alegria,1,[natureza,pintura,musica,moda,porto]).
node(j,3,60,angustia,0.3,[natureza,cinema,jogos,moda,porto]).
node(l,3,50,remorso,0.1,[natureza,pintura,sw,musica,carros,lisboa]).
node(m,3,55,raiva,0.9,[natureza,musica,porto,lisboa,cinema]).
node(n,3,45,medo,0.3,[natureza,cinema,teatro,carros,coimbra]).
node(o,4,40,esperanca,0.7,[natureza,cinema,jogos,sw,moda]).
node(p,4,25,orgulho,0.6,[natureza,musica,sw,futebol,coimbra]).
node(q,4,15,medo,0.3,[natureza,musica,carros,porto,moda]).
node(r,5,10,raiva,0.6,[natureza,pintura,carros,futebol,lisboa]).
node(s,6,5,gratidao,0.5,[natureza,pintura,musica,sw,porto]).
node(t,6,10,medo,0.4,[moda,tecnologia,cinema]).
node(u,6,9,medo,0.6,[naturezza,musica,sw]).
node(v,7,10,raiva,0.4,[moda,tecnologia,cinema]).
node(x,7,5,orgulho,0.6,[cmaismais,musica,sw]).
node(z,8,8,medo,0.1,[cmaismais,musica,sw]).

node(falha,9,60,alegria,0.6,[jogo,musica,sw,cha,cafe,torta,js]).

%camada 0
edge1(a,b,45,30).
edge1(a,c,32,54).
edge1(a,d,16,23).
edge1(a,e,30,45).

%camda 1
edge1(b,e,25,34).
edge1(d,e,30,21).
edge1(c,d,26,35).
edge1(c,f,23,34).
edge1(c,i,37,36).
edge1(d,f,22,29).
edge1(e,f,48,35).
edge1(e,g,16,25).
edge1(e,j,32,18).

%Camada 2
edge1(f,h,23,18).
edge1(f,m,25,15).
edge1(f,i,25,24).
edge1(i,m,23,19).
edge1(g,h,23,28).
edge1(g,l,20,30).
edge1(g,j,22,54).
edge1(h,m,25,6).
edge1(h,n,27,43).
edge1(h,l,23,56).

%Camada 3
edge1(j,l,16,87).
edge1(j,o,20,43).
edge1(l,n,19,43).
edge1(l,o,22,32).
edge1(m,n,32,24).
edge1(m,p,25,54).
edge1(n,p,34,23).
edge1(n,r,20,43).

%Camada 4
edge1(o,n,25,42).
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


tagSemantica(natureza,naturezza).
tagSemantica(naturezza,natureza).
tagSemantica(carrros,carros).
tagSemantica(carros,carrros).
tagSemantica(javascript,js).
tagSemantica(js,javascript).
tagSemantica(jogo,jogos).




%primeiro em profundidade
dfs(Orig,Dest,Cam,F,LHumor,Constante):-
		dfs2(Orig,Dest,[Orig],Cam,F,LHumor,Constante).

dfs2(Dest,Dest,LA,Cam,0,_,_):-!,
		reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam,F,LHumor,Constante):-
		node_din(Act,_,_,H1,VH1,_),
		(edge_din(Act,NX,F0,_);edge_din(NX,Act,_,F0)),
		node_din(NX,_,_,H2,VH2,_),
		\+ member(NX,LA),
		validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante),
		dfs2(NX,Dest,[NX|LA],Cam,F1,LHumor,Constante),
		F is F1 + F0.



plan_minlig(Orig,Dest,Corte,LCaminho_minlig,MF,NSOL,LHumor,Constante):-
		carregar_bc_din(Orig,Corte),
		get_time(Ti),
		(melhor_caminho_minlig(Orig,Dest,MF,LHumor,Constante);true),
		retract(melhor_sol_minlig(LCaminho_minlig,MF)),
                retract(conta_sol(NSOL)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl,
		limpar_bc_din().

melhor_caminho_minlig(Orig,Dest,MForca,LHumor,Constante):-
		asserta(melhor_sol_minlig(_,0)),
                asserta(conta_sol(0)),
		dfs(Orig,Dest,LCaminho, MForca,LHumor,Constante),
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



%A start para caminho mais forte

aStar_mais_forte(Orig,Dest,Cam,Custo,Corte,LHumor,Constante):-
	carregar_bc_din(Orig,Corte),
	get_time(Ti),
        aStar_mais_forte_2(Dest,[(_,0,[Orig])],Cam,Custo,Corte,LHumor,Constante),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	limpar_bc_din().



aStar_mais_forte_2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_,_,_):-
         reverse([Dest|T],Cam).


aStar_mais_forte_2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Corte,LHumor,Constante):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
	(Dest\==Act,
	 (edge_din(Act,X,CustoX,CustoY);edge_din(X,Act,CustoX,CustoY)),
	 \+ member(X,LA),
	 node_din(Act,_,_,H1,VH1,_),
	 node_din(X,_,_,H2,VH2,_),
	 validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante),
	 calcula_custo_multi(CustoX,CustoY,R),
	 CaX is R + Ca,
	 estimativa_majorante_2(X,EstX,Corte),
	 CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	reverse(TodosOrd,TodosRe),
	aStar_mais_forte_2(Dest,TodosRe,Cam,Custo,Corte,LHumor,Constante).

calcula_custo_multi(CustoX,CustoY,R):-
		((CustoY > 200)   ->   (R1 is 200)   ; ( (CustoY < (-200)) -> R1 is (-200);R1 is CustoY)),

		R is (CustoX * 0.3) + (R1*0.7).


%Buscar antes a maior força de ligacao da e usar no lugar do 100
%subtrair o X1 e X2 pelo Nível de corte
%estimativa_majorante(_,_,0,_).
%estimativa v1
estimativa_majorante(Nodo1,Nodo2,Estimativa,Corte):-
	node_din(Nodo1,X1,Y1,_,_,_),
	node_din(Nodo2,X2,Y2,_,_,_),
        Estimativa is ((Y1*((Corte)+X1))+(Y2*((Corte)+X2))).

%estimativa v2
estimativa_majorante_2(Nodo1,Estimativa,Corte):-
	node_din(Nodo1,X1,_,_,_,_),
	maior_forca(F),
        Estimativa is (Corte - X1)*F.




%comutar entre somar e substrari o X1 e X2 do corte.
%Subtracao é como está no moodle, mas o resultado é falho, com a soma
% e o valor estimado guardado em Y2 a multiplicar pelo resultado da soma
% da um valor mais proximo do real
%




%Best frist para caminho mais forte

bestfs1(Orig,Dest,Cam,Custo,Corte,LHumor,Constante):-
	carregar_bc_din(Orig,Corte),
	get_time(Ti),
	bestfs12(Dest,[[Orig]],Cam,Custo,LHumor,Constante),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	write('Caminho='),write(Cam),nl,limpar_bc_din().

bestfs12(Dest,[[Dest|T]|_],Cam,Custo,_,_):-
	reverse([Dest|T],Cam),
	calcula_custo(Cam,Custo).

bestfs12(Dest,[[Dest|_]|LLA2],Cam,Custo,LHumor,Constante):-
	!,
	bestfs12(Dest,LLA2,Cam,Custo,LHumor,Constante).


bestfs12(Dest,LLA,Cam,Custo,LHumor,Constante):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12(Dest,[LA|LLA1],Cam,Custo,LHumor))
	 ;
	 (
	  findall((R,[X|LA]),
		  (edge_din(Act,X,CX,CY),
		   calcula_custo_multi(CX,CY,R),
		   \+member(X,LA),
		   node_din(Act,_,_,H1,VH1,_),
		   node_din(X,_,_,H2,VH2,_),
		   validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante)),
		  Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12(Dest,LLA2,Cam,Custo,LHumor,Constante)
	 )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C):-!,edge_din(Act,X,C,_).
calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1),
					edge_din(Act,X,C,_),S is S1+C.


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
%
limpar_bc_din():-retractall(edge_din(_,_,_,_)),retractall(node_din(_,_,_,_,_,_)).

%Criar bc dinamica
%
get_dados_edge(X,Z,A,B):-retract(edge_din(X,Z,A,B)).

get_dados_node(Nome,Nivel,Y,H,V,C):-retract(node_din(Nome,Nivel,Y,H,V,C)).

set_bc_din([]).

set_bc_din([X|L]):-node(X,Nivel,Y,H,V,T),asserta(node_din(X,Nivel,Y,H,V,T)),
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



validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante):-
		(\+member(H2,LHumor); VH2> Constante),
		(\+member(H1,LHumor); VH1> Constante)
		.



%================novos estados de humor
%========================================
%

novos_estados_humorr(N,L,D):-
		node_din(N,F1,F2,E,V,T),
		((E = "alegria")   ->	V1 is (V+(1-V)*((min((L-D),200))/200));
		(E = "angustia") ->     V1 is (V * ( 1- ((min((L-D),200))/200)))),
		retract(node_din(N,_,_,_,_,_)),
		asserta(node_din(N,F1,F2,E,V1,T)).


novos_estados_humorr(_,_,_):-!.


novos_estados_humor(N, [X|L], [X1|H], VEsp, VMedo, VAlivio, VDec, T, T1, T2, T3):-
		F is X1,
		((F = "esperanca") -> T is T+1; (F="medo")-> T1 is T1+1;(F="alivio") -> T2 is T2+1; (F="dececao") -> T3 is T3+1),
		novos_estados_humor(N, L, H, VEsp,VMedo, VAlivio, VDec, T, T1, T2, T3)
		.

novos_estados_humor(N, [],[], VEsp, VMedo, VAlivio, VDec, T, T1, T2, T3):-
		node_din(N,F1,F2, E, H,LT),
		QE is T/VEsp,
		QM is T1/VMedo,
		QA is T2/VAlivio,
		QD is T3/VDec,
		( (E="esperanca") ->  H1 is H+QE; (E="medo") -> H1 is H+QM; (E="alivio")->H1 is H+QA; (E="dececao") -> H1 is H+QD),
		retract(node_din(N, _,_,_,_,_)),
		assert(node_din(N, F1,F2, E, H1,LT)).


novos_estados_humor(_,[],[],_,_,_,_,_,_,_,_):-!.




%==== Sugerir grupos ====
verifica_nTags(Nome,X,LTags,R):-
		length(LTags,C),
		X>C,
		!,
		CCopy is C,
		node(Nome,_,_,_,_,T),
		parse_tags_list(CCopy,X,LTags,T,R).

verifica_nTags(_,_,LTags,R):-append(LTags,[],R).

parse_tags_list(X,X,LTags1,_,R):-append(LTags1,[],R).

parse_tags_list(CCopy,X,LTags,[A|T],R):-
		CCopy1 is  CCopy + 1,
		append(LTags,[A],Res),
		parse_tags_list(CCopy1,X,Res, T,R).


todas_combinacoes(Nome,X,LTags,LJogadores,NJog):-
		(verifica_nTags(Nome,X,LTags,R);true),
    findall(L,combinacao(X,R,L),LcombXTags),
    verificar_x(LcombXTags,LJogadores),length(LJogadores,Leng),
    verificar_qnt(Leng,NJog).

verificar_qnt(Leng,NJog):-
		((Leng > NJog)->(write('Um grupo que satisfaz suas necessidades'))
		;
		((Leng < NJog)->write('Grupo que não satisfaz');write('Grupo no limite'))).


verificar_x(LCombs,LJogadores):-
    findall(J,(node(J,_,_,_,_,LJ),member(C,LCombs),intersection(LJ,C,C2),equal_set(C,C2)),LJogadores1),
    sort(LJogadores1,LJogadores).

equal_set([],[]).
equal_set([X|Xs],Ys):-
    (member(X,Ys)),
    delete(Ys,X,Ys2),
    equal_set(Xs,Ys2).


equal_set([X|Xs],Ys):-
		(tagSemantica(X,YT);tagSemantica(YT,X)),
		member(YT,Ys),
		delete(Ys,X,Ys2),
		equal_set(Xs,Ys2).





combinacao(0,_,[]):-!.

combinacao(X,[Tag|L],[YT|T]):- X1 is X-1,(tagSemantica(Tag,YT);tagSemantica(YT,Tag)),combinacao(X1,L,T).

combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).


combinacao(X,[_|L],T):- combinacao(X,L,T).
