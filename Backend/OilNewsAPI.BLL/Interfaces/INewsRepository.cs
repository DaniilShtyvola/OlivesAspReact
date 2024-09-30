using OilNewsAPI.BLL.Models;

namespace OilNewsAPI.BLL.Interfaces
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
