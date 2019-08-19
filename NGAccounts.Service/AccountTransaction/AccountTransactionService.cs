using NGAccounts.Models;
using NGAccounts.Repo;  
using NGAccounts.Data;
namespace NGAccounts.Service
{
    public class AccountTransactionService : Repository<AccountTransaction>, IAccountTransactionService
    {
        public AccountTransactionService(ApplicationContext dbContext) : base(dbContext) {}

        //you may write more service method here as per your need.
    }
}

