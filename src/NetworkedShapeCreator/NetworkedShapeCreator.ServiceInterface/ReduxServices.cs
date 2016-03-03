using NetworkedShapeCreator.ServiceModel;
using ServiceStack;

namespace NetworkedShapeCreator.ServiceInterface
{
    public class ReduxServices : Service
    {
        public IServerEvents ServerEvents { get; set; }

        public void Any(PublishToChannel request)
        {
            var msg = request.RequestStream.ReadFully().FromUtf8Bytes();
            ServerEvents.NotifyChannel(request.Channel, request.Selector, msg);
        }

        public void Any(SendUser request)
        {
            var msg = request.RequestStream.ReadFully().FromUtf8Bytes();
            ServerEvents.NotifyUserId(request.To, request.Selector, msg);
        }
    }
}