# Express Learning — Product API

A REST API for managing products, built with Express 5 and MySQL. Structured around the separation-of-concerns principle with distinct layers for routing, business logic, and data access.

This project exists primarily as a hands-on learning exercise. The code is intentionally kept readable and close to the fundamentals — no ORMs, no auth layer (yet), no unnecessary abstractions.

## Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MySQL 8
- **Driver:** mysql2/promise

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8 running locally (or remotely — just update `.env`)

### Setup

```bash
cd backend
npm install
```

Copy the example environment file and fill in your database credentials:

```bash
cp .env.example .env
```

Create the database and table:

```sql
CREATE DATABASE IF NOT EXISTS express_db;

USE express_db;

CREATE TABLE product_express_db (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);
```

Seed some data if you want something to query right away:

```sql
INSERT INTO product_express_db (name, price, stock) VALUES
('Mechanical Keyboard', 750000, 25),
('Wireless Mouse', 350000, 40),
('USB-C Hub', 280000, 15),
('Monitor Stand', 450000, 10),
('Desk Lamp', 190000, 30);
```

### Run

```bash
# development (auto-reload via nodemon)
npm run dev

# production
npm start
```

Server starts on `http://localhost:3000` by default.

## API Reference

### Products

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/products` | List products (paginated) |

#### Query Parameters

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| `page` | integer | `1` | Page number. Must be a positive integer. |

Results return 10 items per page.

#### Example Request

```
GET /products?page=2
```

#### Example Response

```json
{
    "success": true,
    "data": [
        {
            "name": "Desk Lamp",
            "price": "190000.00",
            "stock": 30
        }
    ],
    "pagination": {
        "totalProduct": 15,
        "currentPage": 2,
        "totalPages": 2,
        "limit": 10
    }
}
```

#### Error Responses

| Status | Condition |
| ------ | --------- |
| 400 | `page` is not a valid positive integer |
| 404 | Requested page exceeds total pages |
| 404 | Route does not exist |

## Project Structure

```
backend/
├── server.js                  # Entry point — starts the HTTP server
├── .env                       # Environment variables (not committed)
├── .env.example               # Template for .env
├── package.json
└── src/
    ├── app.js                 # Express app config, middleware, route mounting
    ├── config/
    │   └── db.js              # MySQL connection setup
    ├── routes/
    │   └── product.routes.js  # Route definitions for /products
    ├── controllers/
    │   └── product.controller.js  # Request handling, delegates to service
    ├── services/
    │   └── product.service.js     # Business logic, pagination math
    ├── repositories/
    │   └── product.repository.js  # Raw SQL queries
    ├── middleware/
    │   ├── notFound.js            # 404 catch-all
    │   └── validatePagination.js  # Validates & normalizes page param
    └── utils/
        └── response.js           # Standardized JSON response helper
```

See [`docs/architecture.md`](docs/architecture.md) for a deeper breakdown of how the layers interact.

## Roadmap

- [ ] GET single product by ID
- [ ] POST / PUT / DELETE endpoints
- [ ] Input validation (request body)
- [ ] Error handling middleware (centralized)
- [ ] Authentication & authorization
- [ ] Rate limiting
- [ ] Automated tests

## License

ISC
