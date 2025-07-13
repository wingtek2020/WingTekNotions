using CNotionAPI.Patterns;

namespace CNotionAPI.Entities.Patterns
{
    public class PatternNeedleSize
    {
        public int Id { get; set; }

        public int PatternId { get; set; }
        public required Pattern Pattern { get; set; }

        public double SizeMetric { get; set; }
        public string? UsSize { get; set; }
        public string? Name { get; set; }
    }
}
