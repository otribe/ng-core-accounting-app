using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NGAccounts.Models;  
using Microsoft.EntityFrameworkCore;
namespace NGAccounts.Data
{
    public class AccountTransactionMap
    {
        public AccountTransactionMap(EntityTypeBuilder<AccountTransaction> tb)
        {
            tb.HasKey(o => o.Id);
            tb.HasOne(c => c.LedgerAccount_DebitLedgerAccountId).WithMany(o => o.AccountTransaction_DebitLedgerAccountIds).HasForeignKey(o => o.DebitLedgerAccountId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
            tb.HasOne(c => c.LedgerAccount_CreditLedgerAccountId).WithMany(o => o.AccountTransaction_CreditLedgerAccountIds).HasForeignKey(o => o.CreditLedgerAccountId).IsRequired(true);
            tb.Property(o => o.Remarks).HasMaxLength(500);

        } 
    }
}
