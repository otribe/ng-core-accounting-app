using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NGAccounts.Models;  
using Microsoft.EntityFrameworkCore;
namespace NGAccounts.Data
{
    public class UserMap
    {
        public UserMap(EntityTypeBuilder<User> tb)
        {
            tb.HasKey(o => o.Id);
            tb.Property(o => o.UserName).HasMaxLength(100);
            tb.Property(o => o.Password).HasMaxLength(100);
            tb.Property(o => o.FirstName).HasMaxLength(100);
            tb.Property(o => o.LastName).HasMaxLength(100);
            tb.Property(o => o.ProfilePicture).HasMaxLength(100);
            tb.Property(o => o.Email).HasMaxLength(50);
            tb.Property(o => o.ContactNumber).HasMaxLength(15);
            tb.Property(o => o.Address).HasMaxLength(500);
            tb.Property(o => o.About).HasMaxLength(500);
            tb.Property(o => o.ChangePasswordCode).HasMaxLength(50);
            tb.HasOne(c => c.Role_RoleId).WithMany(o => o.User_RoleIds).HasForeignKey(o => o.RoleId).IsRequired(true);

        } 
    }
}
