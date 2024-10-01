using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using OilNewsAPI.Presentation.Controllers;

namespace NewsAPI_Test
{
    public class NewsControllerTests
    {
        private readonly Mock<INewsRepository> _mockRepository;
        private readonly NewsController _controller;

        public NewsControllerTests()
        {
            _mockRepository = new Mock<INewsRepository>();
            _controller = new NewsController(_mockRepository.Object);
        }

        // “ест который возвращает все новости 
        [Fact]
        public async Task GetAllNews()
        {
            var news = new List<News> { new News { Id = 1, Title = "sdfwesda", Content = "sadfewsd" } };
            _mockRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(news);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnNews = Assert.IsType<List<News>>(okResult.Value);
            Assert.Single(returnNews);
        }

        // “ест на существование новости с конкретным ID в списке 
        [Fact]
        public async Task GetNewsById_ReturnsOk()
        {
            var news = new News { Id = 1, Title = "aoasodk", Content = "text" };
            _mockRepository.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(news);

            var result = await _controller.GetById(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnNews = Assert.IsType<News>(okResult.Value);
            Assert.Equal(1, returnNews.Id); 
        }

        // “ест на корректное создание новости 
        [Fact]
        public async Task CreateNews_WithCorrectId()
        {
            var news = new News { Title = "asdfaevaes", Content = "kborkfvsrd" };
            _mockRepository.Setup(repo => repo.CreateAsync(It.IsAny<News>())).ReturnsAsync(1);

            var result = await _controller.Create(news);

            var createActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var createNews = Assert.IsType<News>(createActionResult.Value);
            Assert.Equal(1, createNews.Id); 
        }


        // “ест при успешном создании новости и возвращении кода 201
        [Fact]
        public async Task CreateNews_ReturnsCreatedAction()
        {
            var correctNews = new News { Title = "adsfeavew", Content = "nladsffaew" };
            _mockRepository.Setup(repo => repo.CreateAsync(It.IsAny<News>())).ReturnsAsync(1); 

            var result = await _controller.Create(correctNews);

            var createResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(201, createResult.StatusCode); 
            Assert.Equal(1, ((News)createResult.Value).Id); 
        }

        // “ест дл€ проверки что новость с таким ID не существует в списке
        [Fact]
        public async Task GetNewsById_ReturnsNotFound()
        {
            _mockRepository.Setup(repo => repo.GetByIdAsync(999)).ReturnsAsync((News)null); 

            var result = await _controller.GetById(999);

            Assert.IsType<NotFoundResult>(result); 
        }


    }
}