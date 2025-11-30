using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using WingTekAngels.Api.Data;
using WingTekAngels.Api.Models.Dto;

namespace WingTekAngels.Api.Endpoints.Blog;

public class GetAllPostsEndpoint
    : EndpointWithoutRequest<List<BlogPostDto>>
{
    private readonly AngelsDbContext _db;

    public GetAllPostsEndpoint(AngelsDbContext db)
    {
        _db = db;
    }

    public override void Configure()
    {
        // GET /api/blog
        Get("/api/blog");
        AllowAnonymous();

        Summary(s =>
        {
            s.Summary = "Retrieve all published blog posts.";
            s.Description =
                "Returns all blog posts that are marked as published, " +
                "ordered by publish date (newest first).";
        });
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var posts = await _db.BlogPosts
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.PublishedUtc)
            .Select(p => new BlogPostDto
            {
                BlogPostId = p.BlogPostId,
                Title = p.Title,
                Slug = p.Slug,
                Summary = p.Summary,
                Content = p.Content,
                PublishedUtc = p.PublishedUtc,
                IsPublished = p.IsPublished
            })
            .ToListAsync(ct);

        await Send.OkAsync(posts, ct);   // 200 + JSON list
    }
}
