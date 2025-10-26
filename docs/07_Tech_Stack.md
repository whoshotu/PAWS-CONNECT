
# Paws Connect: Technology Stack

This document specifies the technology stack for the Paws Connect platform.

## Frontend
- **Web:** React + Next.js
  - *Why:* Enables server-side rendering (SSR) for fast initial page loads and SEO benefits. The React ecosystem provides a rich library of components.
- **Mobile:** React Native + Expo
  - *Why:* Allows for cross-platform development (iOS and Android) from a single codebase. Expo simplifies the development and build process.

## Backend
- **Framework:** Node.js + TypeScript with NestJS
  - *Why:* NestJS provides a structured and scalable architecture for building efficient and reliable server-side applications. TypeScript adds static typing for improved code quality and maintainability.

## Database
- **Primary:** PostgreSQL + PostGIS
  - *Why:* A powerful, open-source object-relational database system. The PostGIS extension provides excellent support for geospatial queries, which are essential for our map-based features.

## AI Layer
- **Recommendation Engine:** Python (FastAPI) + Scikit-learn/TensorFlow
  - *Why:* Python is the industry standard for machine learning. FastAPI is a modern, high-performance web framework for building APIs. We will use vector embeddings for finding similarities between users and services.
- **Image Analysis:** AWS Rekognition or OpenAI Vision API
  - *Why:* Managed services for image captioning and moderation are cost-effective and scalable. They provide powerful, pre-trained models that can be easily integrated into our application.
- **NLP Assistant (PawsBot):** OpenAI GPT-4 or similar API
  - *Why:* Provides state-of-the-art conversational AI capabilities for our chatbot assistant.

## Infrastructure & DevOps
- **Storage:** AWS S3 or Cloudinary
  - *Why:* Reliable and scalable object storage for user-uploaded media (images, videos).
- **Maps:** Mapbox or Google Maps API
  - *Why:* Provide high-quality, interactive maps with rich APIs for location-based services.
- **Notifications:** Firebase Cloud Messaging (FCM) / Apple Push Notification service (APNs)
  - *Why:* A reliable and cross-platform solution for sending push notifications to our mobile users.
- **CI/CD:** GitHub Actions
  - *Why:* Automates our build, test, and deployment pipelines directly from our code repository.
- **Hosting:**
  - **Frontend (Web):** Vercel
  - **Backend & AI Services:** AWS ECS (Elastic Container Service)
  - *Why:* This combination provides a seamless deployment experience for the frontend and a scalable, containerized environment for our backend and AI microservices.
- **Monitoring:** Sentry + Datadog
  - *Why:* Sentry for real-time error tracking and performance monitoring. Datadog for infrastructure monitoring and log management.
