using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

    public class Email : IValueObject {
        public string Value { get ; private set;}

        public Email(string email)
        {
            isEmail(email);
            this.Value = email;
        }
        public Email(){
            
        }

        /* validar sintaxe do email */
        public void isEmail(string emailOfPlayer){
            Regex rxEmailOfPlayer = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!rxEmailOfPlayer.IsMatch(emailOfPlayer)){
                throw new BusinessRuleValidationException("ERROR! Invalid email format.");
            }
        }

        public string EmailJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

