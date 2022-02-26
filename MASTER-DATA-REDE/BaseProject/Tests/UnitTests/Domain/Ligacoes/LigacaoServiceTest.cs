using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Ligacoes;
using System;
using NUnit.Framework;
using Moq;


namespace Tests.Domain.Jogadores{
    public class LigacaoServiceTest{
        private LigacaoService _ligacaoService;

        private Jogador _reqJogador;

        private LigacaoDto ligacaoDto;

        private Jogador _objJogador;

        private Jogador _JogadorNull;

        private string forca;

        private List<string> tags;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<ILigacaoRepository> _iLigacaoRepositoryMock;
        private Mock<IJogadorRepository> _jogadorRepositoryMock;



        [SetUp]
        public void Setup(){
            this.tags=new List<string>();
            this.tags.Add("Java 8");
            this.tags.Add("CSHARP");
            this.tags.Add("Torta de banana");
            List<IntroductionRequest> intro_list = new List<IntroductionRequest>();
            List<Ligacao> lig_list = new List<Ligacao>();

            this._JogadorNull = null;
            string avatar = "avatar";
            this._reqJogador = new Jogador("Gabriel","password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,this.tags,"Portugal","Porto",intro_list, lig_list);
            this._objJogador= new Jogador("Joao","password", "07/27/1999","+351926963405", "email@email.com","teste desc breve",avatar,this.tags,"Portugal","Porto",intro_list, lig_list);
            
            this.forca="2";

            string forcaN="3";

            this.ligacaoDto = new LigacaoDto("245fe45b-95a5-4be3-af52-112e5a78e7a7", this._reqJogador.Nome.ToString(), this._objJogador.Nome.ToString(),  forcaN, this.tags);
            
            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._iLigacaoRepositoryMock = new Mock<ILigacaoRepository>();
            this._jogadorRepositoryMock=new Mock<IJogadorRepository>();

            this._unitOfWorkMock.Setup(u => u.CommitAsync());
            this._jogadorRepositoryMock.Setup(x => x.GetByIdAsync(new JogadorId("531fe55b-95a5-4be3-af52-112e5a78e7a7"))).Returns(Task.FromResult(this._reqJogador));
            this._jogadorRepositoryMock.Setup(x => x.GetByIdAsync(new JogadorId("341fe45b-95a5-4be3-af52-112e5a78e7a7"))).Returns(Task.FromResult(this._objJogador));
            this._jogadorRepositoryMock.Setup(x => x.GetByIdAsync(It.Is<JogadorId>(y => !y.Equals(new JogadorId("531fe55b-95a5-4be3-af52-112e5a78e7a7"))||!y.Equals(new JogadorId("341fe45b-95a5-4be3-af52-112e5a78e7a7"))))).Returns(Task.FromResult(this._JogadorNull));
            this._iLigacaoRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Ligacao>()));

            this._ligacaoService = new LigacaoService(this._unitOfWorkMock.Object,
                                            this._iLigacaoRepositoryMock.Object,this._jogadorRepositoryMock.Object);

            }

        [Test]
        public void ShouldCreateLigacao(){
            var result = this._ligacaoService.addAsync( this._objJogador,this._reqJogador, this.tags, this.forca);
            this._iLigacaoRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Ligacao>()), Times.AtLeastOnce());
            Assert.AreEqual(this._reqJogador.Nome.ToString(), result.Result.Jogador1UserName);    
            Assert.AreEqual(this._objJogador.Nome.ToString(), result.Result.Jogador2UserName);
        }

        [Test]
        public void ShouldUpdateLigacao(){
            var result = this._ligacaoService.updateTagsForca(new Guid("245fe45b-95a5-4be3-af52-112e5a78e7a7"), this.ligacaoDto);
            this._iLigacaoRepositoryMock.Verify(t => t.GetByIdAsync(It.IsAny<LigacaoID>()), Times.AtLeastOnce());
        }
    }
}