using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Jogadores;
using System;


namespace DDDSample1.Infrastructure.IntroductionRequests
{
    internal class IntroductionRequestEntityTypeConfiguration : IEntityTypeConfiguration<IntroductionRequest>
    {
        public void Configure(EntityTypeBuilder<IntroductionRequest> builder)
        {
            builder.ToTable("IntroductionRequests", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasOne<Jogador>(b => b.RequestingUser);
            builder.HasOne<Jogador>(i => i.BridgeUser);
            builder.HasOne<Jogador>(i => i.ObjectiveUser);
            builder.OwnsMany<IntroductionRequestTag>(b => b.IntroductionRequestTags, tags => {
                tags.WithOwner().HasForeignKey("IntroTagsId");
                tags.Property<int>("Id");
                tags.HasKey("Id");
            });
            builder.OwnsOne(b => b.BridgeUserText);
            builder.OwnsOne(b => b.ObjectiveUserText);
        }
    }
}