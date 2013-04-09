using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Booky.WebAPI.Models;
using Newtonsoft.Json.Linq;
//using System.Web.Http.Description;

namespace Booky.WebAPI.Controllers
{
    public class BookmarkController : ApiController
    {
        readonly BookyDbContext repository = new BookyDbContext();

        [HttpGet]
        public IQueryable<Bookmark> Bookmarks()
        {
            return repository.Bookmarks;
        }
        
        // GET HTTP method/verb - /api/bookmark/1
        //[ApiDoc("Gets a Bookmark by ID.")]
        //[ApiParameterDoc("id", "The ID of the Bookmark.")] 
        public Bookmark Get(int id)
        {
            var b = repository.Bookmarks.FirstOrDefault(o => o.Id == id);

            if (b != null) 
                return b;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        /// <summary>
        /// Creates a new Bookmark - POST HTTP method/verb - /api/defect
        /// </summary>
        /// <param name="bookmark"></param>
        /// <returns></returns> 
        public HttpResponseMessage Post(Bookmark bookmark)
        {
            //Create new bookmark
            repository.Bookmarks.Add(bookmark);
            repository.SaveChanges();

            //Create a new response with an HttpStatusCode of Created 201
            var response = Request.CreateResponse<Bookmark>(HttpStatusCode.Created, bookmark);
            return response;
        }

        /*****/////////////////////////////////////////////
        /** Another option is to return an object rather than a HttpResponseMessage (return a bookmark) Bookmark
        /*****/////////////////////////////////////////////
        //public Bookmark Post(Bookmark bookmark)
        //{
        //    repository.Bookmarks.Add(bookmark);
        //    repository.SaveChanges();
        //    return bookmark;
        //}

        /// <summary>
        /// Updates an existing Bookmark - PUT HTTP method/verb - /api/defect
        /// </summary>
        /// <param name="bookmark"></param>
        /// <returns></returns>
        public /*Bookmark*/ Put(Bookmark bookmark)
        {
            var existBookmark = repository.Bookmarks.FirstOrDefault(o => o.Id == bookmark.Id);
            existBookmark.Title = bookmark.Title;
            existBookmark.Url = bookmark.Url;
            existBookmark.Description = bookmark.Description;
            repository.SaveChanges();
            return existBookmark;
        }

        /// <summary>
        /// Delete an existing Bookmark - DELETE HTTP method/verb - /api/bookmark/1
        /// </summary>
        /// <param name="defect"></param>
        /// <returns></returns>
        public Bookmark Delete(int id)
        {
            var bookmark = repository.Bookmarks.FirstOrDefault(o => o.Id == id);
            repository.Bookmarks.Remove(bookmark);
            repository.SaveChanges();

            return bookmark;
        }
    }
}