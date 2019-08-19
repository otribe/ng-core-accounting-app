using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NGAccounts.Models;  
using Microsoft.EntityFrameworkCore;
namespace NGAccounts.Data
{
    public class RoleMap
    {
        public RoleMap(EntityTypeBuilder<Role> tb)
        {
            tb.HasKey(o => o.Id);
            tb.Property(o => o.RoleName).HasMaxLength(50);

        } 
    }
}
