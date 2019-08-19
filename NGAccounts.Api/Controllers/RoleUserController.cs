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
using AutoMapper;

namespace NGAccounts.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class RoleUserController : Controller
    {
        private readonly IRoleUserService roleUserService;
        private readonly IMapping mapping;
        private readonly IRoleService roleService;
        private readonly IUserService userService;

        public RoleUserController(IRoleUserService roleUserService,IRoleService roleService,IUserService userService,IMapping mapping)
        {
            this.roleUserService = roleUserService;
            this.mapping = mapping; 
            this.roleService = roleService;
            this.userService = userService;

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRoleUsers()
        {
            //var config= mapping.GetMap<RoleUser, RoleUserViewModel>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<RoleUser, RoleUserViewModel>()
                .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.Role_RoleId.RoleName))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User_UserId.UserName));
            });

            var roleUser =roleUserService.GetAll().ProjectTo<RoleUserViewModel>(config).ToList();

            return Json(new { data = roleUser });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetRoleUser(int id)
        {
            var roleUser = roleUserService.Get(id); 
            return Json(roleUser);
        }
    
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownRole()
        {
            var tableData = roleService.GetAll().Select(i => new {  value = i.Id,label = i.RoleName}).ToList();
             
            return Json(tableData);
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownUser()
        {
            var tableData = userService.GetAll().Select(i => new {  value = i.Id,label = i.UserName}).ToList();
             
            return Json(tableData);
        }

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostRoleUser([FromForm]RoleUser model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                roleUserService.Insert(model);
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
        public AlertBack PutRoleUser([FromForm]RoleUser model,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                roleUserService.Update(model);
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
        public AlertBack DeleteRoleUser([FromBody]RoleUser model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            roleUserService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

