using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using NGAccounts.Models;
using NGAccounts.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace NGAccounts.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly IAuthLoginService authLoginService;
        public IConfiguration Configuration { get; } 
        private readonly IMenuPermissionService menuPermissionService;

        public AuthController(IUserService userService, IConfiguration configuration, IAuthLoginService authLoginService,  IMenuPermissionService menuPermissionService)
        {
            this.userService = userService;
            this.Configuration = configuration;
            this.authLoginService = authLoginService; 
            this.menuPermissionService = menuPermissionService;
        }

        [HttpPost]
        [Route("[action]")]
        //POST : /api/Auth/Login
        public IActionResult Login([FromBody]LoginModel model)
        {
            var user = authLoginService.ValidUser(model.UserName);
            if (user != null)
            {
                if (user.Password != model.Password)
                {
                    return BadRequest(new { message = "Username or password is incorrect." });
                }
                string JWT_Secret = Configuration["ApplicationSettings:JWT_Secret"].ToString();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("UserName",user.UserName.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
 
                var myMenu0 = menuPermissionService.GetAllInclude(i => i.Menu_MenuId).Where(i => (i.RoleId == user.RoleId && i.UserId == null) || i.UserId == user.Id).OrderBy(i=>i.Menu_MenuId.SortOrder).ToArray();
      
                var myMenu = myMenu0.Where(i=>i.Menu_MenuId.ParentId==null)
                     .Select(g => new { 
                         label =g.Menu_MenuId.MenuText,
                         iconClasses = g.Menu_MenuId.MenuIcon, 
                         children = myMenu0.Where(i=>i.Menu_MenuId.ParentId==g.Menu_MenuId.Id).Select(x => new
                         {
                             label = x.Menu_MenuId.MenuText,
                             iconClasses = x.Menu_MenuId.MenuIcon,
                             route = x.Menu_MenuId.MenuURL
                         })
                     });


                return Ok(new { token,user.Id,user.UserName, myMenu });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

         

        public class LoginModel
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }


        [HttpPost]
        [Route("[action]")]
        //POST : /api/Auth/Register
        public IActionResult Register([FromBody]User model)
        {
            var user = new User()
            {
                UserName = model.UserName,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Password = model.Password,
                Email=model.UserName+"@gmail.com",
                RoleId=1,
                IsActive = true,
                //DateCreated = DateTime.Now
            };

            try
            {
                userService.Insert(user);
                var message = "Success";
                return Ok(new { message });
            }
            catch (Exception ex)
            { 
                var message = ex.Message;
                return Ok(new { message });
            }
        }
    }
}
