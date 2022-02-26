using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Jogadores;
using System;


namespace DDDSample1.Domain.ConnectionRequests
{
    public class ConnectionRequestMapper
    {
        public static ConnectionRequest toDomain(CreatingConnectionRequestDto createDto, Jogador jogador){
            return new ConnectionRequest(jogador);
        }

        public static ConnectionRequestDto toConnectionRequestDto(ConnectionRequest connectReq){
            return new ConnectionRequestDto();
            
        }
    }
}