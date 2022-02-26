using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

public class EstadoHumor :  IValueObject {

    public String Value {get;private set;}
    public String Intensity {get;private set;}

    public EstadoHumor(string mood){
        validateMood(mood);
        this.Value = mood;
    }
    public EstadoHumor(string mood,string intensity){
        validateMood(mood);
        this.Value = mood;
        this.Intensity = intensity;
    }

    public EstadoHumor(){

    }

    public void validateMood(string mood){
        Regex rxMoodOfPlayer = new Regex(@"Joyful|Distressed|Hopeful|Fearful|Relieve|Disappointed|Proud|Remorseful|Grateful|Angry|Alegre|Angustiado|Esperançoso|Medo|Aliviado|Decepcionado|Orgulhoso|Arrependido|Grato|Nervoso");
        if(!rxMoodOfPlayer.IsMatch(mood)){
            throw new BusinessRuleValidationException("ERROR! Please insert a valid mood.");
        }
    }

    public String EstadoHumorJogador(){
        return Value;
    }

    public override String ToString(){
        return Value + " " + Intensity == null ? "sem intensidade" :Intensity.ToString();
    }
}


}