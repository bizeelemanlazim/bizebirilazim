using Autofac;
using BBL.DataAccess.EntityFramework.Context;
using BBL.DataAccess.EntityFramework.UnityOfWork;

namespace BBL.Business.DependencyResolvers.Autofac.Base
{
    public class AutofacBusinessModuleBase : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            #region DATA ACCESS

            builder.RegisterType<BBLContext>()
                .AsSelf()
                .InstancePerLifetimeScope();

            builder.RegisterType<UowBBL>().As<IUowBBL>()
                   .AsSelf()
                   .InstancePerLifetimeScope();

            #endregion
        }
    }
}
