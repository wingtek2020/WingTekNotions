namespace CNotionAPI.Entities.Needles
{
    public class NeedleSize
    {
        public int Id { get; set; }

        public double Metric { get; set; }  
        public string? Us { get; set; }     
        public bool IsHook { get; set; }    

        public required ICollection<NeedleType> NeedleTypes { get; set; }
    }
}
