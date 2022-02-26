using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using NUnit.Framework;
using Moq;

namespace Tests{

    public class JogadorDtoTest{
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

            JogadorDto dto = new JogadorDto("id", testNome, testPassword, testDataNascimento, testTelefone, testEmail, testDescBreve, testAvatar, testTagsList, testPais, testLocalidade, null,null, "s","0"); 
            
            Assert.AreEqual(dto.Id, "id");
            Assert.AreEqual(dto.Nome.ToString(), testNome);
            Assert.AreEqual(dto.DataNascimento.ToString(), testDataNascimento.ToString()); //testar validacao
            Assert.AreEqual(dto.Email.ToString(), testEmail);
            foreach(string tag in testTagsList){
                Assert.NotNull(dto.TagsInteresse.ToString().Contains(tag));
            }
            Assert.AreEqual(dto.PaisResidencia.ToString(), testPais);
            Assert.AreEqual(dto.Localidade.ToString(), testLocalidade);
            Assert.AreEqual(dto.NumTelefone.ToString(), testTelefone);
            Assert.AreEqual(dto.DescBreve.ToString(), testDescBreve);
            

        }
    
    }

}