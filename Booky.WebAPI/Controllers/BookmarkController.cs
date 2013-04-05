using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Booky.WebAPI.Models;
using Newtonsoft.Json.Linq;

namespace Booky.WebAPI.Controllers
{
    public class BookmarkController : ApiController
    {
        readonly BookyDbContext _contextProvider = new BookyDbContext();

        [HttpGet]
        public IQueryable<Bookmark> Bookmarks()
        {
            return _contextProvider.Bookmarks;
        }

        // GET /api/bookmark/5
        public Bookmark Get(int id)
        {
            var b = _contextProvider.Bookmarks.Where(o => o.Id == id).FirstOrDefault();

            if (b != null) 
                return b;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }
   }
}