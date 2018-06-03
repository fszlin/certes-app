using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using System;

namespace Certes.Api
{
    [AadAuthentication]
    public static class ClientConfigFunction
    {
        [FunctionName("config")]
        public static IActionResult Get(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req,
            TraceWriter log)
        {
            var clientId = Environment.GetEnvironmentVariable("Certes_Aad_ClientId") ??
                "c053d610-9b14-4579-bf93-2fc45064759b";
            return JsonUtil.Result(
                new
                {
                    AadClientId = clientId,
                    AadTenant = "certesapp.onmicrosoft.com",
                });
        }
    }
}
