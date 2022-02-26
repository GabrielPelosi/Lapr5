using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;


namespace DDDSample1.Domain.Jogadores{

    public class Telefone : IValueObject {
        public string Value { get ; private set;}

        public Telefone(string telefone)
        {
            validatePhoneNumber(telefone);
            this.Value = telefone;
        }
        public Telefone(){
            
        }

        //inclui codigo de pais, sem necessidade de validação do formato especifco de cada país
        public void validatePhoneNumber(string phoneNumber){
            Regex rxPhoneNumber = new Regex(@"\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$");
            if (!String.IsNullOrEmpty(phoneNumber) && !rxPhoneNumber.IsMatch(phoneNumber.ToString())){
                throw new BusinessRuleValidationException("ERROR! Please insert a valid phone number.");
            }
        }

        public string NumTelefone(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

