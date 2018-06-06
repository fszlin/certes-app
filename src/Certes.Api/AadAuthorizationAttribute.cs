using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace Certes.Api
{
    public class AadAuthenticationAttribute : FunctionInvocationFilterAttribute
    {
        private const string Tenant = "certesapp.onmicrosoft.com";
        private const string ClientId = "acb2ad49-ba0d-478c-a23a-f6854bd3610f";

        public override async Task OnExecutingAsync(
            FunctionExecutingContext executingContext,
            CancellationToken cancellationToken)
        {
            var req = executingContext.Arguments.Values.OfType<HttpRequest>().FirstOrDefault();
            var authzHeader = req.Headers["Authorization"].FirstOrDefault();

            if (authzHeader.StartsWith("Bearer ", StringComparison.Ordinal))
            {
                var accessToken = authzHeader.Substring("Bearer ".Length);
                req.HttpContext.User = await ValidateJwtToken(accessToken, cancellationToken);
            }

            await base.OnExecutingAsync(executingContext, cancellationToken);
        }

        public static async Task<ClaimsPrincipal> ValidateJwtToken(string token, CancellationToken cancellationToken)
        {
            var endpoint = $"https://login.microsoftonline.com/{Tenant}/v2.0/.well-known/openid-configuration?p=B2C_1_susi";

            var configManager = new ConfigurationManager<OpenIdConnectConfiguration>(endpoint, new OpenIdConnectConfigurationRetriever());
            var config = await configManager.GetConfigurationAsync(cancellationToken);

            var validationParameters = new TokenValidationParameters()
            {
                ValidAudience = ClientId,
                ValidIssuer = config.Issuer,
                IssuerSigningKeys = config.SigningKeys,
                ValidateLifetime = true,
                NameClaimType = "name",
            };

            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();

            return jwtSecurityTokenHandler.ValidateToken(token, validationParameters, out _);
        }
    }
}
