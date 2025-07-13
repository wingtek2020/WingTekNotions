using CNotionAPI.Entities.Patterns;
using CNotionAPI.Yarn;
using System.ComponentModel.DataAnnotations;

namespace CNotionAPI.Patterns
{
    public class Pattern
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public required string Name { get; set; }

        public string? Description { get; set; }

        public DateTime? PublishedDate { get; set; }

        public decimal? Gauge { get; set; }
        public decimal? RowGauge { get; set; }

        public int? Yardage { get; set; }
        public string? YarnWeightDescription { get; set; }

        public double? RatingAverage { get; set; }
        public int? RatingCount { get; set; }

        public double? DifficultyAverage { get; set; }
        public int? DifficultyCount { get; set; }

        public bool Free { get; set; }
        public bool Downloadable { get; set; }

        public string? PdfUrl { get; set; }
        public string? Url { get; set; }
        public int AuthorId { get; set; }
        public required User Author { get; set; }

        public ICollection<PatternNeedleSize>? NeedleSizes { get; set; }
    }

}

