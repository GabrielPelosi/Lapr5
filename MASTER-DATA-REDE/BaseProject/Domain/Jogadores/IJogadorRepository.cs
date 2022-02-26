using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace DDDSample1.Domain.Jogadores
{

    public interface IJogadorRepository: IRepository<Jogador,JogadorId>{
        Task<List<Jogador>> GetListSugestaoJogadores(Jogador jog);

         Task<Jogador> GetRequestingUser(IntroductionRequest ir);

         Task<List<Jogador>> GetAmigosEmComum(Jogador requestingUser, Jogador objectiveUser);


         Task<Jogador> SearchPlayerByName(string nome);

    }

}