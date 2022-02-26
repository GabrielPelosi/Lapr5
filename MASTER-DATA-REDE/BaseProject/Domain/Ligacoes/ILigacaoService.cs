using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using System;


namespace DDDSample1.Domain.Ligacoes
{
    public interface ILigacaoService
    {

        Task<List<LigacaoDto>> GetAllAsync();
        Task<LigacaoDto> addAsync(Jogador objUser, Jogador reqUSer, List<string> tags, string forca);
        Task<LigacaoDto> updateTagsForca(Guid id, LigacaoDto lig);

        Task<List<LigacaoDto>> getAllUserConnections(Guid id);

    }
}