using Microsoft.AspNetCore.Mvc;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using Microsoft.AspNetCore.Authorization;

namespace OilNewsAPI.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly INewsRepository _newsRepository;

        public CategoryController(ICategoryRepository categoryRepository, INewsRepository newsRepository)
        {
            _categoryRepository = categoryRepository;
            _newsRepository = newsRepository;
        }

        /// <summary>
        /// Получить все категории
        /// </summary>
        /// <returns>Список всех категорий</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return Ok(categories);
        }

        /// <summary>
        /// Получить категорию по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор категории</param>
        /// <returns>Категория с указанным идентификатором или сообщение об ошибке, если категория не найдена</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
                return NotFound();
            return Ok(category);
        }

        /// <summary>
        /// Создать новую категорию
        /// </summary>
        /// <param name="category">
        /// Запрос, включающий в себя название категории
        /// </param>
        /// <returns>Созданная категория с установленным идентификатором</returns>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            if (string.IsNullOrEmpty(category.Name))
                return BadRequest("Name is required.");

            int newId = await _categoryRepository.CreateAsync(category);
            category.Id = newId;

            return CreatedAtAction(nameof(GetById), new { id = newId }, category);
        }

        /// <summary>
        /// Обновить существующую категорию
        /// </summary>
        /// <param name="id">Идентификатор категории для обновления</param>
        /// <param name="category">
        /// Запрос, содержащий обновленные данные категории
        /// </param>
        /// <returns>Статус 204 No Content при успешном обновлении или сообщение об ошибке, если категория не найдена</returns>
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Category category)
        {
            var existingCategory = await _categoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
                return NotFound();

            category.Id = id;
            await _categoryRepository.UpdateAsync(category);
            return NoContent();
        }

        /// <summary>
        /// Удалить категорию по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор категории для удаления</param>
        /// <returns>Статус 204 No Content при успешном удалении или сообщение об ошибке, если категория не найдена</returns>
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existingCategory = await _categoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
                return NotFound();

            await _newsRepository.RemoveCategoryFromNewsAsync(id);

            await _categoryRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
