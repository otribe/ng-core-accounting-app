using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NGAccounts.Api.ViewModels
{
    public class LadgerAccountViewModel
    { 
        public int Id { get; set; }
        public string Name { get; set; }

        public Nullable<int> ParentId { get; set; }

        public DateTime? DateAdded { get; set; }

        public int? AddedBy { get; set; }

        public bool IsActive { get; set; }
         
    }
}