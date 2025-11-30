namespace WingTekAngels.Api.Models.Dto
{
    public class BlogPostDto
    {
        public int BlogPostId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublishedUtc { get; set; }
        public bool IsPublished { get; set; }
    }
}
