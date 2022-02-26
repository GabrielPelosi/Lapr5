using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.ConnectionRequests
{
    public class ConnectionRequestId : EntityId
    {

        public ConnectionRequestId(String value):base(value)
        {

        }

        public ConnectionRequestId(Guid value):base(value)
        {

        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        override
        public String AsString(){
            return (String) base.Value;
        }
    }
}