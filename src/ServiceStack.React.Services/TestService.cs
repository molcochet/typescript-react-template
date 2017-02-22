
using ServiceStack;
using ServiceStack.React.Models;

namespace Northwind.ServiceInterface
{
    public class TestService : Service
    {
        public bool Any(TestModel request)
        {
            return true;
        }
    }
}
