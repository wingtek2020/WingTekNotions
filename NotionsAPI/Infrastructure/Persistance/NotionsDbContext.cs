using CNotionAPI.Entities.Needles;
using CNotionAPI.Entities.Patterns;
using CNotionAPI.Patterns;
using CNotionAPI.Yarn;
using Microsoft.EntityFrameworkCore;

namespace CNotionAPI.Infrastructure.Persistance
{
    public class NotionsDbContext : DbContext
    {
        public NotionsDbContext(DbContextOptions<NotionsDbContext> options) : base(options)
        {
           
            Needles = Set<Needle>();
            NeedleSizes = Set<NeedleSize>();
            NeedleTypes = Set<NeedleType>();
            Patterns = Set<Pattern>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<User>()
              .HasMany(u => u.AuthoredPatterns)
              .WithOne(p => p.Author)
              .HasForeignKey(p => p.AuthorId)
              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PatternNeedleSize>()
                .HasOne(pn => pn.Pattern)
                .WithMany(p => p.NeedleSizes)
                .HasForeignKey(pn => pn.PatternId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Needle> Needles { get; set; }
        public DbSet<NeedleSize> NeedleSizes { get; set; }
        public DbSet<NeedleType> NeedleTypes { get; set; }
        public DbSet<Pattern> Patterns { get; set; }

       
    }
}
