
using System;
using System.Collections.Generic;


namespace DDDSample1.Domain.Jogadores
{
    public class RedeSocialDto
    {
        public string NomeJogador { get; set;}

        public string IdJogador { get; set;}

        public string Mood { get; set;}

        public List<LigacaoRedeDto> LigacoesDto { get; set;}

        public string Avatar {get;set;}

        public List<Tag> Tags {get;set;}


        public RedeSocialDto(string nomeJogador, string idJogador, string mood, List<LigacaoRedeDto> ligacoes, string avatar, List<Tag> tags){
            this.NomeJogador = nomeJogador;
            this.IdJogador = idJogador;
            this.Mood=mood;
            this.LigacoesDto = ligacoes;
            this.Avatar=avatar;
            this.Tags=tags;
        }

        public RedeSocialDto(string nomeJogador, string idJogador, string mood, string avatar, List<Tag> tags){
            this.NomeJogador = nomeJogador;
            this.IdJogador = idJogador;
            this.Mood=mood;
            this.LigacoesDto = new List<LigacaoRedeDto>();
            this.Avatar=avatar;
            this.Tags=tags;
        }

        public void AddLigacaoRedeDto(LigacaoRedeDto dto){
            this.LigacoesDto.Add(dto);
        }

    }
}