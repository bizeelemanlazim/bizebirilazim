using System;
using BBL.Core.Utilities.Results;

namespace BBL.Core.Models.API.Base
{
    public class PaginationResult<TResult>: ApiResult<List<TResult>>
    {
        public long TotalCount { get; set; }
    }
}

