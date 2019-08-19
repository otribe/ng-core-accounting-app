using Microsoft.EntityFrameworkCore;
using NGAccounts.Models;

namespace NGAccounts.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {  
            new RoleMap(modelBuilder.Entity<Role>());
            new UserMap(modelBuilder.Entity<User>());
            new RoleUserMap(modelBuilder.Entity<RoleUser>());
            new MenuMap(modelBuilder.Entity<Menu>());
            new MenuPermissionMap(modelBuilder.Entity<MenuPermission>());
            new AppSettingMap(modelBuilder.Entity<AppSetting>());
            new GeneralSettingMap(modelBuilder.Entity<GeneralSetting>());
            new LedgerAccountMap(modelBuilder.Entity<LedgerAccount>());
            new AccountTransactionMap(modelBuilder.Entity<AccountTransaction>());

            base.OnModelCreating(modelBuilder);
        }
    }
}
