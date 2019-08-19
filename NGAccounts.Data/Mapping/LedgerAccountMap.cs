using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NGAccounts.Models;  
using Microsoft.EntityFrameworkCore;
namespace NGAccounts.Data
{
    public class LedgerAccountMap
    {
        public LedgerAccountMap(EntityTypeBuilder<LedgerAccount> tb)
        {
            tb.HasKey(o => o.Id);
            tb.Property(o => o.Name).HasMaxLength(250);
            tb.HasOne(c => c.LedgerAccount2).WithMany(o => o.LedgerAccount_ParentIds).HasForeignKey(o => o.ParentId);

        } 
    }
}
