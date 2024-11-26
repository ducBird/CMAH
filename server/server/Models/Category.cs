namespace server.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; } // Lưu đường dẫn hoặc base64 của ảnh
        public ICollection<Product>? Products { get; set; } // Quan hệ 1-n
        //public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
