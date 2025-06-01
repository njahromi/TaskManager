using HotChocolate;
using Microsoft.EntityFrameworkCore;

public class Mutation
{
    public async Task<TaskItem> CreateTask(
        [Service] TasksDbContext db,
        string title,
        string description)
    {
        var task = new TaskItem { Id = Guid.NewGuid().ToString(), Title = title, Description = description, Status = "Pending" };
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        return task;
    }

    public async Task<TaskItem?> UpdateTaskStatus(
        [Service] TasksDbContext db,
        [ID] string id,
        string status)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task == null) return null;
        task.Status = status;
        await db.SaveChangesAsync();
        return task;
    }

    public async Task<bool> DeleteTask(
        [Service] TasksDbContext db,
        [ID] string id)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task == null) return false;
        db.Tasks.Remove(task);
        await db.SaveChangesAsync();
        return true;
    }
} 