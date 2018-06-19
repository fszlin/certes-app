using System;
using DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

namespace Certes.Api
{
    public class ServiceProviderBuilder : IServiceProviderBuilder
    {
        public IServiceProvider BuildServiceProvider()
        {
            var services = new ServiceCollection();

            return services.BuildServiceProvider(true);
        }
    }
}
