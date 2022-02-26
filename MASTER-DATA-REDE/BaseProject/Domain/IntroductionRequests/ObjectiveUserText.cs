using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.IntroductionRequests
{
    public class ObjectiveUserText : IValueObject
    {

        public string Text {get; private set;}

        public ObjectiveUserText(){

        }

        public ObjectiveUserText(string text){
            this.Text = text;
        }

         public override string ToString() {
            return this.Text;
        }
        
    }
}