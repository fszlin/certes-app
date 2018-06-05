using Certes.Acme;
using Certes.Acme.Resource;
using Certes.Api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using System.Linq;
using System.Threading.Tasks;

namespace Certes.Api
{
    [AadAuthentication]
    public static class OrderFunction
    {
        [FunctionName("NewOrder")]
        public static async Task<IActionResult> NewOrder(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "new-order")]HttpRequest req,
            [Table("AccountKey")] CloudTable accountKeys,
            [Table("Order")] CloudTable orders,
            TraceWriter log)
        {
            var user = req.HttpContext.User;
            if (!user.Identity.IsAuthenticated)
            {
                return new UnauthorizedResult();
            }

            var query = new TableQuery<AccountKeyEntity>()
                .Where(TableQuery.GenerateFilterCondition(nameof(AccountKeyEntity.RowKey), QueryComparisons.Equal, user.Identity.Name))
                .Take(1);

            var results = await accountKeys.ExecuteQuerySegmentedAsync(query, null);
            var accountKey = results.Results.FirstOrDefault();

            var json = await req.ReadAsStringAsync();
            var order = JsonConvert.DeserializeObject<Order>(json);

            var ctx = new AcmeContext(WellKnownServers.LetsEncryptV2, KeyFactory.FromDer(accountKey.AccountKey));
            var orderCtx = await ctx.NewOrder(order.Identifiers.Select(o => o.Value).ToArray());
            var orderEntity = new OrderEntity
            {
                RowKey = orderCtx.Location.AbsoluteUri,
                PartitionKey = user.Identity.Name,
            };

            await orders.ExecuteAsync(TableOperation.InsertOrReplace(orderEntity));
            return new OkResult();
        }
    }
}
