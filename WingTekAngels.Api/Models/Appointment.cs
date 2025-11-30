namespace WingTekAngels.Api.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }

        public int ServiceId { get; set; }
        public Service Service { get; set; } = null!;

        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }

        public DateTime StartTimeUtc { get; set; }
        public DateTime EndTimeUtc { get; set; }

        public string Status { get; set; } = "Booked"; // Booked/Cancelled/Completed

        public string? Notes { get; set; }
    }
}
