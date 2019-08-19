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
    public class MenuController : Controller
    {
        private readonly IMenuService menuService;
        private readonly IMapping mapping;

        public MenuController(IMenuService menuService,IMapping mapping)
        {
            this.menuService = menuService;
            this.mapping = mapping; 

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMenus()
        {
            var config= mapping.GetMap<Menu, MenuViewModel>();
            var menu=menuService.GetAll().ProjectTo<MenuViewModel>(config).ToList();

            return Json(new { data = menu });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetMenu(int id)
        {
            //var menu = menuService.Get(id);
            var config = mapping.GetMap<Menu, MenuViewModel>();
            var menu = menuService.GetAll().ProjectTo<MenuViewModel>(config).FirstOrDefault(i => i.Id == id);
            return Json(menu);
        }
    
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownMenu()
        {
            var tableData = menuService.GetAll().Select(i => new {  value = i.Id,label = i.MenuText}).ToList();
            
            return Json(tableData);
        }

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostMenu([FromForm]Menu model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                menuService.Insert(model);
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
        public AlertBack PutMenu([FromForm]Menu model,int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            if (ModelState.IsValid)
            { 
                menuService.Update(model);
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
        public AlertBack DeleteMenu([FromBody]Menu model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            menuService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

