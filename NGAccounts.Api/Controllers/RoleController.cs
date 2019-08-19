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
    public class RoleController : Controller
    {
        private readonly IRoleService roleService;
        private readonly IMapping mapping;

        public RoleController(IRoleService roleService,IMapping mapping)
        {
            this.roleService = roleService;
            this.mapping = mapping; 

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRoles()
        {
            var config= mapping.GetMap<Role, RoleViewModel>();
            var role=roleService.GetAll().ProjectTo<RoleViewModel>(config).ToList();

            return Json(new { data = role });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetRole(int id)
        {
            var role = roleService.Get(id); 
            return Json(role);
        }
    

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostRole([FromForm]Role model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                roleService.Insert(model);
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
        public AlertBack PutRole([FromForm]Role model,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                roleService.Update(model);
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
        public AlertBack DeleteRole([FromBody]Role model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            roleService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

