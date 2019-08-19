using System;
using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace NGAccounts.Models
{
    public class LedgerAccount : BaseEntity
    { 
       [Required]
       [DisplayName("Name")]
       [StringLength(250)] 
       public string Name { get; set; }

       [DisplayName("Parent")]
       public Nullable<int> ParentId { get; set; }

       public virtual LedgerAccount LedgerAccount2 { get; set; }

       [DisplayName("Date Added")]
       [Column(TypeName = "datetime")]
       public DateTime? DateAdded { get; set; }

       [DisplayName("Added By")]
       public int? AddedBy { get; set; }

       [Required]
       [DisplayName("Is Active")]
       public bool IsActive { get; set; }

       public virtual ICollection<LedgerAccount> LedgerAccount_ParentIds { get; set; }

       public virtual ICollection<AccountTransaction> AccountTransaction_DebitLedgerAccountIds { get; set; }

       public virtual ICollection<AccountTransaction> AccountTransaction_CreditLedgerAccountIds { get; set; }


    }
}

