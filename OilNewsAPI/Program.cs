using OilNewsAPI.Database.Interfaces;
using OilNewsAPI.Database.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<INewsRepository, NewsRepository>();

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
