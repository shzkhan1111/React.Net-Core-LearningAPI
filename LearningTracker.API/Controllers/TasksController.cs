using LearningTracker.API.Data;
using LearningTracker.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;

namespace LearningTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        private static List<LearningItem> tasks = new List<LearningItem>
        {
            new LearningItem {Id = 1 , Title = "Learn React" , IsCompleted = false},
            new LearningItem {Id = 2 , Title = "Practice Redux" , IsCompleted = true}
        };
        public TasksController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningItem>>> GetTasks()
        {
            return await _context.LearningItems.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LearningItem>> GetTask(int id)
        {
            var task = await _context.LearningItems.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return task;

        }

        [HttpPost]
        public async Task<ActionResult<LearningItem>> PostTask(LearningItem task)
        {
            _context.LearningItems.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, LearningItem task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.LearningItems.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.LearningItems.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/complete")]
        public async Task<IActionResult> CompleteTask(int id)
        {
            var task = await _context.LearningItems.FindAsync(id);
            if (task == null)
                return NotFound();

            task.IsCompleted = true; 
            _context.SaveChanges();

            return Ok(task);
        }

        private bool TaskExists(int id)
        {
            return Utilities.TaskExists(_context, id);
            //return _context.LearningItems.Any(e => e.Id == id);
        }


    }
}
