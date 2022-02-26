using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Jogadores{

    public class DescBreve : IValueObject {
        public String Value {get;private set;}

        public DescBreve(string desc)
        {
            validateBriefDescription(desc);
            this.Value = desc;
        }

        public DescBreve(){
            
        }

        //texto livre, maximo 4000 caracteres
        public void validateBriefDescription(string briefDescOfPlayer){
            if(!String.IsNullOrEmpty(briefDescOfPlayer) && briefDescOfPlayer.Length > 4001){ 
                throw new BusinessRuleValidationException("ERROR! Invalid number of characters.");
            }
        }

        public String DescBreveJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

