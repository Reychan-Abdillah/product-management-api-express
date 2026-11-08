# API Reference

Base URL: `http://localhost:3000`

---

## Products

### List Products

Returns a paginated list of products.

```
GET /products
```

**Query Parameters**

| Parameter | Type | Required | Default | Description |
| --------- | ---- | -------- | ------- | ----------- |
| `page` | integer | No | `1` | Page number (must be ≥ 1) |

**Response `200 OK`**

```json
{
    "success": true,
    "data": [
        {
            "name": "Mechanical Keyboard",
            "price": "750000.00",
            "stock": 25
        },
        {
            "name": "Wireless Mouse",
            "price": "350000.00",
            "stock": 40
        }
    ],
    "pagination": {
        "totalProduct": 15,
        "currentPage": 1,
        "totalPages": 2,
        "limit": 10
    }
}
```

**Response `200 OK` — Empty table**

```json
{
    "success": true,
    "data": [],
    "pagination": {
        "totalProduct": 0,
        "currentPage": 1,
        "totalPages": 0,
        "limit": 10
    }
}
```

**Response `400 Bad Request` — Invalid page**

```json
{
    "message": "Invalid page"
}
```

Triggered when `page` is not a positive integer (e.g., `?page=abc`, `?page=-1`, `?page=0`, `?page=1.5`).

**Response `404 Not Found` — Page out of range**

```json
{
    "success": false,
    "message": "Page exceeds total pages"
}
```

Triggered when the requested page number is greater than the last available page.

---

## Unmatched Routes

Any request to a path that does not match a defined route returns:

**Response `404 Not Found`**

```json
{
    "message": "Route /whatever not found"
}
```

---

## Notes

- All responses are JSON (`Content-Type: application/json`).
- Pagination is fixed at 10 items per page. This is not configurable via query params at the moment.
- Products are ordered by `id` ascending.
