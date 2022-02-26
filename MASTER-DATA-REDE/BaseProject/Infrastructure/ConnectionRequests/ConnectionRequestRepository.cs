using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.ConnectionRequests;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace DDDSample1.Infrastructure.ConnectionRequests
{

public class ConnectionRequestRepository : BaseRepository<ConnectionRequest, ConnectionRequestId>, IConnectionRequestRepository
    {
    
        public ConnectionRequestRepository(DDDSample1DbContext context):base(context.ConnectionRequests)
        {
           
        }
    }
}