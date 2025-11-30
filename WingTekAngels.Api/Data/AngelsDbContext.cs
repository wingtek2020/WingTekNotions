using Microsoft.EntityFrameworkCore;
using WingTekAngels.Api.Models;

namespace WingTekAngels.Api.Data
{
    public class AngelsDbContext : DbContext
    {
        public AngelsDbContext(DbContextOptions<AngelsDbContext> options)
            : base(options)
        {
        }

        public DbSet<Service> Services { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Simple configuration
            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(s => s.Name).IsRequired().HasMaxLength(100);
                entity.Property(s => s.Price).HasColumnType("decimal(10,2)");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(c => c.FullName).IsRequired().HasMaxLength(150);
            });

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.Property(a => a.Status)
                      .IsRequired()
                      .HasMaxLength(20);

                entity.HasOne(a => a.Service)
                      .WithMany(s => s.Appointments)
                      .HasForeignKey(a => a.ServiceId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(a => a.Customer)
                      .WithMany(c => c.Appointments)
                      .HasForeignKey(a => a.CustomerId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<BlogPost>().HasData(
    new BlogPost
    {
        BlogPostId = 1,
        Title = "Welcome to WingTek Angels – Daily Inspiration & Care Tips",
        Slug = "welcome-to-wingtek-angels",
        Summary = "A warm welcome message and what to expect from our new daily blog for families and caregivers.",
        Content =
            "<p>Welcome to WingTek Angels! This daily blog will share helpful tips, heartfelt stories, safety reminders, and uplifting thoughts for families needing support and companionship care.</p>" +
            "<p>Whether you’re looking for guidance, comfort, or practical information, you’ll find it here.</p>" +
            "<p>Thank you for being part of this journey.</p>",
        PublishedUtc = DateTime.UtcNow.AddDays(-1),
        IsPublished = true
    },
    new BlogPost
    {
        BlogPostId = 2,
        Title = "5 Gentle Ways to Support an Aging Loved One",
        Slug = "5-gentle-ways-to-support-an-aging-loved-one",
        Summary = "Simple, loving approaches to help seniors feel safe, respected, and supported every day.",
        Content =
            "<p>Caring for an aging loved one doesn’t need to feel overwhelming. Here are five gentle, meaningful ways to support them:</p>" +
            "<ul>" +
                "<li>Offer companionship and conversation.</li>" +
                "<li>Create simple daily routines that promote comfort.</li>" +
                "<li>Encourage hydration and light movement.</li>" +
                "<li>Listen with patience and empathy.</li>" +
                "<li>Keep the environment calm and clutter-free.</li>" +
            "</ul>" +
            "<p>Small acts of kindness go a long way.</p>",
        PublishedUtc = DateTime.UtcNow,
        IsPublished = true
    }
);

        }
    }
}
