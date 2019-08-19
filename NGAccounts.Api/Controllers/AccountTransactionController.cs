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
    public class AccountTransactionController : Controller
    {
        private readonly IAccountTransactionService accountTransactionService;
        private readonly IMapping mapping;
        private readonly ILedgerAccountService ledgerAccountService; 

        public AccountTransactionController(IAccountTransactionService accountTransactionService,ILedgerAccountService ledgerAccountService ,IMapping mapping)
        {
            this.accountTransactionService = accountTransactionService;
            this.mapping = mapping; 
            this.ledgerAccountService = ledgerAccountService; 

        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAccountTransactions()
        {
            //var config= mapping.GetMap<AccountTransaction, AccountTransactionViewModel>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<AccountTransaction, AccountTransactionViewModel>()
                .ForMember(dest => dest.CreditLedgerAccountId, opt => opt.MapFrom(src => src.LedgerAccount_CreditLedgerAccountId.Name))
                .ForMember(dest => dest.DebitLedgerAccountId, opt => opt.MapFrom(src => src.LedgerAccount_DebitLedgerAccountId.Name));
            });
            var accountTransaction=accountTransactionService.GetAll().ProjectTo<AccountTransactionViewModel>(config).ToList();

            return Json(new { data = accountTransaction });
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public IActionResult GetAccountTransaction(int id)
        {
            var accountTransaction = accountTransactionService.Get(id); 
            return Json(accountTransaction);
        }
    
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownLedgerAccount()
        {
            //var tableData = ledgerAccountService.GetAll().Select(i => new {  value = i.Id,label = i.Name}).ToList();

            var tableData0 = ledgerAccountService.GetAll().ToList();

            var tableData = tableData0.Where(i => i.ParentId != null)
                    .Select(g => new {
                        value = g.Id,
                        label = (g.LedgerAccount2.LedgerAccount2!=null? g.LedgerAccount2.LedgerAccount2.Name + " > ":"")+
                        (g.LedgerAccount2!=null? g.LedgerAccount2.Name+ " > ":"") + 
                        (g.Name)
                    });


            return Json(tableData);
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDropDownLedgerAccountFilter()
        {
            //var tableData = ledgerAccountService.GetAll().Select(i => new {  value = i.Name, label = i.Name}).ToList();
            var tableData0 = ledgerAccountService.GetAll().ToList();

            var tableData = tableData0.Where(i => i.ParentId != null)
                    .Select(g => new {
                        value = g.Name,
                        label = (g.LedgerAccount2.LedgerAccount2 != null ? g.LedgerAccount2.LedgerAccount2.Name + " > " : "") +
                        (g.LedgerAccount2 != null ? g.LedgerAccount2.Name + " > " : "") +
                        (g.Name)
                    });
            return Json(tableData);
        }

        [Route("[action]")]
        [HttpPost]
        public AlertBack PostAccountTransaction([FromForm]AccountTransaction model)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                accountTransactionService.Insert(model);
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
        public AlertBack PutAccountTransaction([FromForm]AccountTransaction model,int id = 0)
        {
            AlertBack alert = new AlertBack();
            if (ModelState.IsValid)
            {
                
                accountTransactionService.Update(model);
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
        public AlertBack DeleteAccountTransaction([FromBody]AccountTransaction model, int id = 0)
        {
            AlertBack alert = new AlertBack(); 
            accountTransactionService.Delete(model);
            alert.status = "success";
            alert.message = "Register Successfully";
            return alert;
        } 

    }
}

