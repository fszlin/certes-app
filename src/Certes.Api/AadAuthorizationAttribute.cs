using Microsoft.Azure.WebJobs.Host;
using System.Threading;
using System.Threading.Tasks;

namespace Certes.Api
{
    public class AadAuthenticationAttribute : FunctionInvocationFilterAttribute
    {
        public override Task OnExecutingAsync(FunctionExecutingContext executingContext, CancellationToken cancellationToken)
        {
            // AAD bearer token validation
            return base.OnExecutingAsync(executingContext, cancellationToken);
        }
    }
}
