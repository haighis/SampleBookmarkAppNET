using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using Booky.WebAPI.Models;

namespace Booky.WebAPI
{
    public class BookyDbContext : DbContext 
    {
        public BookyDbContext()
            : base(nameOrConnectionString: "Booky") { }

        static BookyDbContext()
        {
            Database.SetInitializer(new BookyDatabaseInitializer());
            System.Diagnostics.Trace.WriteLine("Sample data created");
            System.Diagnostics.Debug.WriteLine("Sample data created");
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            Database.SetInitializer<BookyDbContext>(null);

           // modelBuilder.Configurations.Add(new BookmarkConfiguration());
        }

        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}