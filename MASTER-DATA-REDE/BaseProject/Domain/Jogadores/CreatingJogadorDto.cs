using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{
    public class CreatingJogadorDto
    {
        public string Nome { get; set; }
        public string Password { get; set; }
        public string DataNascimento { get; set; }
        public string NumTelefone { get; set; }
        public string Email { get; set; }
        public string DescBreve { get; set; } //opcional
        public string Avatar { get; set; } //opcional (mudar de string para imagem)
        public List<string> TagsInteresse { get; set; } //obrigatorio, lista de strings, case insensitive
        public string PaisResidencia { get; set; } //opcional, validar paises todos (195)
        public string Localidade { get; set; } //opcional, informação alfanumerica sem validação adicional
        public List<string> IntroductionRequests { get; set; }

        public List<string> Ligacoes { get; set; }

        
        public CreatingJogadorDto(string nome, string password, string dataNascimento, string numTelefone, string email, string descBreve, string avatar, List<string> tagsInteresse, string paisResidencia, string localidade, List<string> introductionRequests, List<string> ligacoes)
        {
            this.Nome = nome;
            this.DataNascimento = dataNascimento;
            this.Password = password;
            this.NumTelefone = numTelefone;
            this.Email = email;
            this.DescBreve = descBreve;
            this.Avatar = avatar;
            this.TagsInteresse = tagsInteresse;  
            this.PaisResidencia = paisResidencia;
            this.Localidade = localidade;
            this.IntroductionRequests = introductionRequests;      
            this.Ligacoes=ligacoes;    
        }
    }
}