using System.Threading.Tasks;
using System.Collections.Generic;
using System;


namespace DDDSample1.Domain.ConnectionRequests
{
    public interface IConnectionRequestService
    {
         Task<ConnectionRequestDto> addAsync(CreatingConnectionRequestDto createConnectionRequestDto);

    }
}