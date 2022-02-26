using System;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Jogadores{

    public class Password : IValueObject {
        public string Value { get ; private set;}

        public Password(string password)
        {
            this.Value = password;
        }
        public Password(){            
        }
        public string PlayerPassword(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

