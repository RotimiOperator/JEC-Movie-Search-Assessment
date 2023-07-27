using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieSearch.Context;
using MovieSearch.Models;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;

namespace MovieSearch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieSearchController : ControllerBase
    {
        private readonly MovieSearchContext _context;
        private readonly ILogger<MovieSearchController> _logger;

        public MovieSearchController(MovieSearchContext context, ILogger<MovieSearchController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet]
        public async Task<ActionResult<Movies>> Get()
        {
            var movies = new Movies();

            return movies;
        }

        [HttpPost("movies")]
        public async Task<ActionResult<AllSearch>> PostSearch([FromBody] Search search)
        {
            var searchResult = await _context.Search
                                  .Where(i => i.Keyword == search.Keyword)
                                  .Include(o => o.Movies)
                                  .OrderBy(o => o.Id)
                                  .FirstOrDefaultAsync();

            if (searchResult == null)
            {
                string apiUrl = $"http://www.omdbapi.com/?apikey=f5cf185a&s={search.Keyword}";

                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync(apiUrl);
                    if (response.IsSuccessStatusCode)
                    {
                        var data = await response.Content.ReadAsStringAsync();
                        APIMovies searchMovies = JsonConvert.DeserializeObject<APIMovies>(data);

                        Search newSearch = new Search()
                        {
                            Keyword = search.Keyword,
                            CreatedAt = DateTime.Now,
                        };
                        _context.Search.Add(newSearch);
                        await _context.SaveChangesAsync();
                        search = await _context.Search
                                          .Where(i => i.Keyword == search.Keyword)
                                          .OrderBy(o => o.Id)
                                          .FirstOrDefaultAsync();


                        List<Movies> newMovies = new List<Movies>();
                        foreach (var movie in searchMovies.Search)
                        {
                            newMovies.Add(new Movies()
                            {
                                SearchId = search.Id,
                                Title = movie.Title,
                                Poster = movie.Poster,
                                Plot = movie.Plot,
                                ImdbID = movie.ImdbID,
                                ImdbRating = movie.ImdbRating,
                                Year = movie.Year,
                                Type = movie.Type,
                            });
                        }
                        _context.Movies.AddRange(newMovies);

                        await _context.SaveChangesAsync();
                    }
                }
            }


            var searches = await _context.Search.OrderByDescending(o => o.CreatedAt).Take(5).ToListAsync();

            searchResult = await _context.Search
                              .Where(i => i.Keyword == search.Keyword)
                              .Include(o => o.Movies)
                              .OrderBy(o => o.Id)
                              .FirstOrDefaultAsync();

            var allSearch = new AllSearch()
            {
                Search = searchResult,
                Searches = searches,
            };
            return allSearch;
        }

        [HttpPost("movies/{ImdbID}")]
        public async Task<ActionResult<Movies>> PostMovie(string ImdbID)
        {
            string apiUrl = $"http://www.omdbapi.com/?apikey=f5cf185a&i={ImdbID}";

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    Movies searchMovie = JsonConvert.DeserializeObject<Movies>(data);
                    return Ok(searchMovie);
                }
            }

            return NotFound();
        }

    }
}
