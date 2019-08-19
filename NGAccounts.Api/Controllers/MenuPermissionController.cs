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
    public class MenuPermissionController : Controller
    {
        private readonly IMenuPermissionService menuPermissionService;
        private readonly IMapping mapping;
        private readonly IMenuService menuService;
        private readonly IRoleService roleService;
        private readonly IUserService userService;

        public MenuPermissionController(IMenuPermissionService menuPermissionService,IMenuService menuService,IRoleService roleService,IUserService userService,IMapping mapping)
        {
            this.menuPermissionService = menuPermissionService;
            this.mapping = mapping; 
            this.menuService = menuService;
            this.roleService = roleService;
            this.userService = userService;

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMenuPermissions()
        {
            //var config= mapping.GetMap<MenuPermission, MenuPermissionViewModel>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<MenuPermission, MenuPermissionViewModel>()
                .ForMember(dest => dest.MenuId, opt => opt.MapFrom(src => src.Menu_MenuId.MenuText))
                .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.Role_RoleId.RoleName))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User_UserId.UserName));
            });

            var menuPermission=menuPermissionService.GetAll().ProjectTo<MenuPermissionViewModel>(config).ToList();

            return Json(new { data = menuPermission });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetMenuPermission(int id)
        {
            var menuPermission = menuPermissionService.Get(id); 
            return Json(menuPermission);
        }
    
        
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDowns()//bulk dropdown
        {
            var menuData = menuService.GetAll().Select(i => new { value = i.Id, label = i.MenuText }).ToList();
             
            var roleData = roleService.GetAll().Select(i => new { value = i.Id, label = i.RoleName }).ToList();
             
            var userData = userService.GetAll().Select(i => new { value = i.Id, label = i.UserName }).ToList();
              
            return Json(new { menu = menuData, role= roleData, user = userData });
        }

        [Route("[action]")]
        [HttpPost]
        public AlertBack PostMenuPermission([FromForm]MenuPermission model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                menuPermissionService.Insert(model);
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
        public AlertBack PutMenuPermission([FromForm]MenuPermission model,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                menuPermissionService.Update(model);
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
        public AlertBack DeleteMenuPermission([FromBody]MenuPermission model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            menuPermissionService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

