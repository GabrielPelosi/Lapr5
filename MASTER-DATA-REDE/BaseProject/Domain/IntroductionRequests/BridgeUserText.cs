using DDDSample1.Domain.Shared;


namespace DDDSample1.Domain.IntroductionRequests
{
    public class BridgeUserText : IValueObject
    {

        public string Text { get; set; }

        public BridgeUserText() {

        }

        public BridgeUserText(string text) {
            //ValidateBridgeUserText(text);
            this.Text = text;
        }

        public override string ToString() {
            return this.Text;
        }

        /*
        public void ValidateBridgeUserText(string text){
            if(true){
                throw new BusinessRuleValidationException();
            }
        }
        */
        
    }
}