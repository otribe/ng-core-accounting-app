using NGAccounts.Models;
using NGAccounts.Repo;  
using NGAccounts.Data;
namespace NGAccounts.Service
{
    public class GeneralSettingService : Repository<GeneralSetting>, IGeneralSettingService
    {
        public GeneralSettingService(ApplicationContext dbContext) : base(dbContext) {}

        //you may write more service method here as per your need.
    }
}

