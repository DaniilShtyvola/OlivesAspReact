using OilNewsAPI.Database.Models;

namespace OilNewsAPI.Database.Interfaces
{
    public interface INewsRepository
    {
        Task<IEnumerable<News>> GetAllAsync();
        Task<News> GetByIdAsync(int id);
        Task<int> CreateAsync(News news);
        Task<int> UpdateAsync(News news);
        Task<int> DeleteAsync(int id);
    }

}
