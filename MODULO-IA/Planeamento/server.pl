% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(uri)).
:- use_module(library(http/http_cors)).
:- use_module(library(ssl)).
:- use_module(library(http/http_ssl_plugin)).


:- json_object student(name:string, number:integer).

:- json_object jogadorTestOrg(nomeOrig:string).
:- json_object jogadorTestDest(nomeDest:string).



:- http_handler('/processa_json', p_json, []).
:- http_handler('/cam-mais-forte',getCaminhoMaisForte,[]).
:- http_handler('/cam-mais-curto', getCaminhoMaisCurto,[]).

server(Port) :-
        http_server(http_dispatch, [port(Port)]).


stopServer(Port):-
        %retract(port(Port)),
        http_stop_server(Port,_).


p_json(Request) :-
        http_read_json(Request, JSON, [json_object(dict)]),
       %R = json([name=joao,number=3000]),
        R = student("joao",JSON.set_user),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).

getCaminhoMaisForte(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
         http_parameters(Request,
                        [ origem(O, []),
                        destino(D, [])
                        ]),
         format('Content-type: text/plain~n~n'),
         term_string(O,Origem),
         term_string(D,Destino),
        plan_minlig(O,D,LCam,MF),
       format('Origem: ~w | Destino: ~w~nCaminho: ~w~nForca:~w',[Origem,Destino,LCam,MF]).

getCaminhoMaisSeguro(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
         http_parameters(Request,
                        [ origem(O, []),
                        destino(D, [])
                        ]),
         format('Content-type: text/plain~n~n'),
         term_string(O,Origem),
         term_string(D,Destino),
         plan_safelig(O,D,LCam, MF, Lim),
         format('Origem: ~w | Destino: ~w~nCaminho: ~w~nForca:~w~Lim:~w',[Origem,Destino,LCam,MF,Lim]).



getCaminhoMaisCurto(Request):-
        cors_enable(Request,[ methods([get,post,delete,options])]),
        http_parameters(Request,
                        [ origem(O,[]),
                        destino(D, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(O,Origem),
        term_string(D,Destino),
        plan_minlig_caminho_mais_curto(O,D,LCam),
        format('Origem: ~w | Destino: ~w~nCaminho:~w', [Origem,Destino,LCam]).



% Cliente consumidor de json

client(Number):-
        Term = json([set_user = Number]),
        http_post('http://localhost:8001/processa_json', json(Term), Reply, [json_object(dict)]),
        write('Client: '),write(Reply.name),nl,
        write('Client: '),write(Reply.number),nl.

stop(Port):- http_stop_server([port(Port)],[]).






%=============================================================


:- use_module(library(lists)).


no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
no(13,carlos,[natureza,musica,sw,futebol,coimbra]).
no(14,daniel,[natureza,cinema,jogos,sw,moda]).
no(21,eduardo,[natureza,cinema,teatro,carros,coimbra]).
no(22,isabel,[natureza,musica,porto,lisboa,cinema]).
no(23,jose,[natureza,pintura,sw,musica,carros,lisboa]).
no(24,luisa,[natureza,cinema,jogos,moda,porto]).
no(31,maria,[natureza,pintura,musica,moda,porto]).
no(32,anabela,[natureza,cinema,musica,tecnologia,porto]).
no(33,andre,[natureza,carros,futebol,coimbra]).
no(34,catia,[natureza,musica,cinema,lisboa,moda]).
no(41,cesar,[natureza,teatro,tecnologia,futebol,porto]).
no(42,diogo,[natureza,futebol,sw,jogos,porto]).
no(43,ernesto,[natureza,teatro,carros,porto]).
no(44,isaura,[natureza,moda,tecnologia,cinema]).
no(200,sara,[natureza,moda,musica,sw,coimbra]).

no(51,rodolfo,[natureza,musica,sw]).
no(61,rita,[moda,tecnologia,cinema]).


ligacao(1,11,10,8).
%ligacao(1,12,2,6).
%ligacao(1,13,-3,-2).
%ligacao(1,14,1,-5).
ligacao(11,21,5,7).
%ligacao(11,22,2,-4).
%ligacao(11,23,-2,8).
%ligacao(11,24,6,0).
%ligacao(12,21,4,9).
%ligacao(12,22,-3,-8).
%ligacao(12,23,2,4).
%ligacao(12,24,-2,4).
%ligacao(13,21,3,2).
%ligacao(13,22,0,-3).
%ligacao(13,23,5,9).
%ligacao(13,24,-2, 4).
%ligacao(14,21,2,6).
%ligacao(14,22,6,-3).
%ligacao(14,23,7,0).
%ligacao(14,24,2,2).
ligacao(21,31,2,1).
%ligacao(21,32,-2,3).
%ligacao(21,33,3,5).
%ligacao(21,34,4,2).
%ligacao(22,31,5,-4).
%ligacao(22,32,-1,6).
%ligacao(22,33,2,1).
%ligacao(22,34,2,3).
%ligacao(23,31,4,-3).
%ligacao(23,32,3,5).
%ligacao(23,33,4,1).
%ligacao(23,34,-2,-3).
%ligacao(24,31,1,-5).
%ligacao(24,32,1,0).
%ligacao(24,33,3,-1).
%ligacao(24,34,-1,5).
ligacao(31,41,2,4).
%ligacao(31,42,6,3).
%ligacao(31,43,2,1).
%ligacao(31,44,2,1).
%ligacao(32,41,2,3).
%ligacao(32,42,-1,0).
%ligacao(32,43,0,1).
%ligacao(32,44,1,2).
%ligacao(33,41,4,-1).
%ligacao(33,42,-1,3).
%ligacao(33,43,7,2).
%ligacao(33,44,5,-3).
%ligacao(34,41,3,2).
%ligacao(34,42,1,-1).
%ligacao(34,43,2,4).
%ligacao(34,44,1,-2).
ligacao(41,200,2,0).
%ligacao(42,200,7,-2).
%ligacao(43,200,-2,4).
%ligacao(44,200,-1,-3).

ligacao(1,51,6,2).
ligacao(51,61,7,3).
ligacao(61,200,2,4).




:-dynamic melhor_sol_minlig/2.
:-dynamic melhor_sol_x_tags/2.
:-dynamic safe_sol_minlig/2.
:-dynamic caminho_mais_curto/2.
:-dynamic conta_sol/1.


all_dfs(Nome1,Nome2,LCam):-get_time(T1),
    findall(Cam,dfs(Nome1,Nome2,Cam),LCam),
    length(LCam,NLCam),
    get_time(T2),
    write(NLCam),write(' solucoes encontradas em '),
    T is T2-T1,write(T),write(' segundos'),nl,
    write('Lista de Caminhos possiveis: '),write(LCam),nl,nl.

dfs(Orig,Dest,Cam,F):-dfs2(Orig,Dest,[Orig],Cam,F).

dfs2(Dest,Dest,LA,Cam,0):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam,F):-no(NAct,Act,_),(ligacao(NAct,NX,F0,_);ligacao(NX,NAct,_,F0)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam,F1), F is F1 + F0.


plan_minlig(Orig,Dest,LCaminho_minlig,MF,NSOL):-
		get_time(Ti),
		(melhor_caminho_minlig(Orig,Dest,MF);true),
		retract(melhor_sol_minlig(LCaminho_minlig,MF)),
                retract(conta_sol(NSOL)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_minlig(Orig,Dest,MForca):-
		asserta(melhor_sol_minlig(_,0)),
                asserta(conta_sol(0)),
		dfs(Orig,Dest,LCaminho, MForca),
		atualiza_melhor_minlig(LCaminho,MForca),
		fail.

atualiza_melhor_minlig(LCaminho, MForca):-
		melhor_sol_minlig(_,N),
                conta_sol(NSOL),
		N<MForca, retract(melhor_sol_minlig(_,_)),
                retract(conta_sol(_)),
                N1 is NSOL + 1,
                asserta(conta_sol(N1)),
		asserta(melhor_sol_minlig(LCaminho,MForca)).

dfs3(Dest,Dest,LA,Cam,0,_):-!,reverse(LA,Cam).
dfs3(Act,Dest,LA,Cam,F,Lim):-no(NAct,Act,_),(ligacao(NAct,NX,F0,_);ligacao(NX,NAct,_,F0)),
    no(NX,X,_),\+ member(X,LA),dfs3(X,Dest,[X|LA],Cam,F1,Lim), Lim>F0, F is F1+F0.


plan_safelig(Orig,Dest,LCaminho_minlig,MF,Lim):-
		get_time(Ti),
		(safe_caminho_minlig(Orig,Dest,MF, Lim);true),
		retract(safe_sol_minlig(LCaminho_minlig,MF)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

safe_caminho_minlig(Orig,Dest,MForca,Lim):-
		asserta(safe_sol_minlig(_,0)),
		dfs(Orig,Dest,LCaminho, MForca, Lim),
		atualiza_safe_minlig(LCaminho,MForca),
		fail.

atualiza_safe_minlig(LCaminho, MForca):-
		safe_sol_minlig(_,N),
		N<MForca, retract(safe_sol_minlig(_,_)),
		asserta(safe_sol_minlig(LCaminho,MForca)).



% Caminho mais curto%

dfs_caminho_mais_curto(Orig,Dest,Cam):-dfs2_caminho_mais_curto(Orig,Dest,[Orig],Cam).

dfs2_caminho_mais_curto(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2_caminho_mais_curto(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2_caminho_mais_curto(X,Dest,[X|LA],Cam).


plan_minlig_caminho_mais_curto(Orig,Dest,LCaminho_minlig):-
		get_time(Ti),
		(caminho_curto(Orig,Dest);true),
		retract(caminho_mais_curto(LCaminho_minlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

caminho_curto(Orig,Dest):-
		asserta(caminho_mais_curto(_,10000)),
		dfs_caminho_mais_curto(Orig,Dest,LCaminho),
		atualiza_melhor_minlig_caminho_mais_curto(LCaminho),
		fail.

atualiza_melhor_minlig_caminho_mais_curto(LCaminho):-
		caminho_mais_curto(_,N),
		length(LCaminho,C),
		C<N,retract(caminho_mais_curto(_,_)),
		asserta(caminho_mais_curto(LCaminho,C)).



todas_combinacoes(X,LTags,LJogadores):-
    findall(L,combinacao(X,LTags,L),LcombXTags),
    verificar_x(LcombXTags,LJogadores).

verificar_x(LCombs,LJogadores):-
    findall(J,(no(_,J,LJ),member(C,LCombs),intersection(LJ,C,C2),equal_set(C,C2)),LJogadores1),
    sort(LJogadores1,LJogadores).

equal_set([],[]).
equal_set([X|Xs],Ys):-
    member(X,Ys),
    delete(Ys,X,Ys2),
    equal_set(Xs,Ys2).



combinacao(0,_,[]):-!.

combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).


combinacao(X,[_|L],T):- combinacao(X,L,T).


