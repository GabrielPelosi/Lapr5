using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.IntroductionRequests;

namespace DDDSample1.Domain.ConnectionRequests
{
    public class ConnectionRequestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConnectionRequestRepository _repo;
        private readonly IIntroductionRequestRepository _introReqRepo;


        public ConnectionRequestService(IUnitOfWork unitOfWork, IConnectionRequestRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<ConnectionRequestDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<ConnectionRequestDto> listDto = list.ConvertAll<ConnectionRequestDto>(cr => new ConnectionRequestDto{Id = cr.Id.AsString()});

            return listDto;
        }

        public async Task<ConnectionRequestDto> GetByIdAsync(ConnectionRequestId id)
        {
            var connectionRequest = await this._repo.GetByIdAsync(id);
            
            if(connectionRequest == null)
                return null;

            return new ConnectionRequestDto{Id = connectionRequest.Id.AsString()};
        }

        public async Task<ConnectionRequestDto> AddAsync(CreatingConnectionRequestDto cdto)
        {
            var introRequest = await _introReqRepo.GetByIdAsync(new IntroductionRequestId(cdto.IntroRequestId.ToString()));

            if(introRequest == null){
                return null;
            }

            //var connectReq = ConnectionRequestMapper.toDomain(cdto, introRequest.RequestingUser); 
            //await _repo.AddAsync(connectReq);

            //adiciona pedido de ligacao ao requesting user pelo pedido de introducao que tem o id do jogador
            //introRequest.RequestingUser.addConnectionRequest(connectReq); 
            await this._unitOfWork.CommitAsync();

            return null; /*ConnectionRequestMapper.toConnectionRequestDto(connectReq);*/

        }

        public async Task<ConnectionRequestDto> UpdateAsync(ConnectionRequestDto dto)
        {
            var connectionRequest = await this._repo.GetByIdAsync(new ConnectionRequestId(dto.Id)); 

            if (connectionRequest == null)
                return null;   

            // change all field methods
            
            await this._unitOfWork.CommitAsync();

            return new ConnectionRequestDto { };
        }

        public async Task<ConnectionRequestDto> InactivateAsync(ConnectionRequestId id)
        {
            var connectionRequest = await this._repo.GetByIdAsync(id); 

            if (connectionRequest == null)
                return null;   

            // change all fields
            connectionRequest.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new ConnectionRequestDto { };
        }
    }
}