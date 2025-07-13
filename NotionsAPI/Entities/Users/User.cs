namespace CNotionAPI.Yarn
{
    using CNotionAPI.Entities.Needles;
    using CNotionAPI.Patterns;
    using Microsoft.Extensions.FileSystemGlobbing.Internal;
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Username { get; set; }

        [MaxLength(100)]
        public string? FirstName { get; set; }

        [MaxLength(200)]
        public string? Location { get; set; }

        public string? AboutMe { get; set; }
        public string? AboutMeHtml { get; set; }

        [MaxLength(2)]
        public string? ProfileCountryCode { get; set; }

        public string? TinyPhotoUrl { get; set; }
        public string? SmallPhotoUrl { get; set; }
        public string? PhotoUrl { get; set; }
        public string? LargePhotoUrl { get; set; }

        [MaxLength(100)]
        public string? FaveCurse { get; set; }

        [MaxLength(200)]
        public string? FaveColors { get; set; }

        public DateOnly? Birthday { get; set; }
        public ICollection<Pattern>? AuthoredPatterns { get; set; }
        public ICollection<Needle>? Needles { get; set; }
    }

}
