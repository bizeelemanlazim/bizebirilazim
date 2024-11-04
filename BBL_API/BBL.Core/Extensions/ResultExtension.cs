using System;
using BBL.Core.Models.API.Base;
using BBL.Core.Utilities.Results;

namespace BBL
{
    public static class PaginationResultExtension
    {
        public static PaginationResult<TSource> ToPagination<TSource>(this IQueryable<TSource> source,
            SkipTakeReq paging)
        {
            if (source == null)
                throw new ArgumentNullException(nameof(source));

            if (paging == null)
                throw new ArgumentNullException(nameof(paging));

            var serviceModel = new PaginationResult<TSource>
            {
                TotalCount = source.Count(),
            };

            serviceModel.Data = source
                .Skip(paging.Skip)
                .Take(paging.Take)
                .ToList();

            return serviceModel;
        }
    }
}