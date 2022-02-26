using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using NUnit.Framework;
using Moq;

namespace Tests{

    public class CreatingJogadorDtoTest{

        [Test]
        public void testSetParameters(){
            string testNome = "Jogador1"; 
            string testPassword = "P@ssword2021";
            string testDataNascimento = "07/21/1999";
            string testEmail = "email@email.com";
            List<string> testTagsList = new List<string> {"Futebol", "guitarra", "Comida"};
            string testPais = "Portugal";
            string testLocalidade = "Porto";
            string testTelefone = "+351916812247";
            string testDescBreve = "Eu sou o Jogador1";
            string testAvatar = "avatar";

            CreatingJogadorDto cdto = new CreatingJogadorDto(testNome, testPassword, testDataNascimento, testTelefone, testEmail, testDescBreve, testAvatar, testTagsList, testPais, testLocalidade, null, null);

            Assert.AreEqual(cdto.Nome.ToString(), testNome);
            Assert.AreEqual(cdto.DataNascimento.ToString(), testDataNascimento.ToString()); //testar validacao
            Assert.AreEqual(cdto.Email.ToString(), testEmail);
            foreach(string tag in testTagsList){
                Assert.NotNull(cdto.TagsInteresse.ToString().Contains(tag));
            }
            Assert.AreEqual(cdto.PaisResidencia.ToString(), testPais);
            Assert.AreEqual(cdto.Localidade.ToString(), testLocalidade);
            Assert.AreEqual(cdto.NumTelefone.ToString(), testTelefone);
            Assert.AreEqual(cdto.DescBreve.ToString(), testDescBreve);

        }
    }
}