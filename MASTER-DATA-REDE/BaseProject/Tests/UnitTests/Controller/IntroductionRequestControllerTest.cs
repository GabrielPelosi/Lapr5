using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Shared;
using DDDSample1.Controllers;
using System;
using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Tests.Controller
{
    [TestFixture]
    public class IntroductionRequestControllerTest
    {
        private IntroductionRequestController _controller;

        private Mock<IIntroductionRequestService> _introRequestServiceMock;

        private IntroductionRequestDto _createdIntroRequestDto;

        private CreatingIntroductionRequestDto _creatingIntroRequestDto;

        private CreatingIntroductionRequestDto _invalidCreatingDto;


        [SetUp]
        public void Setup(){
            this._introRequestServiceMock = new Mock<IIntroductionRequestService>();
            List<string> taglist = new List<string>();
            taglist.Add("C#");
            taglist.Add("CSHARP");
            taglist.Add("Torta de maça");
            
            this._creatingIntroRequestDto = new CreatingIntroductionRequestDto("531fe55b-95a5-4be3-af52-112e5a78e7a7",
                                            "531fe55b-95a5-4be3-af52-112e5a78e7a7","531fe55b-95a5-4be3-af52-112e5a78e7a7", "olaText", "olaText2",taglist,"33");
           

            this._createdIntroRequestDto = new IntroductionRequestDto("ID-Teste-4345-6647", "AAA","Gabriel", "Alberto","Olá,gostaria de conhecer seu amigo","Olá, gostaria de te conhecer","33",taglist, "SENT");
            this._invalidCreatingDto = new CreatingIntroductionRequestDto("id-invalid","id-invalid","id-invalid","olaText", "olaText2",taglist,"33");
            this._introRequestServiceMock.Setup(t=> t.addAsync(It.IsAny<CreatingIntroductionRequestDto>())).Returns(Task.FromResult(_createdIntroRequestDto));
            //this._introRequestServiceMock.Setup(t=> t.addAsync(It.Is<CreatingIntroductionRequestDto>(x => !x.Equals(_creatingIntroRequestDto)))).Throws(new BusinessRuleValidationException("Erro"));


            //Buscar pedidos pendentes para ser aprovado/desaprovado Mock, casos found e not found
            this._introRequestServiceMock.Setup(t => t.getAllPendingIntroductionRequestsFromUser(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9")));
            this._introRequestServiceMock.Setup(t => t.getAllPendingIntroductionRequestsFromUser(It.Is<Guid>( id => !id.Equals(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9"))))).Throws(new BusinessRuleValidationException("Usuário não encontrado"));
            
            //Buscar pedidos pendentes para ser aceito/rejeitado Mock, casos found e not found
            this._introRequestServiceMock.Setup(t => t.getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9")));
            this._introRequestServiceMock.Setup(t => t.getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(It.Is<Guid>( id => !id.Equals(new Guid("531fe85b-95a5-1be9-af82-122e0a48e7a9"))))).Throws(new BusinessRuleValidationException("Usuário não encontrado"));


            this._controller = new IntroductionRequestController(this._introRequestServiceMock.Object);
        
        }


        [Test]
        public void ShouldCreateIntroductionRequestStatus200(){
            var result = this._controller.createNewIntroductionRequest(this._creatingIntroRequestDto);
            this._introRequestServiceMock.Verify(t => t.addAsync(It.IsAny<CreatingIntroductionRequestDto>()), Times.Once());
        }

        [Test]
        public void ShouldReturnIntroRequestPendingToApprove(){

        }

        [Test]
        public void ShouldReturnNotFoundForPendingToApprove(){
            //var result = this._controller.getAllPendingIntroductionRequests(new Guid("938fe87b-34a5-6be8-af86-928e4a48e5a6"));
            //this._introRequestServiceMock.Verify(t => t.getAllPendingIntroductionRequestsFromUser(It.IsAny<Guid>()), Times.Once());
        }

        [Test]
        public void ShouldReturnIntroRequestApprovedToAccept(){

        }

        [Test]
        public void ShouldReturnNotFoundForApprovedToAccept(){

        }
    }
}