using ServiceStack.React.Models;

namespace ServiceStack.React.Services
{
    public class TestService : Service
    {
        public bool Any(TestModel request)
        {
            return true;
        }
    }
}
