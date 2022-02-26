using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

    public class Tag : IValueObject {
        public String Value {get;private set;}

        public Tag(string tag)
        {
            //validateTag(tag);
            this.Value = tag;
        }

        public Tag(){
            
        }

        //min 1 caractere, max 255 caracteres, case insensitive
        public void validateTag(string tag){
            if(tag.Length < 0 || tag.Length > 255){ 
                throw new BusinessRuleValidationException("ERROR! Invalid number of characters.");
            }
            Regex rxTag = new Regex(@"^([a-zA-Z0-9]+,?s*)+$");
            if (!rxTag.IsMatch(tag)){
                throw new BusinessRuleValidationException("INVALID TAG! Tag must be an alphanumeric.");
            }

        }

        public String TagsJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

