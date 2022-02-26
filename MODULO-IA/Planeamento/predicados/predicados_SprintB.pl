:- consult('./baseConhecimento/baseConhecimento_4_camadas_1_no').
:- consult('./baseConhecimento/baseConhecimento_x_tags').

%=============================================================



:-dynamic melhor_sol_minlig/2.
:-dynamic melhor_sol_x_tags/2.
:- dynamic melhor_sol_minlig_sug/2.
:- dynamic conta_sol/1.
:- dynamic conta_safe_sol/1.
:- dynamic conta_mais_curto_sol/1.



:- dynamic safe_sol_minlig/2.
:-dynamic melhor_sol_curto/2.



%===============================================0
%
dfs_mais_curto(Orig,Dest,Cam):-dfs_mais_curto_2(Orig,Dest,[Orig],Cam).

dfs_mais_curto_2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs_mais_curto_2(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs_mais_curto_2(X,Dest,[X|LA],Cam).


caminho_mais_curto(Orig,Dest,LCaminho_minlig,NSOL):-
		get_time(Ti),
		(caminho_mais_curto_1(Orig,Dest);true),
		retract(melhor_sol_curto(LCaminho_minlig,_)),
		retract(conta_mais_curto_sol(NSOL)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

caminho_mais_curto_1(Orig,Dest):-
		asserta(melhor_sol_curto(_,10000)),
		asserta(conta_mais_curto_sol(0)),
		dfs_mais_curto(Orig,Dest,LCaminho),
		atualiza_caminho_mais_curto(LCaminho),
		fail.

atualiza_caminho_mais_curto(LCaminho):-
		melhor_sol_curto(_,N),
		length(LCaminho,C),
		C<N,retract(melhor_sol_curto(_,_)),
		asserta(melhor_sol_curto(LCaminho,C)),
		retract(conta_mais_curto_sol(NJ)),
		N1 is NJ + 1,
		asserta(conta_mais_curto_sol(N1)).




% ========================================================================
% =====0
%
%

all_dfs(Nome1,Nome2,LCam):-get_time(T1),
    findall(Cam,dfsC(Nome1,Nome2,Cam),LCam),
    length(LCam,NLCam),
    get_time(T2),write(' Tempo '),write('NSOL '),write(NLCam),
    T is T2-T1,write(T).

dfsC(Orig,Dest,Cam):-dfs2C(Orig,Dest,[Orig],Cam).

dfs2C(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2C(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2C(X,Dest,[X|LA],Cam).


%=============
dfs(Orig,Dest,Cam,F):-dfs2(Orig,Dest,[Orig],Cam,F).
dfs(Orig,Dest,Cam,F,Lim):-dfs3(Orig,Dest,[Orig],Cam,F,Lim).


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
		N<MForca, retract(melhor_sol_minlig(_,_)),
                retract(conta_sol(NS)),
		asserta(melhor_sol_minlig(LCaminho,MForca)),
                NS1 is NS + 1,
                asserta(conta_sol(NS1)).



%=====================================================0000
%


dfs3(Dest,Dest,LA,Cam,0,_):-!,reverse(LA,Cam).
dfs3(Act,Dest,LA,Cam,F,Lim):-no(NAct,Act,_),(ligacao(NAct,NX,F0,_);ligacao(NX,NAct,_,F0)),
    no(NX,X,_),\+ member(X,LA),dfs3(X,Dest,[X|LA],Cam,F1,Lim), Lim>F0, F is F1+F0.


plan_safelig(Orig,Dest,LCaminho_minlig,MF,Lim,NSOL):-
		get_time(Ti),
		(safe_caminho_minlig(Orig,Dest,MF, Lim);true),
		retract(safe_sol_minlig(LCaminho_minlig,MF)),
		retract(conta_safe_sol(NSOL)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

safe_caminho_minlig(Orig,Dest,MForca,Lim):-
		asserta(safe_sol_minlig(_,0)),
		asserta(conta_safe_sol(0)),
		dfs(Orig,Dest,LCaminho, MForca, Lim),
		atualiza_safe_minlig(LCaminho,MForca),
		fail.

atualiza_safe_minlig(LCaminho, MForca):-
		safe_sol_minlig(_,N),
		N<MForca, retract(safe_sol_minlig(_,_)),
		retract(conta_safe_sol(NS)),
		asserta(safe_sol_minlig(LCaminho,MForca)),
		NS1 is NS + 1,
                asserta(conta_safe_sol(NS1)).





%======================================================0

todas_combinacoes(X,LTags,LJogadores):-
    findall(L,combinacao(X,LTags,L),LcombXTags),
    verificar_x(LcombXTags,LJogadores).

verificar_x(LCombs,LJogadores):-
    findall(J,(no(_,J,LJ),member(C,LCombs),intersection(LJ,C,C2),equal_set(C,C2)),LJogadores1),
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


%========================================================

tamanho_rede_nivel(Nome,X,L,R,C):-tamanho1(Nome,X,L,R),length(L,C1),length(R,C2),
        C is C1 + C2.



tamanho_rede_nivel(Nome,X,L,R,C):-tamanho1(Nome,X,L,R),length(L,C1),length(R,C2),
        C is C1 + C2.



tamanho1(_,0,[],_):-!.

tamanho1(Nome,X,[Nome2|L],R):-no(Id,Nome,_),(ligacao(Id,Id2,_,_);ligacao(Id2,Id,_,_)),
        no(Id2,Nome2,_),X1 is X - 1,
    findall(L1,todas_lig(Nome2,L1),R),
    tamanho1(Nome,X1,L,R),\+member(Nome2,L).

todas_lig(O,Nome):-
        no(ID,O,_),
        (ligacao(ID,ID2,_,_);ligacao(ID2,ID,_,_)),
        no(ID2,Nome,_).






%==============================================
%

dfsS(Orig,Cam,Corte,TagsSug):-dfs2S(Orig,[Orig],Cam,Corte,TagsSug).

dfs2S(_,LA,Cam,0,_):-!,reverse(LA,Cam).
dfs2S(Act,LA,Cam,Corte,TagsSug):-no(NAct,Act,_),
        (ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,LTags),\+ member(X,LA),
    intersection(TagsSug,LTags,C2),
    length(C2,D),
    D >= 1,
    C1 is Corte - 1,
    dfs2S(X,[X|LA],Cam,C1,TagsSug).





sugestoes(Orig,LCaminho_Sug,Corte):-
		get_time(Ti),
		(melhor_caminho_sugestao(Orig,Corte);true),
		retract(melhor_sol_minlig_sug(LCaminho_Sug,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_sugestao(Orig,Corte):-
		asserta(melhor_sol_minlig_sug(_,100000)),
                no(_,Orig,TagsSug),
		dfsS(Orig,LCaminho,Corte,TagsSug),
		atualiza_melhor_sugestao(LCaminho),
		fail.

atualiza_melhor_sugestao(LCaminho):-
		melhor_sol_minlig_sug(_,N),
                length(LCaminho,C),
		C<N, retract(melhor_sol_minlig_sug(_,_)),
		asserta(melhor_sol_minlig_sug(LCaminho,C)).






%=========================================00
% A* test




aStar(Orig,Dest,Cam,Custo):-
aStar2(Dest,[(_,0,[Orig])],Cam,Custo).

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
LA=[Act|_],
findall((CEX,CaX,[X|LA]),
(Dest\==Act,edge(Act,X,CustoX),\+ member(X,LA),
CaX is CustoX + Ca, estimativa(X,Dest,EstX),
CEX is CaX +EstX),Novos),
append(Outros,Novos,Todos),
sort(Todos,TodosOrd),
aStar2(Dest,TodosOrd,Cam,Custo).

estimativa(Nodo1,Nodo2,Estimativa):-
node(Nodo1,X1,Y1),
node(Nodo2,X2,Y2),
Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).















