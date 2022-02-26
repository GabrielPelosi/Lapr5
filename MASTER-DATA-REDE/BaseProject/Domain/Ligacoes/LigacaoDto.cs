using System;
using System.Collections.Generic;


namespace DDDSample1.Domain.Ligacoes
{
    public class LigacaoDto
    {
        public string Id { get; set; }
        public string Jogador1UserName { get; set; }
        public string Jogador2UserName { get; set; }

        public string ForcaLigacao { get; set; }

        public List<string> TagsLigacao { get; set; }



        public LigacaoDto(){

        }

        public LigacaoDto(string id, string jogador1UserName, string jogador2UserName,
        string forcaLigacao, List<string> connectionTags){
            this.Id = id;
            this.Jogador1UserName=jogador1UserName;
            this.Jogador2UserName=jogador2UserName;
            this.ForcaLigacao = forcaLigacao;
            this.TagsLigacao= connectionTags;
        }


       /*public override String ToString(){
           
        }*/
    }
}