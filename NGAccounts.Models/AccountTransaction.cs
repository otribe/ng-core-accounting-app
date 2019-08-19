using System;
using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace NGAccounts.Models
{
    public class AccountTransaction : BaseEntity
    { 
       [Required]
       [DisplayName("Debit Ledger Account")]
       public int DebitLedgerAccountId { get; set; }

       public virtual LedgerAccount LedgerAccount_DebitLedgerAccountId { get; set; }

       [Required]
       [DisplayName("Credit Ledger Account")]
       public int CreditLedgerAccountId { get; set; }

       public virtual LedgerAccount LedgerAccount_CreditLedgerAccountId { get; set; }

       [Required]
       [DisplayName("Amount")]
       public Decimal Amount { get; set; }

       [DisplayName("Remarks")]
       [StringLength(500)] 
       public string Remarks { get; set; }

       [Required]
       [DisplayName("Transaction Date")]
       [Column(TypeName = "datetime")]
       public DateTime TransactionDate { get; set; }

       [DisplayName("Date Added")]
       [Column(TypeName = "datetime")]
       public DateTime? DateAdded { get; set; }

       [DisplayName("Modified By")]
       public int? ModifiedBy { get; set; }

       [DisplayName("Date Modied")]
       [Column(TypeName = "datetime")]
       public DateTime? DateModied { get; set; }

       [DisplayName("Added By")]
       public int? AddedBy { get; set; }

       [Required]
       [DisplayName("Is Active")]
       public bool IsActive { get; set; }


    }
}

