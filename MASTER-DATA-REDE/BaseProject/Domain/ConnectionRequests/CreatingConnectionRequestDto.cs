using System;
using System.Collections.Generic;
using DDDSample1.Domain.IntroductionRequests;

namespace DDDSample1.Domain.ConnectionRequests
{
    public class CreatingConnectionRequestDto
    {
        public virtual IntroductionRequest IntroRequestId { get; private set; }

        private CreatingConnectionRequestDto(){ 

        }

    }
}