namespace DDDSample1.Domain.Jogadores
{
    public class TamanhoRedeDto
    {
        
        public int Tamanho { get; set; }
        public string Jogador { get; set; }


        public TamanhoRedeDto(int tamanho, string jogador){
            this.Tamanho = tamanho;
            this.Jogador = jogador;
        }
    }
}