using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.IntroductionRequests
{

    public class IntroductionRequestBooleanDto{


        public bool Flag{ get; set;}

        public IntroductionRequestBooleanDto(bool flag){
            this.Flag = flag;
        }
    }
}