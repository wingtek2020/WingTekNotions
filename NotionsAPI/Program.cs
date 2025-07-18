using CNotionAPI.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore; 

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
  .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
  .AddEnvironmentVariables();

// Add services to the container.  

builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<NotionsDbContext>(options =>
  options.UseSqlServer(connectionString)); 

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle  
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
