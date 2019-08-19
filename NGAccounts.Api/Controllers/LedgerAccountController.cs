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
    public class LedgerAccountController : Controller
    {
        private readonly ILedgerAccountService ledgerAccountService;
        private readonly IMapping mapping;

        public LedgerAccountController(ILedgerAccountService ledgerAccountService,IMapping mapping)
        {
            this.ledgerAccountService = ledgerAccountService;
            this.mapping = mapping; 

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetLedgerAccounts()
        {
            var config= mapping.GetMap<LedgerAccount, LedgerAccountViewModel>();
            var ledgerAccount=ledgerAccountService.GetAll().ProjectTo<LedgerAccountViewModel>(config).ToList();

            return Json(new { data = ledgerAccount });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetLedgerAccount(int id)
        { 
            var config = mapping.GetMap<Menu, LedgerAccountViewModel>();
            var ledgerAccount = ledgerAccountService.GetAll().ProjectTo<LedgerAccountViewModel>(config).FirstOrDefault(i => i.Id == id);
            return Json(ledgerAccount);
        }
    
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownLedgerAccount()
        {
            var tableData = ledgerAccountService.GetAll().Select(i => new {  value = i.Id,label = i.Name}).ToList();
             
            return Json(tableData);
        }

 
        [Route("[action]")]
        [HttpPost]
        public AlertBack PostLedgerAccount([FromForm]LedgerAccount model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                ledgerAccountService.Insert(model);
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
        public AlertBack PutLedgerAccount([FromForm]LedgerAccount model,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                ledgerAccountService.Update(model);
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
        public AlertBack DeleteLedgerAccount([FromBody]LedgerAccount model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            ledgerAccountService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

