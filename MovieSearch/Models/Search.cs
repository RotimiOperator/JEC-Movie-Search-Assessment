using Microsoft.EntityFrameworkCore;

namespace MovieSearch.Models
{
    public class Search
    {
        public long Id { get; set; }
        public string? Keyword { get; set; }
        public ICollection<Movies>? Movies { get; } = new List<Movies>();
        public DateTime CreatedAt { get; set; }
    }
    public class AllSearch
    {
        public Search? Search { get; set; }
        public List<Search>? Searches { get; set; }
    }
}
