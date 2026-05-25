# API Endpoints

## Base URL

http://localhost:PORT/api

---

# Posts

## GET /posts

Returns all published posts.

Auth: No

Response:

```json
[
  {
    "id": 1,
    "title": "Post title",
    "content": "Post content",
    "published": true,
    "imageUrl": "https://example.com/image.jpg"
  }
]
```

---

## GET /posts/:id

Returns a single post by ID.

Auth: No

Response:
{
"id": 1,
"title": "Post title",
"content": "Post content",
"published": true,
"imageUrl": "https://example.com/image.jpg"
}

---

## POST /posts

Creates a new post.

Auth: Yes

Request Body:
{
"title": "Title",
"content": "Content",
"imageUrl": "https://example.com/image.jpg"
}

Response:
{
"id": 2,
"title": "Title",
"content": "Content",
"imageUrl": "https://example.com/image.jpg"
}

---

## PATCH /posts/:id

Updates an existing post.

Auth: Yes

Request Body:
{
"title": "Updated title",
"content": "Updated content",
"imageUrl": "https://example.com/image.jpg"
}

Response:
{
"message": "Post updated"
}

---

## DELETE /posts/:id

Deletes a post.

Auth: Yes

Response:
{
"message": "Post deleted"
}
