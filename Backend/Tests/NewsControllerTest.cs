using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using OilNewsAPI.Presentation.Controllers;
using Xunit;

namespace Tests
{
    public class NewsControllerTests
    {
        private readonly Mock<INewsRepository> _newsRepositoryMock;
        private readonly NewsController _controller;

        public NewsControllerTests()
        {
            _newsRepositoryMock = new Mock<INewsRepository>();
            _controller = new NewsController(_newsRepositoryMock.Object);
        }

        // Тест проверяет, что метод GetAll возвращает статус 200 OK и список новостей
        [Fact]
        public async Task GetAll_ReturnsOkResult_WithNewsList()
        {
            var newsList = new List<News>
            {
                new News { Id = 1, Title = "Title1", Content = "Content1" },
                new News { Id = 2, Title = "Title2", Content = "Content2" }
            };
            _newsRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(newsList);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<News>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        // Тест проверяет, что метод GetById возвращает статус 200 OK и новость по Id
        [Fact]
        public async Task GetById_ReturnsOkResult_WithNews()
        {
            var news = new News { Id = 1, Title = "Title1", Content = "Content1" };

            _newsRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(news);

            var result = await _controller.GetById(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<News>(okResult.Value);
            Assert.Equal("Title1", returnValue.Title);
        }

        // Тест проверяет, что метод GetById возвращает статус 404 NotFound, если новость не найдена
        [Fact]
        public async Task GetById_ReturnsNotFound_WhenNewsDoesNotExist()
        {
            _newsRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((News)null);

            var result = await _controller.GetById(1);

            Assert.IsType<NotFoundResult>(result);
        }

        // Тест проверяет, что метод Create возвращает статус 201 Created, если новость валидна
        [Fact]
        public async Task Create_ReturnsCreatedAtActionResult_WhenNewsIsValid()
        {
            var news = new News { Title = "Title1", Content = "Content1" };
            _newsRepositoryMock.Setup(repo => repo.CreateAsync(news)).ReturnsAsync(1);

            var result = await _controller.Create(news);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(1, ((News)createdResult.Value).Id);
        }

        // Тест проверяет, что метод Create возвращает статус 400 BadRequest, если новость не валидна
        [Fact]
        public async Task Create_ReturnsBadRequest_WhenNewsIsInvalid()
        {
            var news = new News { Title = "", Content = "" };

            var result = await _controller.Create(news);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        // Тест проверяет, что метод Update возвращает статус 204 NoContent, если новость существует
        [Fact]
        public async Task Update_ReturnsNoContent_WhenNewsExists()
        {
            var news = new News { Id = 1, Title = "Title1", Content = "Content1" };
            _newsRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(news);

            var result = await _controller.Update(1, news);

            Assert.IsType<NoContentResult>(result);
        }

        // Тест проверяет, что метод Update возвращает статус 404 NotFound, если новость не найдена
        [Fact]
        public async Task Update_ReturnsNotFound_WhenNewsDoesNotExist()
        {
            var news = new News { Id = 1, Title = "Title1", Content = "Content1" };
            _newsRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((News)null);

            var result = await _controller.Update(1, news);

            Assert.IsType<NotFoundResult>(result);
        }

        // Тест проверяет, что метод AddNews возвращает статус 201 Created, если новость валидна
        [Fact]
        public async Task AddNews_ReturnsCreatedAtActionResult_WhenNewsIsValid()
        {
            var news = new News { Title = "Title1", Content = "Content1" };
            _newsRepositoryMock.Setup(repo => repo.CreateAsync(news)).ReturnsAsync(1);

            var result = await _controller.AddNews(news);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(1, ((News)createdResult.Value).Id);
        }
    }
}
