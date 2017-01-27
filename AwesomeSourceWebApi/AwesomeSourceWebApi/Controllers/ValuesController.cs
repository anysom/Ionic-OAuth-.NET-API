using AwesomeSourceWebApi.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace AwesomeSourceWebApi.Controllers
{
    [Authorize]
    public class ValuesController : ApiController
    {
        private ApplicationDbContext _context;

        public ValuesController()
        {
            _context = new ApplicationDbContext();
        }
        // GET api/values
        public IEnumerable<string> Get()
        {
            //var myCharacters = _context.Characters.Where(g => g.Owner == _context.u)
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
