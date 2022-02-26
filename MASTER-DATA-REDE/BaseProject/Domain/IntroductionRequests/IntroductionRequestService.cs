using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Ligacoes;
using System;


namespace DDDSample1.Domain.IntroductionRequests
{

    public class IntroductionRequestService : IIntroductionRequestService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IIntroductionRequestRepository _repo;

        private readonly IJogadorRepository _jogador_repo;

        private readonly ILigacaoService _ligacao_svc;

        public IntroductionRequestService(IUnitOfWork _unitOfWork, IIntroductionRequestRepository _repo,
        IJogadorRepository _jogador_repo, ILigacaoService _ligacao_svc)
        {

            this._unitOfWork = _unitOfWork;
            this._repo = _repo;
            this._jogador_repo = _jogador_repo;
            this._ligacao_svc = _ligacao_svc;

        }

        public async Task<IntroductionRequestDto> addAsync(CreatingIntroductionRequestDto createIntroductionRequestDto)
        {
            var requestingUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.RequestingUserID));
            var bridgeUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.BridgeUserID));
            var objectiveUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.ObjectiveUserID));
            var introReq = IntroductionRequestMapper.creatingToIntroductionRequestDomain(createIntroductionRequestDto, requestingUser, bridgeUser, objectiveUser);
            await _repo.AddAsync(introReq);
            requestingUser.addIntroRequest(introReq);
            await this._unitOfWork.CommitAsync();
            return IntroductionRequestMapper.toIntroductionRequestDto(introReq);
        }

        public async Task<IntroductionRequestDto> criarPedidoAprovadoPeloSistema(CreatingIntroductionRequestAprovedDto createIntroductionRequestDto)
        {
            var requestingUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.RequestingUserID));
            //var bridgeUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.BridgeUserID)); 
            var objectiveUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.ObjectiveUserID));
            var introReq = IntroductionRequestMapper.creatingToIntroductionRequestDomainAprovado(createIntroductionRequestDto, requestingUser, objectiveUser);
            await _repo.AddAsync(introReq);
            requestingUser.addIntroRequest(introReq);
            await this._unitOfWork.CommitAsync();
            return IntroductionRequestMapper.toIntroductionRequestDto(introReq);
        }

        public async Task<IntroductionRequestDto> criarPedidoQueSeraAprovadoPeloSistema(CreatingIntroductionRequestDto createIntroductionRequestDto)
        {
            var requestingUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.RequestingUserID));
            var bridgeUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.BridgeUserID));
            var objectiveUser = await _jogador_repo.GetByIdAsync(new JogadorId(createIntroductionRequestDto.ObjectiveUserID));
            var introReq = IntroductionRequestMapper.creatingToIntroductionRequestDomain(createIntroductionRequestDto, requestingUser, bridgeUser, objectiveUser);
            Random rnd = new Random();
            int num = rnd.Next();
            if(num % 2 == 0){
                introReq.ApproveIntroRequest();
            }else{
                introReq.DisapproveIntroRequest();
            }
            await _repo.AddAsync(introReq);
            requestingUser.addIntroRequest(introReq);
            await this._unitOfWork.CommitAsync();
            return IntroductionRequestMapper.toIntroductionRequestDto(introReq);
        }

        public async Task<List<IntroductionRequestDto>> getAllPendingIntroductionRequestsFromUser(Guid id)
        {
            var requestingUser = await _jogador_repo.GetByIdAsync(new JogadorId(id));
            if (requestingUser == null) throw new BusinessRuleValidationException("Usuário não encontrado");
            var intros = await _repo.GetPedidosIntroducaoPendente(requestingUser);
            List<IntroductionRequestDto> dtos = intros.ConvertAll<IntroductionRequestDto>(intro => IntroductionRequestMapper.toIntroductionRequestDtoPending(intro));
            return dtos;
        }

        public async Task<List<IntroductionRequestDto>> getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(Guid id)
        {
            var objectiveUser = await _jogador_repo.GetByIdAsync(new JogadorId(id));
            if (objectiveUser == null) throw new BusinessRuleValidationException("Usuário não encontrado");
            var intros = await _repo.FindApprovedIntroRequestToBeAccepted(objectiveUser);
            List<IntroductionRequestDto> dtos = intros.ConvertAll<IntroductionRequestDto>(intro => IntroductionRequestMapper.toIntroductionRequestDtoPending(intro));
            return dtos;
        }



        //metodo update estado do pedido de introducao pelo id 
        //aceitar pedido de introducao > buscar o PI por id > mudar estado do PI > criar pedido de ligacao
        public async Task<IntroductionRequestDto> UpdateStatusAsync(Guid id, IntroductionRequestBooleanDto flag)
        {
            var req = await this._repo.GetByIdAsync(new IntroductionRequestId(id));

            if (req == null)
                return null;

            if (flag.Flag == true)
            {
                req.ApproveIntroRequest();
            }
            else
            {
                req.DisapproveIntroRequest();
            }

            await this._unitOfWork.CommitAsync();

            return IntroductionRequestMapper.toIntroductionRequestDto(req);
        }

        public async Task<IntroductionRequestDto> UpdateStatusARAsync(Guid id, IntroductionRequestBooleanDto flag)
        {
            var req = await this._repo.GetByIdAsync(new IntroductionRequestId(id));

            if (req == null)
            {
                return null;
            }

            if (req.IntroductionRequestStatusValue.Equals(IntroductionRequestStatus.BRIDGE_USER_ACCEPTED.ToString()))
            {
                if (flag.Flag == true)
                {
                    req.AcceptIntroRequest();
                    var reqUser = await _jogador_repo.GetRequestingUser(req);
                    if (reqUser == null)
                    {
                        return null;
                    }
                    List<string> tags = req.IntroductionRequestTags.ConvertAll<string>(tag => tag.ToString());
                    await _ligacao_svc.addAsync(req.ObjectiveUser, reqUser, tags, req.ConnectionStrength);
                }
                else
                {
                    req.RejectIntroRequest();
                }
            }

            await this._unitOfWork.CommitAsync();

            return IntroductionRequestMapper.toIntroductionRequestDto(req);
        }
    }
}