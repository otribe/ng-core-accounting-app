using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NGAccounts.Data;
using NGAccounts.Repo;
using NGAccounts.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using AutoMapper;

namespace NGAccounts.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper();
            services.AddCors();
            //allow Cors end

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //use sql server
            //services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), i => i.UseRowNumberForPaging()));
            services.AddDbContext<ApplicationContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection"), mysqlOptions => { mysqlOptions.ServerVersion(new Version(5, 7, 14), ServerType.MySql); }));


            //add service reference
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IAuthLoginService, AuthLoginService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleUserService, RoleUserService>();
            services.AddTransient<IMenuService, MenuService>();
            services.AddTransient<IMenuPermissionService, MenuPermissionService>();
            services.AddTransient<IAppSettingService, AppSettingService>();
            services.AddTransient<IGeneralSettingService, GeneralSettingService>();
            services.AddTransient<ILedgerAccountService, LedgerAccountService>();
            services.AddTransient<IAccountTransactionService, AccountTransactionService>();
            services.AddTransient<IMapping, Mapping>();

 
            //Jwt Authentication 
            var key = System.Text.Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:JWT_Secret"].ToString());

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });
            //Jwt Authentication end
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
 
            app.UseCors(builder =>
            builder.WithOrigins(Configuration["ApplicationSettings:Client_URL"].ToString())
            .AllowAnyHeader()
            .AllowAnyMethod()
            );

            app.UseAuthentication();

            app.UseMvc();
 
        }
    }
}




