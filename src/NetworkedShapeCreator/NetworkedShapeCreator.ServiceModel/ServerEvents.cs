using System.IO;
using ServiceStack;
using ServiceStack.Web;

namespace NetworkedShapeCreator.ServiceModel
{
    [Route("/publish-channel/{Channel}")]
    public class PublishToChannel : IReturnVoid, IRequiresRequestStream
    {
        public string Channel { get; set; }
        public string Selector { get; set; }
        public Stream RequestStream { get; set; }
    }

    [Route("/send-user/{To}")]
    public class SendUser : IReturnVoid, IRequiresRequestStream
    {
        public string To { get; set; }
        public string Selector { get; set; }
        public Stream RequestStream { get; set; }
    }
}