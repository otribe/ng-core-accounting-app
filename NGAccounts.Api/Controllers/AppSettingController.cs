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
    public class AppSettingController : Controller
    {
        private readonly IAppSettingService appSettingService;
        private readonly IMapping mapping;

        public AppSettingController(IAppSettingService appSettingService,IMapping mapping)
        {
            this.appSettingService = appSettingService;
            this.mapping = mapping; 

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAppSettings()
        {
            var config= mapping.GetMap<AppSetting, AppSettingViewModel>();
            var appSetting=appSettingService.GetAll().ProjectTo<AppSettingViewModel>(config).ToList();

            return Json(new { data = appSetting });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetAppSetting(int id)
        {
            var appSetting = appSettingService.Get(id); 
            return Json(appSetting);
        }
    

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostAppSetting([FromForm]AppSetting model,IFormFile logo, string logo11)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                if (logo != null)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", logo.FileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        logo.CopyTo(stream);
                    }
                    ModelState.Clear();
                    model.Logo = logo.FileName;
                }
                else
                {
                    model.Logo = logo11;
                }

                appSettingService.Insert(model);
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
        public AlertBack PutAppSetting([FromForm]AppSetting model,IFormFile logo, string logo11,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                if (logo != null)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", logo.FileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        logo.CopyTo(stream);
                    }
                    ModelState.Clear();
                    model.Logo = logo.FileName;
                }
                else
                {
                    model.Logo = logo11;
                }

                appSettingService.Update(model);
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
        public AlertBack DeleteAppSetting([FromBody]AppSetting model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            appSettingService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

