using LearningTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LearningTracker.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<LearningItem> LearningItems { get; set; }
    }
}
