using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Booky.WebAPI.Models
{
    public class Bookmark
    {
        public int Id { get; set; }

        [Required, MaxLength(128)]
        public string Title { get; set; }

        [Required, MaxLength(512)]
        public string Url { get; set; }

        [Required, MaxLength(128)]
        public string Description { get; set; }
    }
}