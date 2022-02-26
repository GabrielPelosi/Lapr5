using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Ligacoes;
using System;



namespace DDDSample1.Infrastructure.Ligacoes
{
    public class LigacaoEntityTypeConfiguration : IEntityTypeConfiguration<Ligacao>
    {
        public void Configure(EntityTypeBuilder<Ligacao> builder)
        {
            builder.ToTable("Ligacoes", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasOne<Jogador>(i => i.Jogador1);
            builder.HasOne<Jogador>(i => i.Jogador2);
            builder.OwnsMany<TagsLigacao>(b => b.tagsLigacao, tags => {
                tags.WithOwner().HasForeignKey("LigacaoTagsId");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });
            builder.OwnsOne<ForcaLigacao>(b => b.fLigacao);
        }
    }
}