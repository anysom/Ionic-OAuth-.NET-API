using Microsoft.Owin.Security.OAuth;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AwesomeSourceWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            // IF needed, set the CORS option only for your client domain.
            // INSTALL the Microsoft.AspNet.WebApi.Cors package
            //var cors = new EnableCorsAttribute("http://localhost:61107", "*", "*");
            //config.EnableCors(cors);
        }
    }
}
