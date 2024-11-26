namespace server.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string Password { get; set; }
        public string? Image { get; set; }

        public ICollection<Order> Orders { get; set; } // Quan hệ 1-n
    }
}
