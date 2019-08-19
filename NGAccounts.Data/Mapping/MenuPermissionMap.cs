using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NGAccounts.Models;  
using Microsoft.EntityFrameworkCore;
namespace NGAccounts.Data
{
    public class MenuPermissionMap
    {
        public MenuPermissionMap(EntityTypeBuilder<MenuPermission> tb)
        {
            tb.HasKey(o => o.Id);
            tb.HasOne(c => c.Menu_MenuId).WithMany(o => o.MenuPermission_MenuIds).HasForeignKey(o => o.MenuId).IsRequired(false).OnDelete(DeleteBehavior.Cascade);
            tb.HasOne(c => c.Role_RoleId).WithMany(o => o.MenuPermission_RoleIds).HasForeignKey(o => o.RoleId).IsRequired(true).OnDelete(DeleteBehavior.Cascade);
            tb.HasOne(c => c.User_UserId).WithMany(o => o.MenuPermission_UserIds).HasForeignKey(o => o.UserId).IsRequired(false).OnDelete(DeleteBehavior.Cascade);

        } 
    }
}
