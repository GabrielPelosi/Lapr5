using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Ligacoes;
using System;
using NUnit.Framework;
using Moq;





namespace Tests.Domain.IntroductionRequests
{
    public class IntroductionRequestTest
    {

        private Jogador _returnedBridgeUser;


        private Jogador _returnedObjectiveUser;

        private Jogador _returnedObjectiveUserNull;
        private Jogador _returnedBridgeUserNull;

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


            this._returnedBridgeUserNull = null;
            this._returnedObjectiveUserNull = null;

            this._returnedBridgeUser = new Jogador("Gabriel", "password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,taglist,"Portugal","Porto",intro_list, lig_list);

            this._returnedObjectiveUser = new Jogador("Gabriel", "password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,taglist,"Portugal","Porto",intro_list, lig_list);


        }

        [Test]
        public void ShouldCreateIntroductionRequest(){
            var bridgeUserText = "Olá, gostaria de conhecer seu amigo";
            var objectiveUserText = "Olá, gostaria de te conhecer";
            var introReq = new IntroductionRequest(_returnedBridgeUser,_returnedObjectiveUser,"Olá, gostaria de conhecer seu amigo", "Olá, gostaria de te conhecer",this.taglist,"55");
            Assert.AreNotEqual(introReq.BridgeUser,this._returnedBridgeUser);
            Assert.AreEqual(introReq.ObjectiveUser,this._returnedObjectiveUser);
            Assert.AreEqual(introReq.BridgeUserText.ToString(),bridgeUserText);
            Assert.AreEqual(introReq.ObjectiveUserText.ToString(),objectiveUserText);
        }

        [Test]
        public void ShouldNotCreateIntroductionRequest(){
            Assert.Throws<BusinessRuleValidationException>(()=> new IntroductionRequest(_returnedBridgeUserNull,_returnedObjectiveUserNull,"Olá, gostaria de conhecer seu amigo", "Olá, gostaria de te conhecer",this.taglist,"55"));
        }
    }
}