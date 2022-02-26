using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Ligacoes
{
    public class CreatingLigacaoDto
    {
        
        //futuramente serao trocados para objetos utilizadores
        public string JogadorID { get; private set; }
        public List<string> ligacoesTags { get; private set;}

        public string forcaLigacao { get; private set;}

        private CreatingLigacaoDto(){

        }

        public CreatingLigacaoDto(string jogadorID, List<string> connectionTags,
                                                string forcaLigacao){

            this.JogadorID= jogadorID;
            this.ligacoesTags=connectionTags;
            this.forcaLigacao=forcaLigacao;
        }
    }
}