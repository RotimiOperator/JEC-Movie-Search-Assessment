using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace MovieSearch.Models
{
    public class Movies
    {
        public long Id { get; set; }
        public long SearchId { get; set; }
        public string? Title { get; set; }
        public string? Poster { get; set; }
        public string? Plot { get; set; }
        public string? ImdbID { get; set; }
        public decimal? ImdbRating { get; set; }
        public string? Year { get; set; }
        public string? Type { get; set; }
    }
    public class APIMovies
    {
        public List<Movies>? Search { get; set; }
    }
}
