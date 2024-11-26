using Microsoft.EntityFrameworkCore;
using server.Models;
using System;

namespace server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Cấu hình quan hệ n-n giữa Product và Order thông qua OrderDetails
            modelBuilder.Entity<OrderDetails>()
                .HasKey(od => new { od.OrderId, od.ProductId }); // Thiết lập composite key

            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.Product)
                .WithMany(p => p.OrderDetails)
                .HasForeignKey(od => od.ProductId);

            // Các quan hệ khác (1-n) được EF tự động cấu hình dựa trên convention
            // Thiết lập decimal cho các cột | nếu kh sẽ có warning 
            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasPrecision(18, 2); // or .HasColumnType("decimal(18, 2)"); // Precision: 18, Scale: 2

            modelBuilder.Entity<OrderDetails>()
                .Property(od => od.UnitPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);
        }
    }
}
