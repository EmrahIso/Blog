# Error Handling (Draft)

## Status

Error handling structure is not fully standardized yet.

Custom error classes and unified response format may be introduced later.

---

## Current Behavior

At the moment, errors are returned in a basic JSON format depending on route implementation.

Example:

```json
{
  "message": "Error message"
}
```

---

## Planed Structure

A unified error format may be introduced later:

```json
{
  "status": "error",
  "message": "Error message",
  "code": "ERROR_CODE"
}
```

---

## Notes

This document will be updated once error handling is standardized.
