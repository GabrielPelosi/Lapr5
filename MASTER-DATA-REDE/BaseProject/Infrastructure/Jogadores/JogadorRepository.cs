using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;


namespace DDDSample1.Infrastructure.Jogadores{
    public class JogadorRepository : BaseRepository<Jogador, JogadorId>, IJogadorRepository{
    private readonly DbSet<Jogador> _objs;
        public JogadorRepository(DDDSample1DbContext context):base(context.Jogadores){
            this._objs=context.Jogadores;
        }


        public async Task<List<Jogador>> GetListSugestaoJogadores(Jogador jog){
            List<string> list = jog.TagsInteresse.ConvertAll<string>(tag => tag.Value);
            return await this._objs
                        .Where(o => o.TagsInteresse.Any(t1 => list.Contains(t1.Value)))
                        .Where(o => o.Id!=jog.Id)
                        .ToListAsync();
        }

        public async Task<Jogador> GetRequestingUser(IntroductionRequest ir){//devolve requesting user de um dado pedido de introdução
            
            return await this._objs
                        .Where(o => o.IntroductionRequests.Any(t1 => o.IntroductionRequests.Contains(ir)))
                        .FirstOrDefaultAsync();
        }

        public async Task<List<Jogador>> GetAmigosEmComum(Jogador requestingUser, Jogador objectiveUser){
            return await this._objs
                        .Where(o => 
                                o.Ligacoes.Any(o => o.Jogador1.Id == (requestingUser.Id)) &&
                                o.Ligacoes.Any(o => o.Jogador1.Id == (objectiveUser.Id)))
                        //.Where(o => o.Id!=requestingUser.Id)
                        //.Where(o => o.Id!=objectiveUser.Id)
                        .ToListAsync();
        }

        public async Task<Jogador> SearchPlayerByName (string nome){
            return await this._objs
                    .Where(o => o.Nome == nome)
                    .FirstOrDefaultAsync();
        }


    }
}