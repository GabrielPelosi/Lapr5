:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_open)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_error)).
:- use_module(library(uri)).
:- use_module(library(http/http_cors)).
:- use_module(library(ssl)).
:- use_module(library(http/http_ssl_plugin)).

:- set_setting(http:cors, [*]).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


%=== BC Primaria ===
:- dynamic jogador/5.
:- dynamic ligacao/3.



%=== BC Secundaria ===

:-dynamic melhor_sol_minlig/2.
:-dynamic melhor_sol_x_tags/2.
:-dynamic safe_sol_minlig/2.
:-dynamic caminho_mais_curto/2.
:-dynamic conta_sol/1.
:- dynamic melhor_sol_curto/2.

%== BC Links de integracao ==

getJogadores("https://lapr5-g26.herokuapp.com/api/Jogadores").
getLigacoes("https://lapr5-g26.herokuapp.com/api/Ligacoes").

%=============================

tagSemantica(natureza,naturezza).
tagSemantica(naturezza,natureza).
tagSemantica(carrros,carros).
tagSemantica(carros,carrros).
tagSemantica(javascript,js).


%=======================================
server(Port) :-
        http_server(http_dispatch, [port(Port)]).


stopServer(Port):-
        %retract(port(Port)),
        http_stop_server(Port,_).

%======================================

:- http_handler('/sugestoes', getSugestoesDinamica,[]).

