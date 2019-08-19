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
    public class GeneralSettingController : Controller
    {
        private readonly IGeneralSettingService generalSettingService;
        private readonly IMapping mapping;

        public GeneralSettingController(IGeneralSettingService generalSettingService,IMapping mapping)
        {
            this.generalSettingService = generalSettingService;
            this.mapping = mapping; 

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGeneralSettings()
        {
            var config= mapping.GetMap<GeneralSetting, GeneralSettingViewModel>();
            var generalSetting=generalSettingService.GetAll().ProjectTo<GeneralSettingViewModel>(config).ToList();

            return Json(new { data = generalSetting });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetGeneralSetting(int id)
        {
            var generalSetting = generalSettingService.Get(id); 
            return Json(generalSetting);
        }
    

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostGeneralSetting([FromForm]GeneralSetting model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                generalSettingService.Insert(model);
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
        public AlertBack PutGeneralSetting([FromForm]GeneralSetting model,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                generalSettingService.Update(model);
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
        public AlertBack DeleteGeneralSetting([FromBody]GeneralSetting model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            generalSettingService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

