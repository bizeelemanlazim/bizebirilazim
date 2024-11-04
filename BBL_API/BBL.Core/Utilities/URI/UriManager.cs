using BBL.Core.Domain.Page;
using Microsoft.AspNetCore.WebUtilities;

namespace BBL.Core.Utilities.URI
{
    public class UriManager : IUriService
    {
        private readonly String _baseUri;

        public UriManager(String baseUri)
        {
            _baseUri = baseUri;
        }

        /// <summary>
        /// Get page uri from request
        /// </summary>
        /// <param name="filter">Pagination filter; page size, page number</param>
        /// <param name="route">API endpoint without base uri</param>
        /// <returns>Request URI with pagination</returns>
        public Uri GeneratePageRequestUri(PaginationFilter filter, String route)
        {
            var endpointUri = new System.Uri(String.Concat(_baseUri, route));
            var modifiedUri =
                QueryHelpers.AddQueryString(endpointUri.ToString(), "pageNumber", filter.PageNumber.ToString());
            modifiedUri = QueryHelpers.AddQueryString(modifiedUri, "pageSize", filter.PageSize.ToString());
            return new System.Uri(modifiedUri);
        }

        public Uri CreateRequestUri(String route)
        {
            var endpointUri = new System.Uri(String.Concat(_baseUri, route));

            return endpointUri;
        }

        public Uri CreateRequestUri(String route, String baseUrl)
        {
            var endpointUri = new System.Uri(String.Concat(baseUrl, route));
            return endpointUri;
        }
    }
}
