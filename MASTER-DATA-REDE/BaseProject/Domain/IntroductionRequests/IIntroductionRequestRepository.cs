using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;



namespace DDDSample1.Domain.IntroductionRequests
{
    public interface IIntroductionRequestRepository:IRepository<IntroductionRequest,IntroductionRequestId>
    {
         Task<List<IntroductionRequest>> GetPedidosIntroducaoPendente(Jogador requestingUser);

         Task<List<IntroductionRequest>> FindApprovedIntroRequestToBeAccepted(Jogador objectiveUser);
    }
}