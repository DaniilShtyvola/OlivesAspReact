using System.Data.SqlClient;
using Dapper;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using Microsoft.Extensions.Configuration;

namespace OilNewsAPI.DAL.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IConfiguration _config;

        public CategoryRepository(IConfiguration config)
        {
            _config = config;
        }

        private string GetConnectionString()
        {
            return _config.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.QueryAsync<Category>("SELECT * FROM Category");
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.QueryFirstOrDefaultAsync<Category>("SELECT * FROM Category WHERE Id = @Id", new { Id = id });
        }

        public async Task<int> CreateAsync(Category category)
        {
            using var connection = new SqlConnection(GetConnectionString());
            var sql = "INSERT INTO Category (Name) OUTPUT INSERTED.Id VALUES (@Name)";
            return await connection.QuerySingleAsync<int>(sql, category);
        }

        public async Task<int> UpdateAsync(Category category)
        {
            using var connection = new SqlConnection(GetConnectionString());
            var sql = "UPDATE Category SET Name = @Name WHERE Id = @Id";
            return await connection.ExecuteAsync(sql, category);
        }

        public async Task<int> DeleteAsync(int id)
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.ExecuteAsync("DELETE FROM Category WHERE Id = @Id", new { Id = id });
        }
    }
}

