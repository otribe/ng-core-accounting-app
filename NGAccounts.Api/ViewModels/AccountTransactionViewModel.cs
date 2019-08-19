using System;
namespace NGAccounts.Api.ViewModels
{
    public class AccountTransactionViewModel
    { 
        public int Id { get; set; }

        public string DebitLedgerAccountId { get; set; }

        public string CreditLedgerAccountId { get; set; }

        public Decimal Amount { get; set; }

        public string Remarks { get; set; }

        public DateTime TransactionDate { get; set; }

        public DateTime? DateAdded { get; set; }

        public int? ModifiedBy { get; set; }

        public DateTime? DateModied { get; set; }

        public int? AddedBy { get; set; }

        public bool IsActive { get; set; }


    }
}

