using System;
using System.Collections.Generic;



namespace DDDSample1.Domain.IntroductionRequests
{
    public class CreatingIntroductionRequestAprovedDto
    {

        //futuramente serao trocados para objetos utilizadores
        public string RequestingUserID { get; private set; }
        public string ObjectiveUserID { get; private set; }

        public string BridgeUserText { get; private set; }

        public string ObjectiveUserText { get; private set; }

        public List<string> IntroductionRequestTags { get; private set; }

        public string ConnectionStrength { get; private set; }

        private CreatingIntroductionRequestAprovedDto()
        {

        }

        public CreatingIntroductionRequestAprovedDto(string requestingUserID,
                                                string objectiveUserID, string bridgeUserText,
                                                string objectiveUserText, List<string> introductionRequestTags,
                                                string connectionStrength)
        {

            this.RequestingUserID = requestingUserID;
            this.ObjectiveUserID = objectiveUserID;
            this.BridgeUserText = bridgeUserText;
            this.ObjectiveUserText = objectiveUserText;
            this.IntroductionRequestTags = introductionRequestTags;
            this.ConnectionStrength = connectionStrength;
        }
    }
}
