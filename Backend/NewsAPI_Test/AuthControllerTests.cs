using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using OilNewsAPI.BLL.Interfaces;
using OilNewsAPI.BLL.Models;
using Xunit;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace OilNewsAPI.Tests
{
    public class AuthControllerTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly Mock<IConfiguration> _configMock;
        private readonly AuthController _controller;

        public AuthControllerTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _configMock = new Mock<IConfiguration>();

            _configMock.Setup(c => c["Jwt:Key"]).Returns("your_very_long_secret_key_1234567890!@#$%");
            _configMock.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
            _configMock.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");

            _controller = new AuthController(_configMock.Object, _userRepositoryMock.Object);
        }
        
        // Тест проверяет что возвращается токен при успешной авторизации пользователя
        [Fact]
        public async Task LoginReturnToken()
        {
            var loginUser = new User { Username = "Max", Password = "Max1q23das" };
            var user = new User { Username = "Max", IsAdmin = false };

            _userRepositoryMock
                .Setup(userRepository => userRepository.GetUserAsync(loginUser.Username, loginUser.Password))
                .ReturnsAsync(user);

            var result = await _controller.Login(loginUser);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult); 
            Assert.IsType<OkObjectResult>(okResult); 

            Assert.NotNull(okResult.Value); 

            var token = okResult.Value.GetType().GetProperty("token")?.GetValue(okResult.Value, null);
            Assert.NotNull(token); 
            Assert.IsType<string>(token); 
        }

        // Тест проверят что возвращается UnauthorizeResult если пользователь ввел неправильные данные
        [Fact]
        public async Task Login_ReturnUnauthorizeUser()
        {
            var loginUser = new User { Username = "nonexistentuser", Password = "wrongpassword" };

            _userRepositoryMock
                .Setup(userRepository => userRepository.GetUserAsync(loginUser.Username, loginUser.Password))
                .ReturnsAsync((User)null);

            var result = await _controller.Login(loginUser);

            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        // Тест проверяет что возвращается BadRequest если пользователь с таким именем уже существует
        [Fact]
        public async Task Register_BadRequest()
        {
            var user = new User { Username = "existinguser", Password = "password" };

            _userRepositoryMock
                .Setup(userRepository => userRepository.GetUserByUsernameAsync(user.Username))
                .ReturnsAsync(new User { Username = "existinguser" });

            var result = await _controller.Register(user);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        // Тест проверяет что возвращается токен при успешной регистрации пользователя
        [Fact]
        public async Task Register_ReturnToken()
        {
            var user = new User { Username = "User", Password = "fvsdjn1q23" };

            _userRepositoryMock
                .Setup(userRepository => userRepository.GetUserByUsernameAsync(user.Username))
                .ReturnsAsync((User)null);

            _userRepositoryMock
                .Setup(userRepository => userRepository.RegisterUserAsync(user))
                .ReturnsAsync(new User { Username = "User", IsAdmin = false });

            var result = await _controller.Register(user);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.IsType<OkObjectResult>(okResult);

            Assert.NotNull(okResult.Value); 

            var token = okResult.Value.GetType().GetProperty("token")?.GetValue(okResult.Value, null);
            Assert.NotNull(token); 
            Assert.IsType<string>(token); 
        }

        // Тест проверяет что возвращается информация о пользователе при действующем токене
        [Fact]
        public async Task CurrentUser_ReturnUser()
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "tests")
            };

            var userIdentity = new ClaimsIdentity(claims, "tests");
            var user = new ClaimsPrincipal(userIdentity);

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            _userRepositoryMock
                .Setup(userRepository => userRepository.GetUserByUsernameAsync("tests"))
                .ReturnsAsync(new User { Username = "tests", IsAdmin = false });

            
            var result = await _controller.GetCurrentUser();

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.IsType<OkObjectResult>(okResult);

            Assert.NotNull(okResult.Value); 

            var username = okResult.Value.GetType().GetProperty("username")?.GetValue(okResult.Value, null);
            var admin = okResult.Value.GetType().GetProperty("isAdmin")?.GetValue(okResult.Value, null);

            Assert.Equal("tests", username); 
            Assert.Equal(false, admin); 
        }

        // Тест проверяет что возвращается UnauthorizedResult при недействительном токене
        [Fact]
        public async Task CurrentUser_ReturnUnauthorized()
        {
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = new ClaimsPrincipal() }
            };

            var result = await _controller.GetCurrentUser();

            Assert.IsType<UnauthorizedResult>(result);
        }
    }
}
