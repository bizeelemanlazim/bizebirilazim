using BBL.Core.Middleware.HandleMiddleware;
using Microsoft.AspNetCore.Builder;

namespace BBL.Core.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
