using System.ComponentModel.DataAnnotations;

namespace CNotionAPI.Entities.Needles
{
    public class Needle
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Type { get; set; } 

        [Required]
        public double Size { get; set; }

        public string? UsSize { get; set; }
        public string? MetricSize { get; set; }

        public double? Length { get; set; } 
        public string? Material { get; set; }
    }
}
