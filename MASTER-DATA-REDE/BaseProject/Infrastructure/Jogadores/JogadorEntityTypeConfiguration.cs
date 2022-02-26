using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Ligacoes;
using System;

namespace DDDSample1.Infrastructure.Jogadores
{
    internal class JogadorEntityTypeConfiguration : IEntityTypeConfiguration<Jogador>
    {
        public void Configure(EntityTypeBuilder<Jogador> builder)
        {
            builder.ToTable("Jogadores", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.DataNascimento);
            builder.HasMany<IntroductionRequest>(i => i.IntroductionRequests);
            builder.HasMany<Ligacao>(i => i.Ligacoes);
            //builder.OwnsOne(n => n.Nome);
            builder.Property<string>("Nome").HasColumnName("Nome");
            builder.OwnsOne(n => n.NumTelefone);
            builder.OwnsOne(n => n.DescBreve);
            builder.OwnsOne(n => n.PaisResidencia);
            builder.OwnsOne(n => n.Localidade);
            builder.OwnsOne(n => n.Avatar);
            builder.OwnsOne(n => n.Mood);
            builder.Property<bool>("Active").HasColumnName("Active");
            builder.OwnsMany<Tag>(b => b.TagsInteresse, tags => {
                tags.WithOwner().HasForeignKey("JogadorTagsId");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });
            builder.OwnsOne(b => b.Email);
        }
    }
}