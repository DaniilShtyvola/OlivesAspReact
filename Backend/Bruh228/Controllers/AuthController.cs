using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using OilNewsAPI.BLL.Models;
using OilNewsAPI.BLL.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IUserRepository _userRepository;

    public AuthController(IConfiguration config, IUserRepository userRepository)
    {
        _config = config;
        _userRepository = userRepository;
    }

    /// <summary>
    /// Авторизовать пользователя по имени пользователя и паролю
    /// </summary>
    /// <param name="loginUser">
    /// Запрос, содержащий имя пользователя и пароль для входа
    /// </param>
    /// <returns>
    /// Токен JWT при успешной авторизации или сообщение об ошибке при неудаче
    /// </returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User loginUser)
    {
        var user = await _userRepository.GetUserAsync(loginUser.Username, loginUser.Password);
        if (user == null)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        var token = GenerateToken(user);
        return Ok(new { token });
    }

    /// <summary>
    /// Регистрация нового пользователя
    /// </summary>
    /// <param name="newUser">
    /// Запрос, содержащий имя пользователя, пароль и другие данные для регистрации
    /// </param>
    /// <returns>
    /// Сообщение об успешной регистрации и токен JWT, если регистрация прошла успешно, или сообщение об ошибке
    /// </returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User newUser)
    {
        var existingUser = await _userRepository.GetUserByUsernameAsync(newUser.Username);
        if (existingUser != null)
        {
            return BadRequest(new { message = "Username already exists" });
        }

        newUser.IsAdmin = false;

        var createdUser = await _userRepository.RegisterUserAsync(newUser);
        if (createdUser == null)
        {
            return StatusCode(500, new { message = "User registration failed" });
        }

        var token = GenerateToken(createdUser);
        return Ok(new { message = "User registered successfully", token });
    }

    /// <summary>
    /// Получить текущего авторизованного пользователя
    /// </summary>
    /// <returns>
    /// Информация о текущем пользователе, включая имя пользователя и права администратора
    /// </returns>
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var claims = User.Claims.ToList();
        foreach (var claim in claims)
        {
            Console.WriteLine($"{claim.Type}: {claim.Value}");
        }

        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(username))
        {
            return Unauthorized();
        }

        var existingUser = await _userRepository.GetUserByUsernameAsync(username);

        return Ok(new { username = existingUser.Username, isAdmin = existingUser.IsAdmin });
    }

    private string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
