using NGAccounts.Models;
using NGAccounts.Repo;  
using NGAccounts.Data;
namespace NGAccounts.Service
{
    public class UserService : Repository<User>, IUserService
    {
        public UserService(ApplicationContext dbContext) : base(dbContext) {}

        //you may write more service method here as per your need.
    }
}

