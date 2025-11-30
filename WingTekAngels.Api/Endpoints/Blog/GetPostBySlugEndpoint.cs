using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using WingTekAngels.Api.Data;
using WingTekAngels.Api.Models.Dto;

namespace WingTekAngels.Api.Endpoints.Blog;

public class GetPostBySlugRequest
{
    public string Slug { get; set; } = string.Empty;
}

public class GetPostBySlugEndpoint
    : Endpoint<GetPostBySlugRequest, BlogPostDto>
{
    private readonly AngelsDbContext _db;

    public GetPostBySlugEndpoint(AngelsDbContext db)
    {
        _db = db;
    }

    public override void Configure()
    {
        // This binds {slug} in the route to GetPostBySlugRequest.Slug
        Get("/api/blog/{slug}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetPostBySlugRequest req, CancellationToken ct)
    {
        // 🔹 400 Bad Request if slug is empty
        if (string.IsNullOrWhiteSpace(req.Slug))
        {
            // This immediately sends a 400 with an error payload and stops execution
            ThrowError(r => r.Slug, "Slug is required.");
            return; // not strictly needed, but nice for readability
        }

        var post = await _db.BlogPosts
            .Where(p => p.IsPublished && p.Slug == req.Slug)
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
            .SingleOrDefaultAsync(ct);

        // 🔹 404 if no post
        if (post is null)
        {
            await Send.NotFoundAsync(ct);
            return;
        }

        // 🔹 200 OK with body
        await Send.OkAsync(post, ct);
    }
}
