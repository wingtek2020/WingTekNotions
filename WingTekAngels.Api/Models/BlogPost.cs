namespace WingTekAngels.Api.Models
{
    public class BlogPost
    {
        public int BlogPostId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Slug { get; set; } = string.Empty; // unique

        public string Summary { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty; // can be HTML

        public DateTime PublishedUtc { get; set; }

        public bool IsPublished { get; set; } = true;
    }

}
