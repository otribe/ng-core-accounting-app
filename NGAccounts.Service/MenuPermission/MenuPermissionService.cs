using NGAccounts.Models;
using NGAccounts.Repo;  
using NGAccounts.Data;
namespace NGAccounts.Service
{
    public class MenuPermissionService : Repository<MenuPermission>, IMenuPermissionService
    {
        public MenuPermissionService(ApplicationContext dbContext) : base(dbContext) {}

        //you may write more service method here as per your need.
    }
}

