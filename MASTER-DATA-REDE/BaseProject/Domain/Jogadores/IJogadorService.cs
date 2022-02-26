using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Jogadores
{
    public interface IJogadorService{

        Task<JogadorDto> AddAsync(CreatingJogadorDto dto);

        Task<JogadorDto> GetByIdAsync(JogadorId id);

        Task<List<JogadorDto>> GetAllAsync();

        Task<JogadorDto> UpdateAsync(Guid id, JogadorDto dto);

        Task<EstadoHumorRespostaDto> UpdateMoodAsync(string id, string mood,string intensity);

        Task<List<JogadorDto>> GetAmigosEmComum(Guid requestingUserId, Guid objectiveUserId);
    }
}