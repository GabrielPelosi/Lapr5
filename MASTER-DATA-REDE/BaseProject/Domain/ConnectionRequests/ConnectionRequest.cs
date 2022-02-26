using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.Domain.ConnectionRequests
{
    public class ConnectionRequest : Entity<ConnectionRequestId>, IAggregateRoot
    {
        public bool Active{ get;  private set; }
        public virtual Jogador Jogador { get ; private set; }


        public ConnectionRequest(){
            
        }
        public ConnectionRequest(Jogador jogador)
        {
            this.Id = new ConnectionRequestId(Guid.NewGuid());
            this.Jogador = jogador;
            this.Active = true;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}