namespace DDDSample1.Domain.IntroductionRequests
{
    public enum IntroductionRequestStatus
    {
        SENT, 
        BRIDGE_USER_ACCEPTED, 
        BRIDGE_USER_REJECTED, 
        SYSTEM_REJECTED,
        SYSTEM_ACCEPTED,
        OBJECTIVE_USER_ACCEPTED,
        OBJECTIVE_USER_REJECTED,   
    }
}