using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{
    public class EstadoHumorDto{

        public string Mood{ get; set; }

        public string Intensity{ get; set; }



        public EstadoHumorDto(string mood, string intensity){
            this.Mood = mood;
            this.Intensity = intensity;
        }

        

    }
}