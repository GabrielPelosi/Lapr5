using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{

    public class EstadoHumorRespostaDto{

        public string Id{ get; set;}

        public string Mood{ get; set;}

        public string Nome{ get; set;}

        public string Intensity { get; set; }

        public EstadoHumorRespostaDto(string id, string nome, string mood, string intensity){
            this.Id = id;
            this.Nome = nome;
            this.Mood = mood;
            this.Intensity = intensity;
        }
    }
}