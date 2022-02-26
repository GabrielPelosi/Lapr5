using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{
    public class LigacaoRedeDto
    {

        public string NomeJogador { get; set; }

        public string ForcaLigacao { get; set; }

        public string Mood{ get; set; }

        //focar caulculada sera adcionada futuramente
        
        public List<string> TagsLigacao { get; set; }

        public string Avatar {get;set;}

        public List<LigacaoRedeDto> LigacoesRecursivasDto { get; set;}

        public List<Tag> Tags {get;set;}

        public LigacaoRedeDto(string nomeJogador, string forcaLigacao, string Mood, List<string> tagsLigacao, string avatar, List<Tag> tags){
            this.NomeJogador = nomeJogador;
            this.ForcaLigacao = forcaLigacao;
            this.TagsLigacao = tagsLigacao;
            this.Mood=Mood;
            this.LigacoesRecursivasDto=new List<LigacaoRedeDto>();
            this.Avatar=avatar;
            this.Tags=tags;
        }

        public LigacaoRedeDto(string nomeJogador, string forcaLigacao,string mood, List<string> tagsLigacao, 
        List<LigacaoRedeDto> ligacoes, string avatar, List<Tag> tags){
            this.NomeJogador = nomeJogador;
            this.ForcaLigacao = forcaLigacao;
            this.TagsLigacao = tagsLigacao;
            this.Mood=mood;
            this.LigacoesRecursivasDto=ligacoes;
            this.Avatar=avatar;
            this.Tags=tags;
        }

        
    }
}