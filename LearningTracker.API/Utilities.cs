using LearningTracker.API.Data;
using Microsoft.EntityFrameworkCore;

namespace LearningTracker.API
{
    public class Utilities
    {
        public static bool TaskExists(AppDbContext _context , int id)
        {
            return _context.LearningItems.Any(e => e.Id == id);
        }
    }
}
