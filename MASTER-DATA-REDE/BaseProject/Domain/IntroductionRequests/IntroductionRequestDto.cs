using System;
using System.Collections.Generic;


namespace DDDSample1.Domain.IntroductionRequests
{
    public class IntroductionRequestDto
    {
        public string Id { get; set; }
        public string RequestingUserName { get; set; }
        public string BridgeUserName { get; set; }
        public string ObjectiveUserName { get; set; }
        public string ConnectionStrength { get; set; }

        public List<string> IntroductionTags { get; set; }

        public string BridgeUserText { get; set; }

        public string ObjectiveUserText { get; private set;}

        public string Status { get; set; }

        public string ReqUserAvatar { get; set; }

        public string BridgeUserAvatar { get; set; }

        public string ObjUserAvatar { get; set; }


        public IntroductionRequestDto(){

        }

        public IntroductionRequestDto(string id, string requestingUserName, string bridgeUserName, 
        string objectiveUserName, string bridgeUserText, string objectiveUserText, string connectionStrength, List<string> introductionRequestTags,
        string status){

            this.Id = id;
            this.RequestingUserName = requestingUserName;
            this.BridgeUserName=bridgeUserName;
            this.ObjectiveUserName = objectiveUserName;
            this.BridgeUserText = bridgeUserText;
            this.ObjectiveUserText=objectiveUserText;
            this.ConnectionStrength = connectionStrength;
            this.IntroductionTags= introductionRequestTags;
            this.Status = status;
        }

        public IntroductionRequestDto(string id, string requestingUserName, string reqUserAvatar, string briUserAvatar, string objUserAvatar, string bridgeUserName, 
        string objectiveUserName, string bridgeUserText, string objectiveUserText, string connectionStrength, List<string> introductionRequestTags,
        string status){

            this.Id = id;
            this.RequestingUserName = requestingUserName;
            this.ReqUserAvatar = reqUserAvatar;
            this.BridgeUserAvatar = briUserAvatar;
            this.ObjUserAvatar = objUserAvatar;
            this.BridgeUserName=bridgeUserName;
            this.ObjectiveUserName = objectiveUserName;
            this.BridgeUserText = bridgeUserText;
            this.ObjectiveUserText=objectiveUserText;
            this.ConnectionStrength = connectionStrength;
            this.IntroductionTags= introductionRequestTags;
            this.Status = status;
        }


       public override String ToString(){
                return this.BridgeUserText + " " + this.ObjectiveUserText;
        }
    }
}