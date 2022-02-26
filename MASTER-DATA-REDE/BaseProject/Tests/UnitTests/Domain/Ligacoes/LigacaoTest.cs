using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using System;
using NUnit.Framework;
using Moq;


namespace Tests.Domain.Ligacoes{


    public class LigacaoTest{
        private Jogador _returnedRequestingUser;
        private Jogador _returnedObjectiveUser;

        private Jogador _returnedObjectiveUserNull;
        private Jogador _returnedRequestingUserNull;
        private List<string> taglist;


        [SetUp]
        public void SetUp(){
            string avatar = "avatar";
            this.taglist = new List<string>();
            taglist.Add("Java 8");
            taglist.Add("CSHARP");
            taglist.Add("Torta de banana");
            List<IntroductionRequest> intro_list = new List<IntroductionRequest>();
            List<Ligacao> lig_list = new List<Ligacao>();


            this._returnedRequestingUserNull = null;
            this._returnedObjectiveUserNull = null;

            this._returnedRequestingUser = new Jogador("Gabriel", "password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,taglist,"Portugal","Porto",intro_list, lig_list);

            this._returnedObjectiveUser = new Jogador("Gabriel abc","password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,taglist,"Portugal","Porto",intro_list, lig_list);


        }

        [Test]
        public void ShouldCreateLigacao(){
            var forca = "forca 2";
            var lig = new Ligacao(_returnedRequestingUser,_returnedObjectiveUser,"forca 2",this.taglist);
            Assert.AreEqual(lig.Jogador1,this._returnedRequestingUser);
            Assert.AreEqual(lig.Jogador2,this._returnedObjectiveUser);
            Assert.AreEqual(lig.fLigacao.ToString(),forca);
        }

        [Test]
        public void ShouldNotCreateLigacao(){
            Assert.Throws<BusinessRuleValidationException>(()=> new Ligacao(_returnedRequestingUserNull,_returnedObjectiveUserNull,"0",this.taglist));
        }

    
    }
}