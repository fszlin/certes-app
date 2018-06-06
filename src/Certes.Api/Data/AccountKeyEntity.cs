using Microsoft.WindowsAzure.Storage.Table;

namespace Certes.Api.Data
{
    public class AccountKeyEntity : TableEntity
    {
        public byte[] AccountKey { get; set; }
    }
}
