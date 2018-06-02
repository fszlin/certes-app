using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Certes.Api
{
    public static class JsonUtil
    {
        public static JsonSerializerSettings Settings { get; } = CreateSettings();

        public static JsonSerializerSettings CreateSettings() =>
            new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                NullValueHandling = NullValueHandling.Ignore,
                MissingMemberHandling = MissingMemberHandling.Ignore,
            };

        public static IActionResult Result(object obj) =>
            new ContentResult
            {
                Content = JsonConvert.SerializeObject(obj, Formatting.None, Settings),
                ContentType = "application/json",
                StatusCode = 200,
            };
    }
}
