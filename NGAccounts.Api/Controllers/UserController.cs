using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;
using NGAccounts.Models;
using NGAccounts.Service;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using NGAccounts.Api.ViewModels;
using AutoMapper.QueryableExtensions;

namespace NGAccounts.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IMapping mapping;
        private readonly IRoleService roleService;

        public UserController(IUserService userService,IRoleService roleService,IMapping mapping)
        {
            this.userService = userService;
            this.mapping = mapping; 
            this.roleService = roleService;

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUsers()
        {
            var config= mapping.GetMap<User, UserViewModel>();
            var user=userService.GetAll().ProjectTo<UserViewModel>(config).ToList();

            return Json(new { data = user });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetUser(int id)
        {
            var config = mapping.GetMap<User, UserViewModel>();
            var user = userService.GetAll().ProjectTo<UserViewModel>(config).FirstOrDefault(i => i.Id == id);
            return Json(user);
        }
    
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownRole()
        {
            var tableData = roleService.GetAll().Select(i => new {  value = i.Id,label = i.RoleName}).ToList();
            
            return Json(tableData);
        }

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostUser([FromForm]User model,IFormFile profilePicture, string profilePicture7)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                if (profilePicture != null)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", profilePicture.FileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        profilePicture.CopyTo(stream);
                    }
                    ModelState.Clear();
                    model.ProfilePicture = profilePicture.FileName;
                }
                else
                {
                    model.ProfilePicture = profilePicture7;
                }

                userService.Insert(model);
                alert.status = "success";
                alert.message = "Register Successfully";
                return alert;
            }
            else
            {
                alert.status = "warning";
                foreach (var key in this.ModelState.Keys)
                {
                    foreach (var err in this.ModelState[key].Errors)
                    {
                        alert.message += err.ErrorMessage + "<br/>";
                    }
                }
                return alert;
            }
        }

        [HttpPut("{id}")]
        [Route("[action]")]
        public AlertBack PutUser([FromForm]User model,IFormFile profilePicture, string profilePicture7,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                if (profilePicture != null)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", profilePicture.FileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        profilePicture.CopyTo(stream);
                    }
                    ModelState.Clear();
                    model.ProfilePicture = profilePicture.FileName;
                }
                else
                {
                    model.ProfilePicture = profilePicture7;
                }

                userService.Update(model);
                alert.status = "success";
                alert.message = "Register Successfully";
                return alert;
            }
            else
            {
                alert.status = "warning";
                foreach (var key in this.ModelState.Keys)
                {
                    foreach (var err in this.ModelState[key].Errors)
                    {
                        alert.message += err.ErrorMessage + "<br/>";
                    }
                }
                return alert;
            }
        }

        [HttpDelete("{id}")]
        [Route("[action]")]
        public AlertBack DeleteUser([FromBody]User model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            userService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

