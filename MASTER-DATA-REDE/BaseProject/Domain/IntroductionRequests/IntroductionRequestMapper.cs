using DDDSample1.Domain.Jogadores;
using System;


namespace DDDSample1.Domain.IntroductionRequests
{
    public class IntroductionRequestMapper
    {

        public static IntroductionRequest creatingToIntroductionRequestDomainAprovado(CreatingIntroductionRequestAprovedDto createIntroductionRequestDto,
        Jogador requestingUser, Jogador objectiveUser)
        {
            return new IntroductionRequest(requestingUser,objectiveUser,
         createIntroductionRequestDto.BridgeUserText, createIntroductionRequestDto.ObjectiveUserText, createIntroductionRequestDto.IntroductionRequestTags, createIntroductionRequestDto.ConnectionStrength);
        }
        public static IntroductionRequest creatingToIntroductionRequestDomain(CreatingIntroductionRequestDto createIntroductionRequestDto,
        Jogador requestingUser, Jogador bridgeUser, Jogador objectiveUser)
        {
            return new IntroductionRequest(requestingUser,  bridgeUser, objectiveUser,
         createIntroductionRequestDto.BridgeUserText, createIntroductionRequestDto.ObjectiveUserText, createIntroductionRequestDto.IntroductionRequestTags, createIntroductionRequestDto.ConnectionStrength);
        }

        public static IntroductionRequestDto toIntroductionRequestDto(IntroductionRequest introRequest)
        {
            return new IntroductionRequestDto(
            introRequest.Id.AsString(),
            introRequest.RequestingUser== null ? "Erro ao buscar solicitante":introRequest.RequestingUser.Nome.ToString(), 
            introRequest.BridgeUser== null ? "Sistema introdutor" : introRequest.BridgeUser.Nome.ToString(),
            introRequest.ObjectiveUser.Nome.ToString(),
            introRequest.BridgeUserText == null ? "" : introRequest.BridgeUserText.ToString(),
            introRequest.ObjectiveUserText.ToString(),
            introRequest.ConnectionStrength,
            introRequest.IntroductionRequestTags.ConvertAll<string>(tag => tag.ToString()),
            introRequest.IntroductionRequestStatusValue);
        }

         public static IntroductionRequestDto toIntroductionRequestDtoPending(IntroductionRequest introRequest)
        {
            return new IntroductionRequestDto(
            introRequest.Id.AsString(),
            introRequest.RequestingUser== null ? "Erro ao buscar solicitante":introRequest.RequestingUser.Nome.ToString(), 
            introRequest.RequestingUser == null ? "sem avatar" : (introRequest.RequestingUser.Avatar == null ? "avatar" : introRequest.RequestingUser.Avatar.ToString()),
            introRequest.BridgeUser == null ? "sem avatar" : (introRequest.BridgeUser.Avatar == null ? "avatar" : introRequest.BridgeUser.Avatar.ToString()),
            introRequest.ObjectiveUser == null ? "sem avatar" : (introRequest.ObjectiveUser.Avatar == null ? "avatar" : introRequest.ObjectiveUser.Avatar.ToString()),
            introRequest.BridgeUser== null ? "Sistema introdutor" : introRequest.BridgeUser.Nome.ToString(),
            introRequest.ObjectiveUser.Nome.ToString(),
            introRequest.BridgeUserText == null ? "" : introRequest.BridgeUserText.ToString(),
            introRequest.ObjectiveUserText.ToString(),
            introRequest.ConnectionStrength,
            introRequest.IntroductionRequestTags.ConvertAll<string>(tag => tag.ToString()),
            introRequest.IntroductionRequestStatusValue);
        }
    }
}