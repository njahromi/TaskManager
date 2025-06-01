using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public class Query
{
    [GraphQLName("getAllTasks")]
    public async Task<List<TaskItem>> GetAllTasks([Service] TasksDbContext db) =>
        await db.Tasks.ToListAsync();
} 