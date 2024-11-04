using BBL.Core.Constants;

namespace BBL.Core.Utilities.Results
{
    public class ApiResult<T>
    {
        public T Data { get; set; }
        public int StatusCode { get; set; } = Microsoft.AspNetCore.Http.StatusCodes.Status200OK;
        public bool IsSuccess { get; set; } = true;
        public string Message { get; set; } = ResultMessages.Successful;
        public string InternalMessage { get; set; }
        public IEnumerable<string> Errors { get; set; } = new List<string>();
    }

    public class ApiResult : ApiResult<object>
    {
        public ApiResult()
        {

        }
    }
}
