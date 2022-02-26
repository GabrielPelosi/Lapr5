using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

    public class Localidade : IValueObject {
        public String Value {get;private set;}

        public Localidade(string localidade)
        {
            validateCity(localidade);
            this.Value = localidade;
        }
        public Localidade(){
            
        }

        //validacao alfanumerica
        public void validateCity(string cityOfPlayer){
            Regex rxCityOfPlayer = new Regex(@"^[a-zA-Z0-9\s\u00C0-\u00FF]*$");
            if (!String.IsNullOrEmpty(cityOfPlayer) && !rxCityOfPlayer.IsMatch(cityOfPlayer)){
                throw new BusinessRuleValidationException("ERROR! Please insert a valid city.");
            }
        }

        public String LocalidadeJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

