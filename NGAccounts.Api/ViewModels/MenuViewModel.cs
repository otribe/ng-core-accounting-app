using System;
namespace NGAccounts.Api.ViewModels
{
    public class MenuViewModel
    { 
        public int Id { get; set; }

        public string MenuText { get; set; }

        public string MenuURL { get; set; }

        public int? ParentId { get; set; }

        public int? SortOrder { get; set; }

        public string MenuIcon { get; set; }


    }
}

