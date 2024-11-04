using BBL.Core.Utilities.Results;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Security;
using System.Text.Json;

namespace BBL.Core.Middleware.HandleMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;


        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(httpContext, e);
            }
        }

        private async Task HandleExceptionAsync(HttpContext httpContext, Exception e)
        {
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            object apiResult;
            if (e.GetType() == typeof(ValidationException))
            {
                apiResult = new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = "Validation Exception",
                    Errors = e.ToErrorList()
                };
                httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else if (e.GetType() == typeof(ApplicationException))
            {
                apiResult = new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = "Application Exception",
                    InternalMessage = e.Message
                };
                httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else if (e.GetType() == typeof(UnauthorizedAccessException))
            {
                apiResult = new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = "Application Exception",
                    InternalMessage = e.Message
                };
                httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else if (e.GetType() == typeof(SecurityException))
            {
                apiResult = new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = "Application Exception",
                    InternalMessage = e.Message
                };
                httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
            else
            {
                apiResult = new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = "Belirlenemeyen Hata",
                    InternalMessage = e.Message
                };
                httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(apiResult).ToLowerInvariant());
        }
    }
}