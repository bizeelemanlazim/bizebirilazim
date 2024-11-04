using Autofac;
using Autofac.Extras.DynamicProxy;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.API;
using BBL.Business.DependencyResolvers.Autofac.Base;
using BBL.Business.Helpers.Abstract;
using BBL.Business.Helpers.Concrete;
using BBL.Core.Utilities.Interceptors;
using BBL.Core.Utilities.Security.JWT;
using Castle.DynamicProxy;

namespace BBL.Business.DependencyResolvers.Autofac.API
{
    public class AutofacBusinessModuleAPI : AutofacBusinessModuleBase
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            #region API BUSINESS

            builder.RegisterType<AuthService>().As<IAuthService>();
            builder.RegisterType<JwtHelper>().As<ITokenHelper>();
            builder.RegisterType<EmployerService>().As<IEmployerService>();
            builder.RegisterType<EmployeeService>().As<IEmployeeService>();
            builder.RegisterType<UtilitiesService>().As<IUtilitiesService>();
            builder.RegisterType<FileService>().As<IFileService>();
            builder.RegisterType<UtilityHelper>();
            #endregion

            #region ASSEMBLY

            var assembly = System.Reflection.Assembly.GetExecutingAssembly();

            builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces()
                .EnableInterfaceInterceptors(new ProxyGenerationOptions()
                {
                    Selector = new AspectInterceptorSelector()
                }).InstancePerDependency();

            #endregion

            #region HELPERS

            builder.RegisterType<EmailService>().As<IEmailService>();

            #endregion
        }
    }
}