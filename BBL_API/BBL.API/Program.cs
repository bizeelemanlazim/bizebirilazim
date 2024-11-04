using System.Reflection;

using Autofac;
using Autofac.Extensions.DependencyInjection;
using BBL.Business.DependencyResolvers.Autofac.API;
using BBL.Business.Helpers.Mapper;
using BBL.Core.DependencyResolvers;
using BBL.Core.Extensions;
using BBL.Core.Models.Application;
using BBL.Core.Utilities.IoC;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.Security.Encyption;
using BBL.DataAccess.EntityFramework.Context;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

#region Hosting Builder


builder.Host
    .UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureContainer<ContainerBuilder>(builder =>
    {
        builder.RegisterModule(new AutofacBusinessModuleAPI());
    });


#endregion

Debug.Write("heyyy");

#region Configuration Services

builder.Services.AddControllers()
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    opt.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                    opt.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
                });

builder.Services.AddScoped<BBLDbContextInitialiser>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowOrigin",
        builder =>
        {
            builder
                   .WithOrigins("https://app.bizebirilazim.com", "http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddDbContext<BBLContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("BBLConnection"));
});

builder.Services.AddIdentity<ApplicationUser, IdentityUserRole<string>>(opt =>
{
    opt.SignIn.RequireConfirmedEmail = true;
    opt.User.RequireUniqueEmail = true;
    opt.Password.RequireDigit = true;
    opt.Password.RequireLowercase = true;
    opt.Password.RequireUppercase = true;
    opt.Password.RequireNonAlphanumeric = true;
    opt.Password.RequiredLength = 6;
    opt.User.AllowedUserNameCharacters = null;
    opt.ClaimsIdentity.UserIdClaimType = JwtRegisteredClaimNames.Sub;

    opt.Tokens.PasswordResetTokenProvider = Microsoft.AspNetCore.Identity.TokenOptions.DefaultProvider;

})
    .AddRoles<ApplicationRole>()
    .AddEntityFrameworkStores<BBLContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
{
    options.TokenLifespan = TimeSpan.FromHours(2);
});

var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<BBL.Core.Utilities.Security.JWT.TokenOptions>();

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddEndpointsApiExplorer();

var swaggerEnabled = builder.Configuration.GetValue<bool>("SwaggerSettings:Enabled");
if (swaggerEnabled)
{
    builder.Services.AddSwaggerGen(
        gen =>
            {
                gen.SwaggerDoc("WebAPI_V1", new OpenApiInfo
                {
                    Version = "V1",
                    Title = "BizeBiriLazim_V1",
                    Description = "BizeBiriLazim_CRUD",
                    Contact = new OpenApiContact
                    {
                        Name = "Sefa Ozturk",
                        Email = "sefaozturk1992@gmail.com"
                    }
                });
                // var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                // var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                // gen.IncludeXmlComments(xmlPath);
            }

    );
}

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(opt =>
    {
        opt.RequireHttpsMetadata = false;
        opt.SaveToken = true;
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = tokenOptions.Issuer,
            ValidAudience = tokenOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = SecurityKeyHelper.CreateSecurityKey(tokenOptions.SecurityKey),
            ClockSkew = TimeSpan.Zero
        };
    });

#region APPLICATION CONFIGURATIONS
builder.Services.Configure<ApplicationSettingsModel>(builder.Configuration);
#endregion

#region API VERSIONING

/* builder.Services.AddApiVersioning(config =>
{
    config.DefaultApiVersion = new ApiVersion(1, 0);
    config.AssumeDefaultVersionWhenUnspecified = true;
    config.ReportApiVersions = true;
}); 

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});*/

#endregion

var coreModule = new CoreModule();

builder.Services.AddDependencyResolvers(builder.Configuration, new ICoreModule[] { coreModule });

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    //options.SuppressModelStateInvalidFilter = true;
    options.InvalidModelStateResponseFactory = actionContext =>
    {
        var errors = actionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .Select(e => $"{e.Key}: {string.Join(',', e.Value.Errors.Select(x => x.ErrorMessage))}");
        var result = new ApiResult
        {
            StatusCode = StatusCodes.Status400BadRequest,
            IsSuccess = false,
            Message = "Invalid model",
            Errors = errors
        };

        return new BadRequestObjectResult(result);
    };
});

builder.Services.AddAutoMapper(typeof(AutoMapperHelper));

#endregion

#region App Builder

var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//     var dbContext = scope.ServiceProvider.GetRequiredService<BBLContext>();
//     dbContext.Database.Migrate();
// }
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
}

app.ConfigureCustomExceptionMiddleware();

if (swaggerEnabled)
{
    app.UseSwagger();

    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/WebAPI_V1/swagger.json", "BBL.WebAPI v1");
        //c.DocExpansion(DocExpansion.None);
    });
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowOrigin");

app.UseCors(options =>
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();

app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
               Path.Combine(Directory.GetCurrentDirectory(), "Content")),
    RequestPath = "/Content"
});

app.MapControllers();

app.Run();

#endregion