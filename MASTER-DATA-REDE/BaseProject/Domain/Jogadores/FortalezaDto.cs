namespace DDDSample1.Domain.Jogadores
{
    public class FortalezaDto
    {
        
        public int ValorFortaleza { get; set; }
        public string NomeJogador { get; set; }


        public FortalezaDto(int valorFortaleza, string nomeJogador){
            this.ValorFortaleza = valorFortaleza;
            this.NomeJogador = nomeJogador;
        }
    }
}