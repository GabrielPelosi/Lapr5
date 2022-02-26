using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using System;
using NUnit.Framework;
using Moq;

namespace Tests.Domain.Jogadores{
    public class JogadorServiceTest{
        private JogadorService _jogadorService;
        private CreatingJogadorDto _creatingJogadorDto; 
        private JogadorDto _jogadorDto;
        private Jogador _jogador;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IJogadorRepository> _iJogadorRepositoryMock;


        [SetUp]
        public void Setup(){
            string testNome = "Jogador1";
            string testPassword = "P@ssword2021";
            string testData = "07/21/1999";
            string testNumTele = "+351918298456";
            string testEmail = "email@email.com";
            string testDescBreve = "descricao breve";
            string testPais = "Portugal";
            string testCidade = "Porto";
            string avatar = "avatar";
            List<string> tagList = new List<string>();
            tagList.Add("Futebol");
            tagList.Add("Guitarra");
            tagList.Add("Comida");

            this._jogador = new Jogador(testNome, testPassword, testData, testNumTele, testEmail, testDescBreve, avatar, tagList, testPais, testCidade,null, null);
            this._creatingJogadorDto = new CreatingJogadorDto(testNome, testPassword, testData, testNumTele, testEmail, testDescBreve, avatar, tagList, testPais, testCidade, null,null);
            this._jogadorDto = new JogadorDto("531fe55b-95a5-4be3-af52-112e5a78e7a7", testNome, testPassword, testData, testNumTele, testEmail, testDescBreve, avatar, tagList, testPais, testCidade, null,null, "s","0");

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._iJogadorRepositoryMock=new Mock<IJogadorRepository>();

            this._unitOfWorkMock.Setup(u => u.CommitAsync());
            this._iJogadorRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Jogador>()));
            this._iJogadorRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<JogadorId>()));
            this._jogadorService = new JogadorService(this._unitOfWorkMock.Object, this._iJogadorRepositoryMock.Object);

            this._iJogadorRepositoryMock.Setup(x => x.GetByIdAsync(new JogadorId("531fe55b-95a5-4be3-af52-112e5a78e7a7"))).Returns(Task.FromResult(this._jogador));

            this._jogadorService = new JogadorService(this._unitOfWorkMock.Object,this._iJogadorRepositoryMock.Object);        
        }

        [Test]
        public void ShouldCreateJogador(){
            var result = this._jogadorService.AddAsync(this._creatingJogadorDto);
            this._iJogadorRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Jogador>()), Times.AtLeastOnce());
            
            Assert.AreEqual(this._jogadorDto.Email, result.Result.Email);    
        }

        [Test]
        public void ShouldUpdateJogador(){
            var result = this._jogadorService.UpdateAsync(new Guid("531fe55b-95a5-4be3-af52-112e5a78e7a7"), this._jogadorDto);
            this._iJogadorRepositoryMock.Verify(t => t.GetByIdAsync(It.IsAny<JogadorId>()), Times.AtLeastOnce());
        }

        //[Test]
        public void getNetworkSize(){
            var result = this._jogadorService.getNetworkSize(new Guid("2ee68b39-d538-45ec-8769-1611a52f2186"));
            Assert.AreEqual(10, result.Result.Tamanho); 
        }
    }
}