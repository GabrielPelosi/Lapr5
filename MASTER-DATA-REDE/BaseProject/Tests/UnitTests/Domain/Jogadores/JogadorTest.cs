using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using System;
using NUnit.Framework;


namespace Tests.Domain.Jogadores{
    public class JogadorTest{

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

            Jogador j = new Jogador(testNome, testPassword, testDataNascimento, testTelefone, testEmail, testDescBreve, testAvatar, testTagsList, testPais, testLocalidade, null, null);

            Assert.AreEqual(j.Nome.ToString(), testNome);
            Assert.AreEqual(j.DataNascimento.ToString(), testDataNascimento.ToString());
            Assert.AreEqual(j.Email.ToString(), testEmail);
            foreach(string tag in testTagsList){
                Assert.NotNull(j.TagsInteresse.ToString().Contains(tag));
            }
            Assert.AreEqual(j.PaisResidencia.ToString(), testPais);
            Assert.AreEqual(j.Localidade.ToString(), testLocalidade);
            Assert.AreEqual(j.NumTelefone.ToString(), testTelefone);
            Assert.AreEqual(j.DescBreve.ToString(), testDescBreve);
            

        }
    }
}