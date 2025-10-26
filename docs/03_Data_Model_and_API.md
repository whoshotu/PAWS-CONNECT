
# Paws Connect: Data Model and API Specification

This document outlines the data model and API endpoints for Paws Connect, with a focus on the AI-related components.

## 1. Data Model (Core Entities)

Below are the primary data entities. We will use a PostgreSQL database with PostGIS for geospatial queries.

### User
- `user_id` (UUID, Primary Key)
- `email` (String, Unique)
- `password_hash` (String)
- `username` (String, Unique)
- `full_name` (String)
- `profile_picture_url` (String)
- `bio` (Text)
- `location` (Geography, Point)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Pet
- `pet_id` (UUID, Primary Key)
- `owner_id` (UUID, Foreign Key to User)
- `name` (String)
- `breed` (String)
- `age` (Integer)
- `size` (String, e.g., "small", "medium", "large")
- `photos` (JSONB, array of URLs)
- `temperament` (Text)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Post
- `post_id` (UUID, Primary Key)
- `author_id` (UUID, Foreign Key to User)
- `content_type` (String, e.g., "image", "video", "text")
- `media_url` (String)
- `caption` (Text)
- `location` (Geography, Point)
- `created_at` (Timestamp)

### Service
- `service_id` (UUID, Primary Key)
- `name` (String)
- `category` (String, e.g., "vet", "groomer", "store")
- `location` (Geography, Point)
- `contact_info` (JSONB)
- `website` (String)
- `created_at` (Timestamp)

--- 

## 2. AI-Specific Data Entities

### AI_Recommendation_Log
This table logs the recommendations served to users, which is crucial for improving the model and providing transparency.
- `log_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to User)
- `recommendation_type` (String, e.g., "service", "friend")
- `context` (JSONB, data used to generate the recommendation)
- `output` (JSONB, the recommended items)
- `feedback` (String, e.g., "clicked", "dismissed")
- `created_at` (Timestamp)

### Report
This table stores reports made by users or the AI moderation system.
- `report_id` (UUID, Primary Key)
- `reporter_id` (UUID, Foreign Key to User, nullable for AI)
- `content_id` (UUID, e.g., post_id, user_id)
- `reason` (Text)
- `status` (String, e.g., "pending", "resolved")
- `ai_confidence_score` (Float, confidence level if flagged by AI)
- `created_at` (Timestamp)

### Insights
This table stores aggregated metrics for the admin dashboard.
- `insight_id` (UUID, Primary Key)
- `metric_name` (String, e.g., "daily_active_users", "engagement_rate")
- `value` (Float)
- `date` (Date)
- `created_at` (Timestamp)

--- 

## 3. API Endpoints (AI Layer)

These endpoints will be part of a separate AI microservice built with Python (FastAPI).

### `POST /ai/recommendations`
- **Description:** Generates personalized recommendations for a user.
- **Request Body:**
  ```json
  {
    "user_id": "user-uuid",
    "type": "service" | "friend",
    "context": {
      "location": {"lat": 40.7128, "lon": -74.0060},
      "pet_breed": "Golden Retriever"
    }
  }
  ```
- **Response (Success):**
  ```json
  {
    "recommendations": [
      { "service_id": "service-uuid-1", "score": 0.98 },
      { "service_id": "service-uuid-2", "score": 0.95 }
    ]
  }
  ```

### `POST /ai/moderate`
- **Description:** Analyzes content (text or image) and returns a moderation decision.
- **Request Body:**
  ```json
  {
    "content_type": "image" | "text",
    "data": "base64-encoded-image-string" | "text content here"
  }
  ```
- **Response (Success):**
  ```json
  {
    "is_appropriate": false,
    "flags": ["hate_speech", "violence"],
    "confidence_score": 0.92
  }
  ```

### `POST /ai/caption`
- **Description:** Generates a caption and relevant hashtags for an image.
- **Request Body:**
  ```json
  {
    "image": "base64-encoded-image-string"
  }
  ```
- **Response (Success):**
  ```json
  {
    "caption": "A beautiful golden retriever playing in the park.",
    "hashtags": ["#dogsofinstagram", "#goldenretriever", "#parklife"]
  }
  ```
