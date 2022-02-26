using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Globalization;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorDto
    {
        public string Id { get; set; }
        public string Nome { get; set; } //alfanumérico, opcional, não pode conter espaços no ínicio
        public string Password { get; set; }
        public string DataNascimento { get; set; } //data, obrigatorio, idade minima para usar o sistema: 16 anos
        public string NumTelefone { get; set; } //opcional, com codigo do país
        public string Email { get; set; } //obrigatorio, atua como username, validar sintaxe de email
        public string DescBreve { get; set; } //opcional
        public string Avatar { get; set; } //opcional (mudar de string para imagem)
        public List<string> TagsInteresse { get; set; } //obrigatorio, lista de strings, case insensitive
        public string PaisResidencia { get; set; } //opcional, validar paises todos (195)
        public string Localidade { get; set; } //opcional, informação alfanumerica sem validação adicional
        public List<string> IntroductionRequests { get; set; }
        public List<string> Ligacoes { get; set; }
        public string Mood { get; set; }
        public string Intensity { get; set; }

        [JsonConstructor]
        public JogadorDto(string id, string nome, string password, string dataNascimento, string numTelefone, string email, string descBreve, string avatar, List<string> tagsInteresse, string paisResidencia, string localidade, List<string> introRequests, List<string> ligacoes, string mood, string intensity)
        {
            this.Id = id;
            this.Nome = nome;
            this.Password = password;
            this.DataNascimento = dataNascimento;
            this.NumTelefone = numTelefone;
            this.Email = email;
            this.DescBreve = descBreve;
            this.Avatar = avatar;
            this.TagsInteresse = tagsInteresse;
            this.PaisResidencia = paisResidencia;
            this.Localidade = localidade;
            this.IntroductionRequests = introRequests;
            this.Ligacoes = ligacoes;
            this.Mood = mood;
            this.Intensity = intensity;
        }
        public JogadorDto(string id, string mood)
        {
            this.Id = id;
            this.Mood = mood;

        }
    }

}