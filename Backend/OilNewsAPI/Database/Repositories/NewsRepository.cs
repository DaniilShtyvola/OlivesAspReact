using Dapper;
using System.Data.SqlClient;
using OilNewsAPI.Database.Interfaces;
using OilNewsAPI.Database.Models;

namespace OilNewsAPI.Database.Repositories
{
    public class NewsRepository : INewsRepository
    {
        private readonly IConfiguration _config;

        public NewsRepository(IConfiguration config)
        {
            _config = config;
        }

        private string GetConnectionString()
        {
            return _config.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<News>> GetAllAsync()
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.QueryAsync<News>("SELECT * FROM News");
        }

        public async Task<News> GetByIdAsync(int id)
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.QueryFirstOrDefaultAsync<News>("SELECT * FROM News WHERE Id = @Id", new { Id = id });
        }

        public async Task<int> CreateAsync(News news)
        {
            using var connection = new SqlConnection(GetConnectionString());
            var sql = "INSERT INTO News (Title, Content, Icon, Publisher, PublisherIcon, PublishDate) " +
                      "OUTPUT INSERTED.Id " +
                      "VALUES (@Title, @Content, @Icon, @Publisher, @PublisherIcon, @PublishDate)";
            return await connection.QuerySingleAsync<int>(sql, news);
        }

        public async Task<int> UpdateAsync(News news)
        {
            using var connection = new SqlConnection(GetConnectionString());
            var sql = "UPDATE News SET Title = @Title, Content = @Content, Icon = @Icon, Publisher = @Publisher, " +
                      "PublisherIcon = @PublisherIcon, PublishDate = @PublishDate WHERE Id = @Id";
            return await connection.ExecuteAsync(sql, news);
        }


        public async Task<int> DeleteAsync(int id)
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.ExecuteAsync("DELETE FROM News WHERE Id = @Id", new { Id = id });
        }
    }
}
