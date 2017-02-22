using System;

namespace ServiceStack.React.Models
{
    [Route("/test")]
    public class TestModel : IReturn<bool>
    {
        public string TestParam { get; set; }
    }
}
