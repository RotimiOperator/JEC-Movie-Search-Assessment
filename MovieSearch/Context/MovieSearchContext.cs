using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using MovieSearch.Models;
using Serilog;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.Metadata;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MovieSearch.Context
{
    public class MovieSearchContext : DbContext
    {
        public MovieSearchContext(DbContextOptions<MovieSearchContext> options)
            : base(options)
        {
        }

        public DbSet<Search> Search { get; set; } = null!;
        public DbSet<Movies> Movies { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Search>()
                .HasMany(e => e.Movies)
                .WithOne()
                .HasForeignKey(e => e.SearchId)
                .IsRequired();
        }
    }
}
