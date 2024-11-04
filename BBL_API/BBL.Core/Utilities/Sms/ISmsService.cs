using System;
using BBL.Core.Utilities.Results;

namespace BBL.Core.Utilities.Sms
{
    public interface ISmsService
    {
        Task<IResult<string>> Send(SmsMessage sms);
    }
}

