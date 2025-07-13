namespace CNotionAPI.Entities.Needles
{
    public class NeedleType
    {
        public int Id { get; set; }

        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string MetricName { get; set; }
        public required string TypeName { get; set; }

        public double Length { get; set; }

        public int NeedleSizeId { get; set; }
        public required NeedleSize NeedleSize { get; set; }
    }
}
