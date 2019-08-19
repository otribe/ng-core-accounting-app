using NGAccounts.Data;
using NGAccounts.Models;
using NGAccounts.Repo;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace NGAccounts.Service
{
    public class AuthLoginService: Repository<User>, IAuthLoginService
    {
        public AuthLoginService(ApplicationContext dbContext) : base(dbContext) { }


        public User ValidUser(string userName)
        { 
            return this.GetAll().FirstOrDefault(i => i.UserName == userName);
        }
    }
}
