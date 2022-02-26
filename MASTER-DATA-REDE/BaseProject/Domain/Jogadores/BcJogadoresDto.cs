using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;




namespace DDDSample1.Domain.Jogadores
{
    public class BcJogadoresDto
    {
        public string IdJogador { get; set; }

        public string Nome { get; set; }

        public List<string> TagsInteresse { get; set; }

        public BcJogadoresDto(string id, string nome, List<string> tagsInteresse)
        {
            this.Nome = nome;
            this.IdJogador = id;
            this.TagsInteresse = tagsInteresse;  
        }
        
    }
}