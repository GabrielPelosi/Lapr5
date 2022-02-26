using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using System;


namespace DDDSample1.Domain.Ligacoes {

    public class LigacaoService: ILigacaoService {

        private readonly IUnitOfWork _unitOfWork;

        private readonly ILigacaoRepository _repo;

        private readonly IJogadorRepository _jogador_repo;

        
        public LigacaoService(IUnitOfWork _unitOfWork,ILigacaoRepository _repo, IJogadorRepository _jogador_repo){

            this._unitOfWork = _unitOfWork;
            this._repo = _repo;
            this._jogador_repo=_jogador_repo;
        }

        public async Task<List<LigacaoDto>> GetAllAsync(){
            var list = await this._repo.GetAllAsync();

            foreach (Ligacao l in list) {
                Console.WriteLine("=> " + l.ToString());
            }
            List<LigacaoDto> listDto = list.ConvertAll<LigacaoDto>(ligacao => LigacaoMapper.toLigacaoDto(ligacao));
            
            return listDto;
        }

        public async Task<LigacaoDto> addAsync(Jogador ObjectiveUser, Jogador RequestingUser, List<string> tags, string forca) {
            var lig1 = LigacaoMapper.creatingToLigacaoDomain(RequestingUser, ObjectiveUser, tags, forca);
            var lig2 = LigacaoMapper.creatingToLigacaoDomain(ObjectiveUser, RequestingUser, tags, forca);
            await _repo.AddAsync(lig1);
            await _repo.AddAsync(lig2);
            ObjectiveUser.addLigacao(lig1);
            RequestingUser.addLigacao(lig2);
            await this._unitOfWork.CommitAsync();
            return LigacaoMapper.toLigacaoDto(lig1);
        }

        public async Task<LigacaoDto> updateTagsForca(Guid id, LigacaoDto lig){

            var l = await this._repo.GetByIdAsync(new LigacaoID(id));

            if (l==null)
                return null;

            l.ChangeForca(lig.ForcaLigacao);

            l.ChangeTags(lig.TagsLigacao);

            await this._unitOfWork.CommitAsync();

            return LigacaoMapper.toLigacaoDto(l);
        }

    public async Task<List<LigacaoDto>> getAllUserConnections(Guid id)
        {
            var jogador = await _jogador_repo.GetByIdAsync(new JogadorId(id));
            if (jogador == null) throw new BusinessRuleValidationException("Usuário não encontrado");
            var intros = await _repo.FindAllConnections(jogador);
            List<LigacaoDto> dtos = intros.ConvertAll<LigacaoDto>(intro => LigacaoMapper.toLigacaoDto(intro));
            return dtos;
        }
    }
}