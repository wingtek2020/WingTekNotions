using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WingTekAngels.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedBlogPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "BlogPostId", "Content", "IsPublished", "PublishedUtc", "Slug", "Summary", "Title" },
                values: new object[,]
                {
                    { 1, "<p>Welcome to WingTek Angels! This daily blog will share helpful tips, heartfelt stories, safety reminders, and uplifting thoughts for families needing support and companionship care.</p><p>Whether you’re looking for guidance, comfort, or practical information, you’ll find it here.</p><p>Thank you for being part of this journey.</p>", true, new DateTime(2025, 11, 28, 17, 20, 58, 433, DateTimeKind.Utc).AddTicks(76), "welcome-to-wingtek-angels", "A warm welcome message and what to expect from our new daily blog for families and caregivers.", "Welcome to WingTek Angels – Daily Inspiration & Care Tips" },
                    { 2, "<p>Caring for an aging loved one doesn’t need to feel overwhelming. Here are five gentle, meaningful ways to support them:</p><ul><li>Offer companionship and conversation.</li><li>Create simple daily routines that promote comfort.</li><li>Encourage hydration and light movement.</li><li>Listen with patience and empathy.</li><li>Keep the environment calm and clutter-free.</li></ul><p>Small acts of kindness go a long way.</p>", true, new DateTime(2025, 11, 29, 17, 20, 58, 433, DateTimeKind.Utc).AddTicks(112), "5-gentle-ways-to-support-an-aging-loved-one", "Simple, loving approaches to help seniors feel safe, respected, and supported every day.", "5 Gentle Ways to Support an Aging Loved One" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "BlogPostId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "BlogPostId",
                keyValue: 2);
        }
    }
}
