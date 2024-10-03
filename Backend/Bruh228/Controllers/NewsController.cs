using Microsoft.AspNetCore.Mvc;
using OilNewsAPI.BLL.Models;
using OilNewsAPI.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace OilNewsAPI.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsRepository _newsRepository;

        public NewsController(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        /// <summary>
        /// Получить все новости
        /// </summary>
        /// <returns>Список всех новостей</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var newsList = await _newsRepository.GetAllAsync();
            return Ok(newsList);
        }

        /// <summary>
        /// Получить новость по Id
        /// </summary>
        /// <param name="id">Id новости</param>
        /// <returns>Детали новости с заданным Id</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _newsRepository.GetByIdAsync(id);
            if (news == null)
                return NotFound();
            return Ok(news);
        }

        /// <summary>
        /// Добавить новость
        /// </summary>
        /// <param name="news">
        /// Запрос, включающий в себя название новости, ее содержание, ссылку на картинку и id существующей категории, к которой следует отнести новость
        /// </param>
        /// <returns>Созданная новость</returns>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(News news)
        {
            if (string.IsNullOrEmpty(news.Title) || string.IsNullOrEmpty(news.Content))
                return BadRequest("Title and Content are required.");

            news.PublishDate = DateTime.Now;
            int newId = await _newsRepository.CreateAsync(news);
            news.Id = newId;

            return CreatedAtAction(nameof(GetById), new { id = newId }, news);
        }

        /// <summary>
        /// Обновить новость
        /// </summary>
        /// <param name="id">Id новости для обновления</param>
        /// <param name="news">Новое содержимое новости</param>
        /// <returns>Ответ без содержимого</returns>
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, News news)
        {
            var news2 = await _newsRepository.GetByIdAsync(id);

            if (news2 == null)
                return NotFound();

            news.PublishDate = news2.PublishDate;
            news.Id = news2.Id;

            await _newsRepository.UpdateAsync(news);
            return NoContent();
        }

        /// <summary>
        /// Удалить новость
        /// </summary>
        /// <param name="id">Id новости для удаления</param>
        /// <returns>Ответ без содержимого</returns>
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _newsRepository.DeleteAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Добавить новость (альтернативный маршрут)
        /// </summary>
        /// <param name="news">
        /// Запрос, включающий в себя название новости, ее содержание, ссылку на картинку и id существующей категории, к которой следует отнести новость
        /// </param>
        /// <returns>Созданная новость</returns>
        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddNews([FromBody] News news)
        {
            if (string.IsNullOrEmpty(news.Title) || string.IsNullOrEmpty(news.Content))
            {
                return BadRequest("Title and Content are required.");
            }

            news.PublishDate = DateTime.Now;
            int newId = await _newsRepository.CreateAsync(news);
            news.Id = newId;

            return CreatedAtAction(nameof(GetById), new { id = news.Id }, news);
        }

        /// <summary>
        /// Получить все новости по Id категории
        /// </summary>
        /// <param name="categoryId">Id категории</param>
        /// <returns>Список новостей по категории</returns>
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategoryId(int categoryId)
        {
            var newsList = await _newsRepository.GetByCategoryIdAsync(categoryId);
            if (newsList == null || !newsList.Any())
                return NotFound($"No news found for CategoryId {categoryId}");

            return Ok(newsList);
        }
    }
}
