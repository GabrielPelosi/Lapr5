using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Jogadores{

    public class Avatar : IValueObject {
        public string Value { get ; private set;}

        public Avatar(string avatar)
        {
            this.Value = avatar;
        }

        public Avatar(){
    
        }

        public string AvatarJogador(){
            return Value;
        }

        public override String ToString(){
            return Value;
        }
    
    }

}

