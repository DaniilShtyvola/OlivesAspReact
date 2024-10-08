﻿using OilNewsAPI.BLL.Models;

namespace OilNewsAPI.BLL.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserAsync(string username, string password);
        Task<User> RegisterUserAsync(User user);
        Task<User> GetUserByUsernameAsync(string username);
    }
}
