# Architecture

This document describes the layered structure of the backend and explains why each layer exists. The goal is to keep responsibilities cleanly separated so that individual pieces can be understood, tested, and changed independently.

## Overview

```
Client Request
      │
      ▼
  server.js          ← starts the HTTP listener, nothing else
      │
      ▼
    app.js            ← wires up middleware and mounts routes
      │
      ▼
  middleware/         ← cross-cutting concerns (validation, 404, etc.)
      │
      ▼
   routes/            ← maps HTTP verbs + paths to controller functions
      │
      ▼
 controllers/         ← unpacks the request, calls the service, sends a response
      │
      ▼
  services/           ← business logic and data shaping
      │
      ▼
 repositories/        ← raw database queries
      │
      ▼
   config/db.js       ← database connection
      │
      ▼
    MySQL
```

## Layers in Detail

### `server.js`

Sole job: import the configured app and call `app.listen()`. Keeping this separate from `app.js` makes it possible to import the app in tests without actually binding to a port.

### `app.js`

Creates the Express instance, registers global middleware (`express.json()`, custom middleware), mounts route modules, and attaches the 404 catch-all at the bottom.

Nothing in this file touches the database or knows anything about products. It only knows *which* middleware and routes to load.

### Routes (`routes/`)

Each route file creates an `express.Router()`, defines HTTP verb + path combinations, and maps them to controller functions. Route-specific middleware (like `validatePagination`) is attached here.

Routes do not contain any logic. They are a mapping table.

**Current file:** `product.routes.js`

```
GET /products  →  validatePagination()  →  productController.getData
```

### Controllers (`controllers/`)

Controllers sit between the HTTP layer and the business layer. Their responsibilities:

1. Extract what's needed from the request (`req.params`, `req.query`, `req.body`, or custom properties like `req.page`)
2. Call the appropriate service method
3. Send back an HTTP response with the right status code

Controllers do not query the database. They do not compute pagination offsets. They pass data in and format data out.

### Services (`services/`)

This is where business rules live. The product service:

- Calculates pagination offset from the page number
- Asks the repository for the total count and the current page of data
- Decides what constitutes an error (e.g., page exceeds total pages)
- Shapes the response payload (data + pagination metadata)

Services have no awareness of `req`, `res`, or HTTP status codes. They receive plain arguments and return plain objects.

### Repositories (`repositories/`)

Each repository is responsible for a single database table (or a closely related group of tables). It exports functions that run parameterized SQL queries and return raw row data.

The product repository exposes two operations:

| Function | Query |
| -------- | ----- |
| `getData(limit, offset)` | `SELECT name, price, stock FROM product_express_db ORDER BY id LIMIT ? OFFSET ?` |
| `count()` | `SELECT COUNT(*) AS total FROM product_express_db` |

Repositories never interpret the data they return — that's the service's job.

### Config (`config/`)

`db.js` sets up the MySQL connection using `mysql2/promise`. It reads credentials from `.env` via `dotenv`.

### Middleware (`middleware/`)

Reusable functions that intercept requests before they hit the controller.

| File | Purpose |
| ---- | ------- |
| `validatePagination.js` | Parses `req.query.page`, validates it's a positive integer, and attaches the result to `req.page`. Returns 400 on bad input. |
| `notFound.js` | Catch-all registered after all routes. Returns 404 for any unmatched path. |

### Utils (`utils/`)

Small helper functions shared across layers.

| File | Purpose |
| ---- | ------- |
| `response.js` | `sendResponse(res, statusCode, data)` — standardizes JSON response formatting so every endpoint returns a consistent shape. |

## Request Lifecycle

Here's what happens when a client hits `GET /products?page=2`:

```
1. Express receives the request
2. express.json() parses the body (no-op for GET, but registered globally)
3. Request matches /products → enters product.routes.js
4. validatePagination() middleware runs:
   - Reads req.query.page → "2"
   - Converts to number → 2
   - Validates: is integer, > 0 → passes
   - Sets req.page = 2
   - Calls next()
5. productController.getData runs:
   - Reads req.page → 2
   - Calls productService.getData(2)
6. productService.getData runs:
   - Calculates offset: (2 - 1) * 10 = 10
   - Calls productRepository.count() → 15
   - Calculates totalPages: ceil(15 / 10) = 2
   - Checks page <= totalPages → passes
   - Calls productRepository.getData(10, 10)
   - Returns { success, data, pagination }
7. Controller receives the result, sends 200 with JSON body
```

## Design Decisions

**Why no ORM?** This project is about learning Express and understanding what happens between a request and a response. Writing raw SQL keeps the database interaction visible and explicit.

**Why separate service and repository?** It seems redundant for a project this small, and honestly, it is. But the pattern is worth practicing now so it's familiar when working on larger codebases where services coordinate multiple repositories or enforce complex rules.

**Why `sendResponse()` helper instead of calling `res.json()` directly?** Consistency. Every response goes through one function, so if the response format needs to change later, there's only one place to update.
