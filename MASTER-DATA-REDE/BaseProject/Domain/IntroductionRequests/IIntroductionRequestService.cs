using System.Threading.Tasks;
using System.Collections.Generic;
using System;


namespace DDDSample1.Domain.IntroductionRequests
{
    public interface IIntroductionRequestService
    {
         Task<IntroductionRequestDto> addAsync(CreatingIntroductionRequestDto createIntroductionRequestDto);

         Task<List<IntroductionRequestDto>> getAllPendingIntroductionRequestsFromUser(Guid id);

         Task<List<IntroductionRequestDto>> getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(Guid id);

         Task<IntroductionRequestDto> UpdateStatusARAsync(Guid id, IntroductionRequestBooleanDto flag);

         Task<IntroductionRequestDto> UpdateStatusAsync(Guid id, IntroductionRequestBooleanDto flag);

         Task<IntroductionRequestDto> criarPedidoAprovadoPeloSistema(CreatingIntroductionRequestAprovedDto createIntroductionRequestDto);

         Task<IntroductionRequestDto> criarPedidoQueSeraAprovadoPeloSistema(CreatingIntroductionRequestDto createIntroductionRequestDto);
    }
}