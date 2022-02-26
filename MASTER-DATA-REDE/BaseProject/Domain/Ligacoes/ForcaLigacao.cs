using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Ligacoes{

public class ForcaLigacao :  IValueObject {

    public String Value {get; set;}

    public ForcaLigacao() {

    }
    public ForcaLigacao(string strength){
        this.Value = strength;
    }
    
    public String ForcaLigacaoRelacao(){
        return Value;
    }

    public override String ToString(){
        return Value;
    }
}
}