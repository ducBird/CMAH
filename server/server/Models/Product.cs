namespace server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; }

        // Foreign Key
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public ICollection<OrderDetails> OrderDetails { get; set; } // Quan hệ n-n với Order thông qua OrderDetails
    }
}
