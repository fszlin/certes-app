using Certes.Acme;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace Certes.Api
{
    [AadAuthentication]
    public static class OrderFunction
    {
        [FunctionName("Order")]
        public static IActionResult Post(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequest req,
            TraceWriter log)
        {
            var ctx = new AcmeContext(WellKnownServers.LetsEncryptV2);
            return new OkResult();
        }
    }
}
