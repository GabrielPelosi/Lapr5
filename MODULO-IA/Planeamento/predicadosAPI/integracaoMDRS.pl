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

%============================================================

carregarBC():-
	adicionarNos(),adicionarLigacoes(),!.


limparBC():-
        retractall(ligacao(_,_,_)),
        retractall(jogador(_,_,_)).

%===========================================================
%AdicionarJogadores

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


%=============================================================================
%Adicionar Ligacoes de jogadores




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


