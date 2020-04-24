using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Helpers
{
    public static class Extentions
    {
        public static void AddApplicationError(this HttpResponse response,string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Controll-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Controll-Allow-Origin","*");
        }
    }
}
