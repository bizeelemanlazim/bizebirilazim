using BBL.Core.ApiDoc;
using BBL.Core.Middleware.Caching;
using BBL.Core.Middleware.Caching.Microsoft;
using BBL.Core.Utilities.IoC;
using BBL.Core.Utilities.Mail;
using BBL.Core.Utilities.Sms;
using BBL.Core.Utilities.URI;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Configuration;
using System.Diagnostics;

namespace BBL.Core.DependencyResolvers
{
    public class CoreModule : ICoreModule
    {
        public void Load(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMemoryCache();
            services.AddSingleton<ICacheManager, MemoryCacheManager>();
            services.AddSingleton<IMailService, MailManager>();
            services.AddSingleton<IEmailConfiguration, EmailConfiguration>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<Stopwatch>();

            services.Configure<EmailConfiguration>(configuration.GetSection("EmailConfiguration"));
            services.Configure<SmsConfiguration>(configuration.GetSection("SmsConfiguration"));
            services.AddTransient<ISmsService, SmsManager>();

            services.AddSingleton<IUriService>(o =>
            {
                var accessor = o.GetRequiredService<IHttpContextAccessor>();
                var request = accessor.HttpContext?.Request;
                var uri = string.Concat(request?.Scheme, "://", request?.Host.ToUriComponent(), request?.PathBase);
                return new UriManager(uri);
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(SwaggerMessages.Version, new OpenApiInfo
                {
                    Version = SwaggerMessages.Version,
                    Title = SwaggerMessages.Title,
                    Description = SwaggerMessages.Description
                    // TermsOfService = new Uri(SwaggerMessages.TermsOfService),
                    // Contact = new OpenApiContact
                    // {
                    //    Name = SwaggerMessages.ContactName,
                    // },
                    // License = new OpenApiLicense
                    // {
                    //    Name = SwaggerMessages.LicenceName,
                    // },
                });
                c.OperationFilter<AddAuthHeaderOperationFilter>();
                //c.SchemaFilter<EnumSchemaFilter>();
                c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    Description = "`Token only!!!` - without `Bearer_` prefix",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Scheme = "bearer"
                });
            });
        }
    }
}
