# Database Schema

This project uses MySQL 8. All tables live in the `express_db` database.

## Setup

```sql
CREATE DATABASE IF NOT EXISTS express_db;
USE express_db;
```

---

## Tables

### `product_express_db`

Stores the product catalog.

```sql
CREATE TABLE product_express_db (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(255) NOT NULL,
    price   DECIMAL(10, 2) NOT NULL,
    stock   INT NOT NULL DEFAULT 0
);
```

| Column | Type | Constraints | Description |
| ------ | ---- | ----------- | ----------- |
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | Product name |
| `price` | DECIMAL(10,2) | NOT NULL | Price in IDR (stored as decimal to avoid floating-point issues) |
| `stock` | INT | NOT NULL, DEFAULT 0 | Available quantity |

### Seed Data

Optional — useful for development and testing.

```sql
INSERT INTO product_express_db (name, price, stock) VALUES
('Mechanical Keyboard', 750000.00, 25),
('Wireless Mouse', 350000.00, 40),
('USB-C Hub', 280000.00, 15),
('Monitor Stand', 450000.00, 10),
('Desk Lamp', 190000.00, 30),
('Webcam 1080p', 420000.00, 20),
('Laptop Sleeve 14"', 150000.00, 50),
('Cable Management Kit', 95000.00, 35),
('Headphone Stand', 175000.00, 18),
('Mousepad XL', 120000.00, 45),
('USB Microphone', 680000.00, 12),
('Phone Stand', 85000.00, 60),
('Screen Protector', 45000.00, 100),
('Ethernet Cable 3m', 35000.00, 80),
('Power Strip 6-port', 110000.00, 55);
```

This inserts 15 rows — enough to test pagination (page 1 = 10 items, page 2 = 5 items).

## Queries Used by the Application

The repository layer (`product.repository.js`) runs these queries:

```sql
-- Fetch a page of products
SELECT name, price, stock
FROM product_express_db
ORDER BY id
LIMIT ? OFFSET ?;

-- Count total products (for pagination math)
SELECT COUNT(*) AS total
FROM product_express_db;
```

Both queries use parameterized placeholders (`?`) to prevent SQL injection.
