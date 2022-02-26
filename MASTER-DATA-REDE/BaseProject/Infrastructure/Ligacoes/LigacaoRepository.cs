using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Jogadores;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Ligacoes;


namespace DDDSample1.Infrastructure.Ligacoes
{
    public class LigacaoRepository : BaseRepository<Ligacao, LigacaoID>, ILigacaoRepository{

    private readonly DbSet<Ligacao> _objs;
        public LigacaoRepository(DDDSample1DbContext context):base(context.Ligacoes){
            this._objs=context.Ligacoes;
        }

        public async Task<List<Ligacao>> FindAllConnections(Jogador user){
            return await this._objs
                    .Where(x => x.Jogador1.Id == user.Id)
                    .ToListAsync();
        }
    }
}