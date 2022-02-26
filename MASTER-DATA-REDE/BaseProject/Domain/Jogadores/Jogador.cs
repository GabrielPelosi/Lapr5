using System;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.ConnectionRequests;
using DDDSample1.Domain.Ligacoes;

namespace DDDSample1.Domain.Jogadores
{
    public class Jogador : Entity<JogadorId>, IAggregateRoot
    {
        public string Nome { get;  set; } //alfanumérico, opcional, não pode conter espaços no ínicio (validado)
        public string Password { get;  set; }
        public DataNascimento DataNascimento { get;  set; } //data, obrigatorio, idade minima para usar o sistema: 16 anos 
        public Telefone NumTelefone { get;  set; } //opcional, com codigo do país (validado)
        public Email Email { get;  set; } //obrigatorio, atua como username, validar sintaxe de email (validado)
        public DescBreve DescBreve { get;  set; } //opcional, maximo de 400 caracteres (validado)
        public Avatar Avatar { get;  set; } //opcional 
        public List<Tag> TagsInteresse { get;  set; } //obrigatorio, lista de strings, case insensitive (validado)
        public Pais PaisResidencia { get;  set; } //opcional, validar paises todos (195)
        public Localidade Localidade { get;  set; } //opcional, informação alfanumerica sem validação adicional (validado)
        public virtual List<IntroductionRequest> IntroductionRequests { get;  set; } 
        public virtual List<ConnectionRequest> ConnectionRequests { get;  set; } 

        public virtual List<Ligacao> Ligacoes { get;  set; } 
        public bool Active { get; private set; }
        public EstadoHumor Mood{ get; set;}

        public Jogador()
        {
            //this.IntroductionRequests = new List<IntroductionRequest>();
            this.Active = true;
        }

        // Construtor com todos os dados
        public Jogador(string nome, string password, string dataNascimento, string numTelefone, string email, string descBreve, string avatar, 
        List<string> tagsInteresse, string paisResidencia, string localidade, List<IntroductionRequest> introRequests, List<Ligacao> lig)
        {
            var dt = dataNascimento.Split('/');
            this.Id = new JogadorId(Guid.NewGuid());
            this.Nome = nome;
            this.Password = password;
            this.DataNascimento = new DataNascimento(new DateTime(Int32.Parse(dt[2]),Int32.Parse(dt[0]),Int32.Parse(dt[1])));
            this.NumTelefone = new Telefone(numTelefone);
            this.Email = new Email(email);
            this.DescBreve = new DescBreve(descBreve);
            this.Avatar = new Avatar(avatar);
            this.TagsInteresse = new List<Tag>();
            foreach(string tag in tagsInteresse){
                this.TagsInteresse.Add(new Tag(tag));
            }
            this.PaisResidencia = new Pais(paisResidencia);
            this.Localidade = new Localidade(localidade);
            this.IntroductionRequests = introRequests;
            this.Active = true;
            this.Ligacoes=lig;
        }

        /* update methods for all player fields */
        public void ChangeName(string nomeJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the name to an inactive player.");
            this.Nome = nomeJogador;
        }

        public void ChangeDateOfBirth(string dataNascJogador)
        {
            var dt = dataNascJogador.Split('/');
            Console.WriteLine(dt);
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date of birth to an inactive player.");
            this.DataNascimento = new DataNascimento(new DateTime(Int32.Parse(dt[2]),Int32.Parse(dt[0]),Int32.Parse(dt[1])));
        }

        public void ChangeEmail(string emailJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the email to an inactive player.");
            this.Email = new Email(emailJogador);
        }

        public void ChangePhoneNumber(string telefoneJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the phone number to an inactive player.");
            this.NumTelefone = new Telefone(telefoneJogador);
        }

        public void ChangeDescription(string descJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive player.");
            this.DescBreve = new DescBreve(descJogador);
        }

        public void ChangeAvatar(string avatarJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the avatar to an inactive player.");
            this.Avatar = new Avatar(avatarJogador);
        }

        public void ChangeCountry(string paisJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the country to an inactive player.");
            this.PaisResidencia = new Pais(paisJogador);
        }

        public void ChangeCity(string localidadeJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the city to an inactive player.");
            this.Localidade = new Localidade(localidadeJogador);
        }

        public void ChangeTags(List<string> tagsJogador)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the tags to an inactive player.");
            this.TagsInteresse = new List<Tag>();
            foreach(string tag in tagsJogador){
                this.TagsInteresse.Add(new Tag(tag));
            }
        }
        public void ChangeMood(string mood, string intensity){
            if(!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the mood to an inactive player.");
            this.Mood = new EstadoHumor(mood,intensity);
}

        public void MarkAsInative()
        {
            this.Active = false;
        }

        public override string ToString()
        {
            return "Jogador: " + Nome;
        }

        public void addIntroRequest(IntroductionRequest introRequest){
            this.IntroductionRequests.Add(introRequest);
        }

        public void addConnectionRequest(ConnectionRequest connectionRequest){
            this.ConnectionRequests.Add(connectionRequest);
        }

        public void addLigacao(Ligacao lig){
            this.Ligacoes.Add(lig);
        }
    }
}