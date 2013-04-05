using System;
using System.Web.Http;
using System.Web.Optimization;

namespace Booky.WebAPI
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            GlobalConfiguration.Configuration.MessageHandlers.Add(new CorsHandler());
        }
    }
}