using Microsoft.AspNetCore.Mvc;
using OilNewsAPI.Database.Interfaces;
using OilNewsAPI.Database.Models;

namespace OilNewsAPI.Controllers
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var newsList = await _newsRepository.GetAllAsync();
            return Ok(newsList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var news = await _newsRepository.GetByIdAsync(id);
            if (news == null)
                return NotFound();
            return Ok(news);
        }

        [HttpPost]
        public async Task<IActionResult> Create(News news)
        {
            await _newsRepository.CreateAsync(news);
            return CreatedAtAction(nameof(GetById), new { id = news.Id }, news);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, News news)
        {
            if (id != news.Id)
                return BadRequest();
            await _newsRepository.UpdateAsync(news);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _newsRepository.DeleteAsync(id);
            return NoContent();
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddNews([FromBody] News news)
        {
            if (string.IsNullOrEmpty(news.Title) || string.IsNullOrEmpty(news.Content))
            {
                return BadRequest("Title and Content are required.");
            }

            news.PublishDate = DateTime.Now;
            await _newsRepository.CreateAsync(news);

            return CreatedAtAction(nameof(GetById), new { id = news.Id }, news);
        }
    }
}
