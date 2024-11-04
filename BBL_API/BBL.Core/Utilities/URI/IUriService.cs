using BBL.Core.Domain.Page;

namespace BBL.Core.Utilities.URI
{
    public interface IUriService
    {
        Uri GeneratePageRequestUri(PaginationFilter filter, String route);

        Uri CreateRequestUri(String route);
        Uri CreateRequestUri(String route, String baseUrl);
    }
}
