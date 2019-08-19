using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NGAccounts.Service;

namespace NGAccounts.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IUserService userService;
        private readonly IRoleService roleService;
        private readonly IMenuService menuService;
        private readonly ILedgerAccountService ledgerAccountService;
        public HomeController(IUserService userService, IRoleService roleService, IMenuService menuService, ILedgerAccountService ledgerAccountService)
        {
            this.userService = userService;
            this.roleService = roleService;
            this.menuService = menuService;
            this.ledgerAccountService = ledgerAccountService;
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult Dashboard()
        {
            Widgets widgets = new Widgets
            {
                Users = userService.GetAll().Count(),
                Roles = roleService.GetAll().Count(),
                Menus = menuService.GetAll().Count(),
                Accounts = ledgerAccountService.GetAll().Count()
            };


            List<RootChart> rootChart = new List<RootChart>();
            int lastDay = 7;
            var lastDays = DateTime.Now.Date.AddDays(-lastDay);

            List<string> dateList = new List<string>();
            List<int> dataList = new List<int>();
            List<Dataset> datasets = new List<Dataset>();

            var lastRegister = userService.GetAll().Where(i => i.DateAdded >= lastDays).Select(i => new { DateAdded = i.DateAdded }).ToArray();

            for (int i = 0; i < lastDay; i++)
            {
                var dateDynamic = DateTime.Now.Date.AddDays(-i);
                int year = dateDynamic.Year;
                int month = dateDynamic.Month;
                int day = dateDynamic.Day;

                DateTime newDate = new DateTime(year, month, day);
                var hav = lastRegister.Where(j => j.DateAdded.Value.Date == newDate.Date);
                if (hav.Count() > 0)
                {
                    dateList.Add(newDate.ToString("yyyy-MM-dd"));
                    dataList.Add(hav.Count()); 
                }
                else
                {
                    dateList.Add(newDate.ToString("yyyy-MM-dd"));
                    dataList.Add(0);
                }

            }

            

            Dataset dataset = new Dataset
            {
                Data= dataList, 
                Label = "Users Count",
                Fill = false,
                BorderColor = "#4bc0c0",
                BackgroundColor = "#42A5F5"
            }; 
            datasets.Add(dataset);

            RootChart rootChartLi = new RootChart();
            rootChartLi.Labels = dateList; 
            rootChartLi.Datasets = datasets;
             
            rootChart.Add(rootChartLi);

            return Json(new { widget = widgets, chart = rootChart });
        }

        //models begin 

        public class Widgets
        {
            public int Users { get; set; }
            public int Roles { get; set; }
            public int Menus { get; set; }
            public int Accounts { get; set; }
        }


        public class RootChart
        {
            public List<string> Labels { get; set; } 
            public List<Dataset> Datasets { get; set; }
        }

        public class Dataset
        {
            public string Label { get; set; }
            public List<int> Data { get; set; }
            public bool Fill { get; set; }
            public string BorderColor { get; set; }
            public string BackgroundColor { get; set; }
        }

        //models end

    }
}