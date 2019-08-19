using NGAccounts.Models;
using NGAccounts.Repo;  
using NGAccounts.Data;
namespace NGAccounts.Service
{
    public class RoleUserService : Repository<RoleUser>, IRoleUserService
    {
        public RoleUserService(ApplicationContext dbContext) : base(dbContext) {}

        //you may write more service method here as per your need.
    }
}

