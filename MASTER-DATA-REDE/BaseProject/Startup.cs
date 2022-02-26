using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Jogadores;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.Families;
using DDDSample1.Infrastructure.IntroductionRequests;
using DDDSample1.Infrastructure.Ligacoes;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Ligacoes;
using System;

namespace DDDSample1
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>{
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            if(_env.IsDevelopment()){
                Console.WriteLine("Dev");
                services.AddDbContext<DDDSample1DbContext>(opt =>
                    opt.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("DevDbConnection"))
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
            }else if(_env.IsProduction()){
                Console.WriteLine("Prod");
                //prod database
                services.AddDbContext<DDDSample1DbContext>(opt =>
                    opt.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("AzureDbConnection"))
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
                services.BuildServiceProvider().GetService<DDDSample1DbContext>().Database.Migrate();
            } else if(_env.IsEnvironment("Testing")){
                Console.WriteLine("Testing");
                services.AddDbContext<DDDSample1DbContext>(opt =>
                        opt.UseLazyLoadingProxies().UseInMemoryDatabase("DDDSample1DB")
                        .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
            }
            
            

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                Console.WriteLine("Dev profile, set Local SQL database");
                app.UseDeveloperExceptionPage();
            } else if(env.IsEnvironment("Testing")) {
                Console.WriteLine("Config in memory database");
            } else if(env.IsProduction()){
                Console.WriteLine("Set Azure database");

            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors("MyPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IJogadorRepository,JogadorRepository>();
            services.AddTransient<JogadorService>();

            services.AddTransient<IProductRepository,ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository,FamilyRepository>();
            services.AddTransient<FamilyService>();

            services.AddTransient<IIntroductionRequestRepository, IntroductionRequestRepository>();
            services.AddTransient<IIntroductionRequestService,IntroductionRequestService>();

            services.AddTransient<ILigacaoRepository,LigacaoRepository>();
            services.AddTransient<ILigacaoService,LigacaoService>();
        }
    }
}
