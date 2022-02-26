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

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
:- use_module(library(date)).
:- use_module(library(random)).


:- set_setting(http:cors, [*]).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


%=== BC Primaria ===
:- dynamic jogador/3.
:- dynamic ligacao/3.



%=== BC Secundaria ===

:-dynamic melhor_sol_minlig/2.
:-dynamic melhor_sol_x_tags/2.
:-dynamic safe_sol_minlig/2.
:-dynamic caminho_mais_curto/2.
:-dynamic conta_sol/1.

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
        %http_read_json(Request, Json, [json_object(dict)]),
        %json_to_prolog(Json, Data),
        %todas_combinacoes_din(N,T,LSugestoes),
        %write(LSugestoes),
        %prolog_to_json(Data, JSONObject),
        reply_json(aa, [json_object(dict)]).


todas_combinacoes_din(X,LTags,LJogadores):-
    findall(L,combinacao(X,LTags,L),LcombXTags),
    verificar_x(LcombXTags,LJogadores).

verificar_x(LCombs,LJogadores):-
    findall(J,(jogador(_,J,LJ),member(C,LCombs),intersection(LJ,C,C2),equal_set(C,C2)),LJogadores1),
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
        retractall(jogador(_,_,_)).



adicionarNos():- obterJogadores(Data),parse_jogadores(Data,Lids),
        asserta_all_jogadores(Lids).


asserta_all_jogadores([]).

asserta_all_jogadores([(ID,Nome,T)|Lids]):-asserta(jogador(ID,Nome,T)),
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
                [(H.get(id),H.get(nome),H.get(tagsInteresse))|Lids]):-
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
assertaLigacoes([(Nome1,Nome2,Forca)|L]):-atom_number(Forca,ForcaInt),atom_codes(NomeA,Nome1),atom_codes(NomeB,Nome2),
        asserta(ligacao(NomeA,NomeB,ForcaInt)),
        assertaLigacoes(L).


getA(N,J,B):- jogador(N,J,B).
getB(N,N1,J):-ligacao(N,N1,J).
limpar_tudo():-
        retractall(ligacao(_,_,_)),
        retractall(jogador(_,_,_)).

%=============================================================

%Caminho mais forte BestF


:- http_handler('/caminho-forte', prim_mais_forte, []).


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

%Caminho mais forte A-Star.


%================================================================

%Caminho mais forte primeira em profundidade.



%================================================================

%Caminho mais seguro.




%================================================================

%Caminho mais curto.
















%==== Algoritmos multi criterios.






%====== Considerar estados emocionais.
