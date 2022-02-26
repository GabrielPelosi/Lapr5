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
    public class IntroductionRequestsServiceTest
    {
        private IntroductionRequestService _introductionRequestService;

        private CreatingIntroductionRequestDto _creating_dto;

        private CreatingIntroductionRequestDto _invalidCreatingDto;

        private IntroductionRequestDto _introductionRequestDto;
        private IntroductionRequestBooleanDto _introReqBool;

        private Jogador _returnedJogador;

        //private Jogador _bridgeUserToGetIntroRequests;
        private List<IntroductionRequest> _listToGetPendingIntroRequestFromUser;

        private Jogador _jogadorNull;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IJogadorRepository> _jogadorRepositoryMock;
        private Mock<IIntroductionRequestRepository> _introductionRequestRepositoryMock;


        [SetUp]
        public void Setup(){
            List<string> taglist = new List<string>();
            taglist.Add("C");
            taglist.Add("CSHARP");
            taglist.Add("Torta de banana");
            List<IntroductionRequest> intro_list = new List<IntroductionRequest>();
            List<Ligacao> lig_list = new List<Ligacao>();

            this._jogadorNull = null;
            string avatar = "avatar";
            this._returnedJogador = new Jogador("Gabriel", "password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,taglist,"Portugal","Porto",intro_list, lig_list);
            this._invalidCreatingDto = new CreatingIntroductionRequestDto("341fe45b-95a5-4be3-af52-112e5a78e7a7","531fe55b-65f5-4be4-af52-112e5a78e7a7",
                                            "534fe95b-95a5-4be3-af52-112e5a78e747", "olabridgr","olaobjective",taglist, "22");
           
            //this._returnedJogador = new Jogador("531fe55b-95a5-4be3-af52-112e5a78e7a7","nome", "email@email.com",new DateTime(1999,7,27), taglist,intro_list, "+351926963405","teste desc breve", avatar, "Portugal", "Porto");
            //this._invalidCreatingDto = new CreatingIntroductionRequestDto("5314e55b-95a5-4be3-af52-112e5a78e7a7","5314e55b-95a5-4be3-af52-112e5a78e7a7", "5314e55b-95a5-4be3-af52-112e5a78e7a7", "olabridgr","olaobjective",taglist, "22");
             
            this._creating_dto = new CreatingIntroductionRequestDto("531fe55b-95a5-4be3-af52-112e5a78e7a7",
                                            "531fe55b-95a5-4be3-af52-112e5a78e7a7","531fe55b-95a5-4be3-af52-112e5a78e7a7", "olaText", "olaText2",taglist,"33");
            this._introductionRequestDto = new IntroductionRequestDto("32456536-3213-9808-4357-334567234567","Gabriel", "Jose","Alberto","olaText", "olaText2","33", new List<string>(),IntroductionRequestStatus.SENT.ToString());
            
            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._jogadorRepositoryMock = new Mock<IJogadorRepository>();
            this._introductionRequestRepositoryMock=new Mock<IIntroductionRequestRepository>();

            this._unitOfWorkMock.Setup(u => u.CommitAsync());
            this._jogadorRepositoryMock.Setup(x => x.GetByIdAsync(new JogadorId("531fe55b-95a5-4be3-af52-112e5a78e7a7"))).Returns(Task.FromResult(this._returnedJogador));
            this._jogadorRepositoryMock.Setup(x => x.GetByIdAsync(It.Is<JogadorId>(y => !y.Equals(new JogadorId("531fe55b-95a5-4be3-af52-112e5a78e7a7"))))).Returns(Task.FromResult(this._jogadorNull));
            this._introductionRequestRepositoryMock.Setup(x => x.AddAsync(It.IsAny<IntroductionRequest>()));

   
            this._listToGetPendingIntroRequestFromUser = new List<IntroductionRequest>();
            var intro = new IntroductionRequest(/*_returnedJogador,*/_returnedJogador,_returnedJogador, "ola, pode me apresentar seu amigo?","ola, gostaria de ser seu amigo pois trabalhamos na mesma empresa",taglist,"33");
            this._listToGetPendingIntroRequestFromUser.Add(intro);
            this._introductionRequestRepositoryMock.Setup(x => x.GetPedidosIntroducaoPendente(It.IsAny<Jogador>())).Returns(Task.FromResult(this._listToGetPendingIntroRequestFromUser));
            this._introductionRequestService = new IntroductionRequestService(this._unitOfWorkMock.Object,
                                            this._introductionRequestRepositoryMock.Object,this._jogadorRepositoryMock.Object, null);

        
        
        }


        [Test]
        public void ShouldCreateIntroductionRequest(){
            //chama id existentes e retorna a intro e altera os users
            var result = this._introductionRequestService.addAsync(this._creating_dto);

            this._introductionRequestRepositoryMock.Verify(t => t.AddAsync(It.IsAny<IntroductionRequest>()), Times.AtLeastOnce());
            this._jogadorRepositoryMock.Verify(tp => tp.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());

            Assert.AreEqual(this._introductionRequestDto.BridgeUserText, result.Result.BridgeUserText);
            Assert.AreEqual(this._introductionRequestDto.ObjectiveUserText, result.Result.ObjectiveUserText);
            
        }

        [Test]
        public void ShouldNotCreateAndRetunrNull(){
            Assert.ThrowsAsync<BusinessRuleValidationException>(()=> this._introductionRequestService.addAsync(this._invalidCreatingDto));
            this._introductionRequestRepositoryMock.Verify(t => t.AddAsync(It.IsAny<IntroductionRequest>()), Times.Never());
            this._jogadorRepositoryMock.Verify(tp => tp.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());
            
        }

        [Test]
        public void ShouldThrowExceptionWhenCallListPendingIntroReq(){
            //chama um id que não existe e retorna null, com isso, laca a excecao de não encontrado
            Assert.ThrowsAsync<BusinessRuleValidationException>(()=>this._introductionRequestService.getAllPendingIntroductionRequestsFromUser(this._returnedJogador.Id.AsGuid()));
            this._jogadorRepositoryMock.Verify(t=> t.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());           
            this._introductionRequestRepositoryMock.Verify(t => t.GetPedidosIntroducaoPendente(It.IsAny<Jogador>()), Times.Never());
        }

        [Test]
        public void ShouldThrowExceptionWhenCallListPendingToAccept(){
            //chama um id que não existe e retorna null, com isso, laca a excecao de não encontrado
            Assert.ThrowsAsync<BusinessRuleValidationException>(()=>this._introductionRequestService.getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(this._returnedJogador.Id.AsGuid()));
            this._jogadorRepositoryMock.Verify(t=> t.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());           
            this._introductionRequestRepositoryMock.Verify(t => t.GetPedidosIntroducaoPendente(It.IsAny<Jogador>()), Times.Never());
        }


        [Test]
        public void ShouldUpdateIntroductionRequestStatus(){
            var result = this._introductionRequestService.UpdateStatusAsync(new Guid("531fe55b-95a5-4be3-af52-112e5a78e7a7"), this._introReqBool);
            this._introductionRequestRepositoryMock.Verify(t => t.GetByIdAsync(It.IsAny<IntroductionRequestId>()), Times.AtLeastOnce());

        }
        
    }
}