﻿namespace server.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string? Image { get; set; }

        public ICollection<Order> Orders { get; set; } // Quan hệ 1-n
    }
}
