using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;

namespace DDDSample1.Domain.IntroductionRequests {
    
    public class IntroductionRequest : Entity<IntroductionRequestId>, IAggregateRoot {

        public virtual Jogador RequestingUser { get; set; }
        public virtual Jogador BridgeUser { get;  set; }
        public virtual Jogador ObjectiveUser { get;  set; }

        public BridgeUserText BridgeUserText { get;  set;}

        public ObjectiveUserText ObjectiveUserText { get;  set;}

        public List<IntroductionRequestTag> IntroductionRequestTags { get;  set;}

        public string ConnectionStrength { get;  set;}

        public string IntroductionRequestStatusValue { get;  set; }

        public IntroductionRequest() {
            //this.RequestingUser = new Jogador();
            //this.BridgeUser = new Jogador();
            //this.ObjectiveUser = new Jogador();
            
        }

        public IntroductionRequest(Jogador requestingUser, Jogador bridgeUser, Jogador objectiveUser, 
        string bridgeUserText, string objectiveUserText, List<string> connectionsTags, string connectionStrength){
            if (bridgeUser == null) throw new BusinessRuleValidationException("Usuário intermediario não existe no sistema!");
            if (objectiveUser == null) throw new BusinessRuleValidationException("Usuário objectivo não existe no sistema!");
            
            this.Id = new IntroductionRequestId(Guid.NewGuid());
            this.RequestingUser=requestingUser;
            this.BridgeUser = bridgeUser;
            this.ObjectiveUser = objectiveUser;
            this.BridgeUserText = new BridgeUserText(bridgeUserText);
            this.ObjectiveUserText = new ObjectiveUserText(objectiveUserText);
            this.IntroductionRequestStatusValue = IntroductionRequestStatus.SENT.ToString();
            this.IntroductionRequestTags = new List<IntroductionRequestTag>();
            foreach(string tag in connectionsTags){
                this.IntroductionRequestTags.Add(new IntroductionRequestTag(tag));
            }
            this.ConnectionStrength=connectionStrength;
        }

        //Pedido ja introduzido pelo sistema
        public IntroductionRequest(Jogador requestingUser, Jogador objectiveUser, 
        string bridgeUserText, string objectiveUserText, List<string> connectionsTags, string connectionStrength){
            //if (bridgeUser == null) throw new BusinessRuleValidationException("Usuário intermediario não existe no sistema!");
            if (objectiveUser == null) throw new BusinessRuleValidationException("Usuário objectivo não existe no sistema!");
            if(requestingUser == null) throw new BusinessRuleValidationException("Usuário solicitante não existe no sistema!");
            this.Id = new IntroductionRequestId(Guid.NewGuid());
            this.RequestingUser=requestingUser;
            this.BridgeUser = null;
            this.ObjectiveUser = objectiveUser;
            this.BridgeUserText = new BridgeUserText(bridgeUserText);
            this.ObjectiveUserText = new ObjectiveUserText(objectiveUserText);
            this.IntroductionRequestStatusValue = IntroductionRequestStatus.BRIDGE_USER_ACCEPTED.ToString();
            this.IntroductionRequestTags = new List<IntroductionRequestTag>();
            foreach(string tag in connectionsTags){
                this.IntroductionRequestTags.Add(new IntroductionRequestTag(tag));
            }
            this.ConnectionStrength=connectionStrength;
        }

        public void ApproveIntroRequest()
        {
            this.IntroductionRequestStatusValue = IntroductionRequestStatus.BRIDGE_USER_ACCEPTED.ToString();
            
        }

        public void DisapproveIntroRequest()
        {
            this.IntroductionRequestStatusValue = IntroductionRequestStatus.BRIDGE_USER_REJECTED.ToString();
            
        }

        public void AcceptIntroRequest()
        {
            this.IntroductionRequestStatusValue = IntroductionRequestStatus.OBJECTIVE_USER_ACCEPTED.ToString();
            
        }

        public void RejectIntroRequest()
        {
            this.IntroductionRequestStatusValue = IntroductionRequestStatus.OBJECTIVE_USER_REJECTED.ToString();
            
        }

        public override string ToString(){
            return  "Usuario intermediario: " + BridgeUser == null ? BridgeUser.Nome : "Sistema" + " sua mensagem: " + BridgeUserText == null ? BridgeUserText.ToString():"Sem texto" + " Status do pedido: " + IntroductionRequestStatusValue;

        }
    }
}