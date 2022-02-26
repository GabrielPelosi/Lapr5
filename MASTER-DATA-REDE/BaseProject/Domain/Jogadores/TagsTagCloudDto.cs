namespace DDDSample1.Domain.Jogadores
{
    public class TagsTagCloudDto
    {
        
        public string Value { get; set; } 
        public int Counter { get; set; }


        public TagsTagCloudDto(string value, int counter){
            this.Value = value;
            this.Counter = counter;
        }
    }
}