using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Booky.WebAPI.Models
{
    public class BookyDatabaseInitializer : DropCreateDatabaseIfModelChanges<BookyDbContext>
    {
        protected override void Seed(BookyDbContext context)
        {
            // Add defects test data
        }
    }
}
