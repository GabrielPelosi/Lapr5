using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;


namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoMapper
    {
        public static Ligacao creatingToLigacaoDomain(Jogador jogador1, Jogador jogador2, List<string> tags, string forca){
            return new Ligacao(jogador1, jogador2, forca, tags);
        }

        public static LigacaoDto toLigacaoDto(Ligacao lig){
            return new LigacaoDto(
            lig.Id.AsString(),
            lig.Jogador1.Nome != null ? lig.Jogador1.Nome.ToString() : "sem_nome",
            lig.Jogador2.Nome != null ? lig.Jogador2.Nome.ToString() : "sem_nome",
            lig.fLigacao.Value,
            lig.tagsLigacao.ConvertAll<string>(tag => tag.ToString())
            );
            
        }
    }
}