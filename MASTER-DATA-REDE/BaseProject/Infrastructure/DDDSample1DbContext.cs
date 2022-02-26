using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Categories;
using DDDSample1.Domain.Products;
using DDDSample1.Domain.Families;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.ConnectionRequests;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Infrastructure.Categories;
using DDDSample1.Infrastructure.Products;
using DDDSample1.Infrastructure.IntroductionRequests;
using DDDSample1.Infrastructure.Jogadores;
using DDDSample1.Infrastructure.ConnectionRequests;
using DDDSample1.Infrastructure.Ligacoes;


namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<IntroductionRequest> IntroductionRequests { get; set; }

        public DbSet<ConnectionRequest> ConnectionRequests { get; set; }

        public DbSet<Jogador> Jogadores { get; set; }

        public DbSet<Ligacao> Ligacoes { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new IntroductionRequestEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new JogadorEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ConnectionRequestTypeConfiguration());
            modelBuilder.ApplyConfiguration(new LigacaoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            
        }
    }
}