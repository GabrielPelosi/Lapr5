using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;



namespace DDDSample1.Domain.Ligacoes
{
    public interface ILigacaoRepository:IRepository<Ligacao,LigacaoID>
    {
         Task<List<Ligacao>> FindAllConnections(Jogador jogador);

    }
}