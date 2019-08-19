using NGAccounts.Models;
using NGAccounts.Repo; 
namespace NGAccounts.Service
{
    public interface IAuthLoginService : IRepository<User>
    {
        User ValidUser(string userName);
    }
}
