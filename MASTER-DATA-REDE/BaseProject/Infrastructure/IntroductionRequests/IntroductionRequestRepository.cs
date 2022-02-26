using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Jogadores;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;


namespace DDDSample1.Infrastructure.IntroductionRequests
{
    public class IntroductionRequestRepository : BaseRepository<IntroductionRequest, IntroductionRequestId>, IIntroductionRequestRepository
    {
        private readonly DbSet<IntroductionRequest> _objs;

         public IntroductionRequestRepository(DDDSample1DbContext context):base(context.IntroductionRequests)
        {
            this._objs=context.IntroductionRequests;
        }

        public async Task<List<IntroductionRequest>> GetPedidosIntroducaoPendente(Jogador bridgeUser){
            
            return await this._objs
                        .Where(o => o.IntroductionRequestStatusValue == IntroductionRequestStatus.SENT.ToString())
                        .Where(o => o.BridgeUser.Id == bridgeUser.Id)
                        //.Include(x => x.BridgeUser)
                        //.Include(x => x.ObjectiveUser)
                        //.Include(x => x.RequestingUser)
                        .ToListAsync();
        }

        public async Task<List<IntroductionRequest>> FindApprovedIntroRequestToBeAccepted(Jogador objectiveUser){//busca os pedidos de intro aprovados pelo bridge user pendentes de ser aceito pelo objective user
            return await this._objs
                    .Where(x => x.IntroductionRequestStatusValue == IntroductionRequestStatus.BRIDGE_USER_ACCEPTED.ToString())
                    .Where(x => x.ObjectiveUser.Id == objectiveUser.Id)
                    //.Include(x => x.BridgeUser)
                    //.Include(x => x.ObjectiveUser)
                    //.Include(x => x.RequestingUser)
                    .ToListAsync();
        }
    }
}