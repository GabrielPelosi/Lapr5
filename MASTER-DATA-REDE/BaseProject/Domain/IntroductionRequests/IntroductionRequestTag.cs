using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.IntroductionRequests
{
    public class IntroductionRequestTag : IValueObject
    {
        public string Tag { get; set; }

        public IntroductionRequestTag(){

        }

        public IntroductionRequestTag(string tag){
            this.Tag = tag;
        }

        public override string ToString() {
            return this.Tag;
        }
    }
}