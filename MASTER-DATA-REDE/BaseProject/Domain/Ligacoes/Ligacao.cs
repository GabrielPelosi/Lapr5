using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.Domain.Ligacoes
{
    public class Ligacao : Entity<LigacaoID>, IAggregateRoot
    {
        public virtual Jogador Jogador1 { get ;  set; }

        public virtual Jogador Jogador2 { get ; private set; }

        public  ForcaLigacao fLigacao{get;  set;}

        public  List<TagsLigacao> tagsLigacao { get;  set;}


        public Ligacao(){
            
        }
        public Ligacao( Jogador jogador1, Jogador jogador2, string strength, List<string> tagsLigacao )
        {
            /*if (jogador1 == null) throw new BusinessRuleValidationException("Usuário requisita não existe no sistema!");
            if (jogador2 == null) throw new BusinessRuleValidationException("Usuário objectivo não existe no sistema!");
            */
            if(strength=="0"||strength=="")throw new BusinessRuleValidationException("Força inválida!");
            this.Id = new LigacaoID(Guid.NewGuid());
            this.Jogador1 = jogador1;    
            this.Jogador2=jogador2;
            this.fLigacao=new ForcaLigacao(strength);
            this.tagsLigacao = new List<TagsLigacao>();
            foreach(string tag in tagsLigacao){
                this.tagsLigacao.Add(new TagsLigacao(tag));
            }
        }

        public override string ToString()
        {
            return "Amizade com: " + Jogador1.Nome.ToString();
        }

        public void ChangeTags(List<string> tags)
        {
            this.tagsLigacao = new List<TagsLigacao>();
            foreach(string tag in tags){
                this.tagsLigacao.Add(new TagsLigacao(tag));
            }
        }

         public void ChangeForca(string forca){
            this.fLigacao = new ForcaLigacao(forca);
}

    }
}