getSugestoesDinamica(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_read_json(Request, Json),
        json_to_prolog(Json, Data),
        write(Data),
        %todas_combinacoes_din(N,T,LSugestoes),
        %write(LSugestoes),
        prolog_to_json(Data, JSONObject),
        reply_json(JSONObject).


todas_combinacoes_din(X,LTags,LJogadores):-
    findall(L,combinacao(X,LTags,L),LcombXTags),
    verificar_x(LcombXTags,LJogadores).

verificar_x(LCombs,LJogadores):-
    findall(J,(jogador(_,J,LJ,_,_),member(C,LCombs),intersection(LJ,C,C2),equal_set(C,C2)),LJogadores1),
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

%============================================================

carregarBC():-
	adicionarNos(),adicionarLigacoes(),!.


limparBC():-
        retractall(ligacao(_,_,_)),
        retractall(jogador(_,_,_,_,_)).



adicionarNos():- obterJogadores(Data),parse_jogadores(Data,Lids),
        asserta_all_jogadores(Lids).


asserta_all_jogadores([]).

asserta_all_jogadores([(ID,Nome,T,Mood,Intensity)|Lids]):-
        atom_number(Intensity,I),
        atom_codes(Mood1,Mood),atom_codes(Nome1,Nome),
        asserta(jogador(ID,Nome1,Mood1,I,T)),
        asserta_all_jogadores(Lids).

asserta_all_jogadores([(ID,Nome,T,Mood,_)|Lids]):-
        atom_codes(Mood1,Mood), atom_codes(Nome1,Nome),
        asserta(jogador(ID,Nome1,Mood1,0,T)),
        asserta_all_jogadores(Lids).

obterJogadores(Data):-
	getJogadores(URL),
	setup_call_cleanup(
		http_open(URL, In, [request_header('Accept'='application/json')]),
		json_read_dict(In, Data),
		close(In)
).


parse_jogadores([],[]).
parse_jogadores([H|Data],
                [(H.get(id),H.get(nome),H.get(tagsInteresse), H.get(mood),H.get(intensity))|Lids]):-
	parse_jogadores(Data,Lids).



adicionarLigacoes():- obterLigacoes(Data),
        parseLigacoes(Data,L),
        assertaLigacoes(L).


obterLigacoes(Data):-
        getLigacoes(URL),
        setup_call_cleanup(
		http_open(URL, In, [request_header('Accept'='application/json')]),
		json_read_dict(In, Data),
		close(In)
).

parseLigacoes([],[]).
parseLigacoes([H|Data],
        [(H.get(jogador1UserName),H.get(jogador2UserName),H.get(forcaLigacao))|Lids]):-
	parseLigacoes(Data,Lids).



assertaLigacoes([]).
assertaLigacoes([(Nome1,Nome2,Forca)|L]):-
        atom_number(Forca,ForcaInt),
        atom_codes(NomeA,Nome1),atom_codes(NomeB,Nome2),
        asserta(ligacao(NomeA,NomeB,ForcaInt)),
        assertaLigacoes(L).


getA(N,J,B,G,J):- jogador(N,J,B,G,J).
getB(N,N1,J):-ligacao(N,N1,J).
limpar_tudo():-
        retractall(ligacao(_,_,_)),
        retractall(jogador(_,_,_)).

%=============================================================

%Caminho mais forte BestF


:- http_handler('/caminho-forte-best', prim_mais_forte, []).


prim_mais_forte(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        bestfs1(O,D,LCam,Custo),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w | Custo: ~w', [Origem,Destino,LCam,Custo]).


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



%=================================================================
%=================================0
%============================================

%Caminho mais forte A-Star.



%A start para caminho mais forte multi critério


:- http_handler('/caminho-forte-a-star', aStar_mais_forte_fLigacao, []).


aStar_mais_forte_fLigacao(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        aStar_mais_forte(O,D,LCam,Custo),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w | Custo: ~w', [Origem,Destino,LCam,Custo]).




aStar_mais_forte(Orig,Dest,Cam,Custo):-
        aStar_mais_forte_2(Dest,[(_,0,[Orig])],Cam,Custo).



aStar_mais_forte_2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
         reverse([Dest|T],Cam).


aStar_mais_forte_2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
	(Dest\==Act,ligacao(Act,X,CustoX),\+ member(X,LA),
	CaX is CustoX + Ca, estimativa_majorante_2(EstX),
	CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	reverse(TodosOrd,TodosRe),
	aStar_mais_forte_2(Dest,TodosRe,Cam,Custo).



estimativa_majorante_2(0).

%================================================================

%Caminho mais forte primeira em profundidade.

:-http_handler('/caminho-forte-dfs', dfs_mais_forte, []).

dfs_mais_forte(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        caminho_mais_forte_dfs(O,D,LCam,Custo),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w | Custo: ~w', [Origem,Destino,LCam,Custo]).




dfs_mais_forte(Orig,Dest,Cam,F):-dfs2_mais_forte(Orig,Dest,[Orig],Cam,F).

dfs2_mais_forte(Dest,Dest,LA,Cam,0):-!,reverse(LA,Cam).
dfs2_mais_forte(Act,Dest,LA,Cam,F):-(ligacao(Act,NX,F0);ligacao(NX,Act,F0)),\+ member(NX,LA),dfs2_mais_forte(NX,Dest,[NX|LA],Cam,F1), F is F1 + F0.


caminho_mais_forte_dfs(Orig,Dest,LCaminho_minlig,MF):-
		get_time(Ti),
		(melhor_caminho_mais_forte_dfs(Orig,Dest,MF);true),
		retract(melhor_sol_minlig(LCaminho_minlig,MF)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_mais_forte_dfs(Orig,Dest,MForca):-
		asserta(melhor_sol_minlig(_,0)),
		dfs_mais_forte(Orig,Dest,LCaminho, MForca),
		atualiza_melhor_mais_forte(LCaminho,MForca),
		fail.

atualiza_melhor_mais_forte(LCaminho, MForca):-
		melhor_sol_minlig(_,N),
		N<MForca,
                retract(melhor_sol_minlig(_,_)),
		asserta(melhor_sol_minlig(LCaminho,MForca)).




%================================================================

%Caminho mais seguro.

:-http_handler('/caminho-seguro', dfs_mais_seguro, []).

dfs_mais_seguro(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        plan_safelig(O,D,LCam,Custo,Limite),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w , Custo: ~w, Limite:~w', [Origem,Destino,LCam, Custo,Limite]).


dfs_mais_seguro(Orig,Dest,Cam,F,Lim):-dfs3(Orig,Dest,[Orig],Cam,F,Lim).

dfs3(Dest,Dest,LA,Cam,0,_):-!,reverse(LA,Cam).
dfs3(Act,Dest,LA,Cam,F,Lim):-(ligacao(Act,NX,F0);ligacao(NX,Act,F0)),
   \+ member(NX,LA),dfs3(NX,Dest,[NX|LA],Cam,F1,Lim), Lim>F0, F is F1+F0.


plan_safelig(Orig,Dest,LCaminho_minlig,MF,Lim):-
		get_time(Ti),
		(safe_caminho_minlig(Orig,Dest,MF, Lim);true),
		retract(safe_sol_minlig(LCaminho_minlig,MF)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

safe_caminho_minlig(Orig,Dest,MForca,Lim):-
		asserta(safe_sol_minlig(_,0)),

		dfs_mais_seguro(Orig,Dest,LCaminho, MForca, Lim),
		atualiza_safe_minlig(LCaminho,MForca),
		fail.

atualiza_safe_minlig(LCaminho, MForca):-
		safe_sol_minlig(_,N),
		N<MForca, retract(safe_sol_minlig(_,_)),

		asserta(safe_sol_minlig(LCaminho,MForca)).



%================================================================

%Caminho mais curto.
:-http_handler('/caminho-curto', dfs_mais_curto, []).

dfs_mais_curto(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        cam_mais_curto(O,D,LCam),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w ', [Origem,Destino,LCam]).


dfs_curto(Orig,Dest,Cam):-dfs2_curto(Orig,Dest,[Orig],Cam).
dfs2_curto(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2_curto(Act,Dest,LA,Cam):-
        jogador(_,Act,_,_,_),
        (ligacao(Act,NX,_);ligacao(NX,Act,_)),
        jogador(_,NX,_,_,_),\+ member(NX,LA),
        dfs2_curto(NX,Dest,[NX|LA],Cam).



cam_mais_curto(Orig,Dest,LCaminho_minlig):-
		get_time(Ti),
		(melhor_caminho_curto(Orig,Dest);true),
		retract(melhor_sol_curto(LCaminho_minlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_curto(Orig,Dest):-
		asserta(melhor_sol_curto(_,0)),
		dfs_curto(Orig,Dest,LCaminho),
		atualiza_caminho_mais_curto(LCaminho),
		fail.


atualiza_caminho_mais_curto(LCaminho):-
		melhor_sol_curto(_,N),
		length(LCaminho,C),
		C<N,retract(melhor_sol_curto(_,_)),
		asserta(melhor_sol_curto(LCaminho,C)).












%====== Considerar estados emocionais.


:-http_handler('/caminho-forte-best-estados', best_estados, []).

best_estados(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, []),
                          estado(E, []),
                          valor(V, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        term_string(E,Estado),
        term_string(V,Valor),
        atom_number(V,VInt),
        bestfs1_estados(O,D,LCam,Custo,[E],VInt),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w | Custo: ~w | a : ~w | b ~w', [Origem,Destino,LCam,Custo,Estado,Valor]).





bestfs1_estados(Orig,Dest,Cam,Custo,LHumor,Constante):-
	get_time(Ti),
	bestfs12_estados(Dest,[[Orig]],Cam,Custo,LHumor,Constante),
	get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao de solucao: '),
	write(T), nl,
	write('Caminho='),write(Cam),nl.

bestfs12_estados(Dest,[[Dest|T]|_],Cam,Custo,_,_):-
	reverse([Dest|T],Cam),
	calcula_custo(Cam,Custo).

bestfs12_estados(Dest,[[Dest|_]|LLA2],Cam,Custo,LHumor,Constante):-
	!,
	bestfs12_estados(Dest,LLA2,Cam,Custo,LHumor,Constante).


bestfs12_estados(Dest,LLA,Cam,Custo,LHumor,Constante):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12_estados(Dest,[LA|LLA1],Cam,Custo,LHumor,Constante))
	 ;
	 (
	  findall((R,[X|LA]),
		  (ligacao(Act,X,CX),
			       calcula_custo_multi(CX,0,R),
		   \+member(X,LA)
                  ,
		   jogador(_,Act,H1,VH1,_),
		   jogador(_,X,H2,VH2,_),

		  validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante)
                  ),
		  Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12_estados(Dest,LLA2,Cam,Custo,LHumor,Constante)
	 )).

%member1(LA,[LA|LAA],LAA).
%member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

%retira_custos([],[]).
%retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

%calcula_custo([Act,X],C):-!,edge_din(Act,X,C,_).
%calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1),
%					edge_din(Act,X,C,_),S is S1+C.



validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante):-
		(\+member(H2,LHumor); VH2> Constante),
		(\+member(H1,LHumor); VH1> Constante)
		.

%A START ESTADOS ====================================================
%=========================================00
%=========================================




:-http_handler('/caminho-forte-a-star-estados', aStart_estados, []).

aStart_estados(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, []),
                          estado(E, []),
                          valor(V, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        term_string(E,Estado),
        term_string(V,Valor),
        atom_number(V,VInt),
        aStar_mais_forte_estados(O,D,LCam,Custo,[E],VInt),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w | Custo: ~w | a : ~w | b ~w', [Origem,Destino,LCam,Custo,Estado,Valor]).





aStar_mais_forte_estados(Orig,Dest,Cam,Custo,LHumor,Constante):-
        aStar_mais_forte_2_estados(Dest,[(_,0,[Orig])],Cam,Custo,LHumor,Constante).



aStar_mais_forte_2_estados(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_,_):-
         reverse([Dest|T],Cam).


aStar_mais_forte_2_estados(Dest,[(_,Ca,LA)|Outros],Cam,Custo,LHumor,Constante):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
	(Dest\==Act,
	 (ligacao(Act,X,CustoX);ligacao(X,Act,CustoX)),
	 \+ member(X,LA),
	 jogador(_,Act,H1,VH1,_),
	 jogador(_,X,H2,VH2,_),
	 validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante),
	 CaX is CustoX + Ca,
	 estimativa_majorante_2(EstX),
	 CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	reverse(TodosOrd,TodosRe),
	aStar_mais_forte_2_estados(Dest,TodosRe,Cam,Custo,LHumor,Constante).


%DFS ESTADOS ==========================================================0
%=================================================0
%=========================================================000000000000
%

:-http_handler('/caminho-forte-dfs-estados', dfs_estados, []).

dfs_estados(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        limparBC(),
        carregarBC(),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, []),
                          estado(E, []),
                          valor(V, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        term_string(E,Estado),
        term_string(V,Valor),
        atom_number(V,VInt),
        cam_mais_forte_estados(O,D,LCam,Custo,[E],VInt),
        format('Origem: ~w | Destino: ~w | nCaminho: ~w | Custo: ~w | a : ~w | b ~w', [Origem,Destino,LCam,Custo,Estado,Valor]).






%primeiro em profundidade
dfs(Orig,Dest,Cam,F,LHumor,Constante):-
		dfs2(Orig,Dest,[Orig],Cam,F,LHumor,Constante).

dfs2(Dest,Dest,LA,Cam,0,_,_):-!,
		reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam,F,LHumor,Constante):-
		jogador(_,Act,H1,VH1,_),
		(ligacao(Act,NX,F0);ligacao(NX,Act,F0)),
		jogador(_,NX,H2,VH2,_),
		\+ member(NX,LA),
		validar_estado_humor(H1,VH1,H2,VH2,LHumor,Constante),
		dfs2(NX,Dest,[NX|LA],Cam,F1,LHumor,Constante),
		F is F1 + F0.



cam_mais_forte_estados(Orig,Dest,LCaminho_minlig,MF,LHumor,Constante):-
		(melhor_caminho_minlig(Orig,Dest,MF,LHumor,Constante);true),
		retract(melhor_sol_minlig(LCaminho_minlig,MF)).

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
