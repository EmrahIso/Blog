# Authentication (Draft)

## Status

Authentication strategy is not finalized.

Current implementation may change (header-based auth or alternative approach).

---

## Current State

At the moment, the API may use JWT-based authentication.

Exact implementation details will be updated once finalized.

---

## Protected Routes

Some routes require authentication, depending on implementation:

- POST /posts
- GET /posts/all
- PUT /posts/:id
- PATCH /posts/:id
- DELETE /posts/:id

- GET /auth/me

---

## Note

This section will be updated when authentication flow is finalized.
