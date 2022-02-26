using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.ConnectionRequests;
using System;

namespace DDDSample1.Infrastructure.ConnectionRequests
{
    internal class ConnectionRequestTypeConfiguration : IEntityTypeConfiguration<ConnectionRequest>
    {
        public void Configure(EntityTypeBuilder<ConnectionRequest> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            
            builder.ToTable("ConnectionRequest", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.Property<bool>("_active").HasColumnName("Active");
        }
    }

}