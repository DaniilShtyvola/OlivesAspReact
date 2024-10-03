using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using OilNewsAPI.Presentation.Controllers;
using Xunit;

namespace Tests
{
    public class CategoryControllerTests
    {
        private readonly Mock<ICategoryRepository> _categoryRepositoryMock;
        private readonly Mock<INewsRepository> _newsRepositoryMock;
        private readonly CategoryController _controller;

        public CategoryControllerTests()
        {
            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _newsRepositoryMock = new Mock<INewsRepository>();
            _controller = new CategoryController(_categoryRepositoryMock.Object, _newsRepositoryMock.Object);
        }

        // Тест проверяет, что возвращается список всех категорий
        [Fact]
        public async Task GetAll_ReturnsOkResult_WithCategories()
        {
            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "Category1" },
                new Category { Id = 2, Name = "Category2" }
            };

            _categoryRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(categories);

            var result = await _controller.GetAll();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedCategories = Assert.IsAssignableFrom<List<Category>>(okResult.Value);
            Assert.Equal(2, returnedCategories.Count);
        }

        // Тест проверяет, что возвращается категория по Id
        [Fact]
        public async Task GetById_ReturnsOkResult_WithCategory()
        {
            var category = new Category { Id = 1, Name = "Category1" };
            _categoryRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(category);

            var result = await _controller.GetById(1);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedCategory = Assert.IsAssignableFrom<Category>(okResult.Value);
            Assert.Equal("Category1", returnedCategory.Name);
        }

        // Тест проверяет, что возвращается NotFound, если категория не найдена
        [Fact]
        public async Task GetById_ReturnsNotFound_WhenCategoryDoesNotExist()
        {
            _categoryRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Category)null);

            var result = await _controller.GetById(1);

            Assert.IsType<NotFoundResult>(result);
        }

        // Тест проверяет, что создается новая категория
        [Fact]
        public async Task Create_ReturnsCreatedResult_WithCategory()
        {
            var category = new Category { Name = "NewCategory" };
            _categoryRepositoryMock.Setup(repo => repo.CreateAsync(category)).ReturnsAsync(1);

            var result = await _controller.Create(category);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnedCategory = Assert.IsAssignableFrom<Category>(createdResult.Value);
            Assert.Equal("NewCategory", returnedCategory.Name);
        }

        // Тест проверяет, что возвращается BadRequest, если имя категории не указано
        [Fact]
        public async Task Create_ReturnsBadRequest_WhenNameIsEmpty()
        {
            var category = new Category { Name = "" };

            var result = await _controller.Create(category);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        // Тест проверяет, что обновляется категория
        [Fact]
        public async Task Update_ReturnsNoContent_WhenCategoryUpdated()
        {
            var existingCategory = new Category { Id = 1, Name = "OldCategory" };
            var updatedCategory = new Category { Id = 1, Name = "UpdatedCategory" };

            _categoryRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(existingCategory);

            var result = await _controller.Update(1, updatedCategory);

            Assert.IsType<NoContentResult>(result);
            _categoryRepositoryMock.Verify(repo => repo.UpdateAsync(updatedCategory), Times.Once);
        }

        // Тест проверяет, что возвращается NotFound, если категория не найдена для обновления
        [Fact]
        public async Task Update_ReturnsNotFound_WhenCategoryDoesNotExist()
        {
            var updatedCategory = new Category { Id = 1, Name = "UpdatedCategory" };

            _categoryRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Category)null);

            var result = await _controller.Update(1, updatedCategory);

            Assert.IsType<NotFoundResult>(result);
        }


        [Fact]
        public async Task Delete_ReturnsNotFound_WhenCategoryDoesNotExist()
        {
            _categoryRepositoryMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((Category)null);

            var result = await _controller.Delete(1);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}
