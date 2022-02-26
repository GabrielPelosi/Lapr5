using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using NUnit.Framework;

namespace Tests{

    public class JogadorMapperTest{
        
        [Test]
        public void testJogadorToDto(){
            string nome = "Jogador1";
            string password = "P@ssword2021";
            string email = "email@email.com";
            string dataNascimento = "07/21/1999";
            string nTelefone = "+351918298456";
            string descBreve = "desc breve";
            string paisResidencia = "Portugal";
            string cidade = "Porto";
            
            string avatar = "avatar";
            List<string> tagList = new List<string>();
            tagList.Add("Futebol");
            tagList.Add("Guitarra");
            tagList.Add("Comida");

            Jogador jog = new Jogador(nome, password, dataNascimento, nTelefone, email, descBreve, avatar, tagList, paisResidencia, cidade, null, null);

            JogadorDto jdto = new JogadorDto(jog.Id.AsString(), nome, password, dataNascimento, nTelefone, email, descBreve, avatar, tagList, paisResidencia, cidade, null,null, "s","0");
            JogadorDto dtoMapper = JogadorMapper.toDTO(jog);

            Assert.AreEqual(jdto.Nome, dtoMapper.Nome);

        }

        [Test] 
        public void testJogadorToDomain(){
            string nome = "Jogador1";
            string password = "P@ssword2021";
            string email = "email@email.com";
            string dataNascimento = "07/27/1999";
            string nTelefone = "+351918298456";
            string descBreve = "desc breve";
            string paisResidencia = "Portugal";
            string cidade = "Porto";
            
            string avatar = "avatar";
            List<string> tagList = new List<string>();
            tagList.Add("Futebol");
            tagList.Add("Guitarra");
            tagList.Add("Comida");

            CreatingJogadorDto cjdto = new CreatingJogadorDto(nome, password, dataNascimento, nTelefone, email, descBreve, avatar, tagList, paisResidencia, cidade, null, null);
            
            Jogador domainMapper = JogadorMapper.toDomain(cjdto); 
            Jogador j = new Jogador(nome, password, dataNascimento, nTelefone, email, descBreve, avatar, tagList, paisResidencia, cidade, null, null);

            Assert.AreEqual(j.Email.ToString(), domainMapper.Email.ToString());

        }
    }
}