using DependencyInjection;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

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
