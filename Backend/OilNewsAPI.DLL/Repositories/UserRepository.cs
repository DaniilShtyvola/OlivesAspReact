using System.Data.SqlClient;
using Dapper;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using Microsoft.Extensions.Configuration;

namespace OilNewsAPI.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        private string GetConnectionString()
        {
            return _config.GetConnectionString("DefaultConnection");
        }

        public async Task<User> GetUserAsync(string username, string password)
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Username = @Username AND Password = @Password",
                new { Username = username, Password = password }
            );
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            using var connection = new SqlConnection(GetConnectionString());

            var checkSql = "SELECT COUNT(1) FROM Users WHERE Username = @Username";
            var userExists = await connection.ExecuteScalarAsync<bool>(checkSql, new { Username = user.Username });

            if (userExists)
            {
                return null;
            }

            var sql = "INSERT INTO Users (Username, Password) OUTPUT Inserted.Id VALUES (@Username, @Password)";
            var parameters = new { Username = user.Username, Password = user.Password };

            var userId = await connection.ExecuteScalarAsync<int>(sql, parameters);

            user.Id = userId;

            return user;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            using var connection = new SqlConnection(GetConnectionString());
            return await connection.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM Users WHERE Username = @Username",
                new { Username = username }
            );
        }
    }
}
