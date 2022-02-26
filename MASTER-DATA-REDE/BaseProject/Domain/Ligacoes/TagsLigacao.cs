namespace DDDSample1.Domain.Ligacoes
{
    public class TagsLigacao
    {
        public string Tag { get; set; }

        public TagsLigacao(){

        }

        public TagsLigacao(string tag){
            this.Tag = tag;
        }

        public override string ToString() {
            return this.Tag;
        }
    }
}