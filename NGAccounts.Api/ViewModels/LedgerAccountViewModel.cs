using System;
namespace NGAccounts.Api.ViewModels
{
    public class LedgerAccountViewModel
    { 
        public int Id { get; set; }

        public string Name { get; set; }

        public int? ParentId { get; set; }

        public DateTime? DateAdded { get; set; }

        public int? AddedBy { get; set; }

        public bool IsActive { get; set; }


    }
}

