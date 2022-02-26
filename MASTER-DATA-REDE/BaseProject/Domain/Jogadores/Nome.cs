using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

    public class Nome : IValueObject {
        public String Value { get ; private set;}

        public Nome(string nome)
        {
            validateName(nome);
            this.Value = nome;
        }
        public Nome(){
            
        }

        //alfanumérico, não pode conter espaços no ínicio        
        public void validateName(string nameOfPlayer){
            Regex rxNameOfPlayer = new Regex(@"^[^\s][a-zA-Z0-9\s\u00C0-\u00FF]+$");
            if (!String.IsNullOrEmpty(nameOfPlayer) && !rxNameOfPlayer.IsMatch(nameOfPlayer)){
                throw new BusinessRuleValidationException("INVALID NAME! Player's name must be an alphanumeric and shouldn't start with a space.");
            }
            if (nameOfPlayer.Length > 101){
                throw new BusinessRuleValidationException("INVALID NAME! Name shouldn't be longer than 100 characters.");
            }
        }

        public String NomeJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

