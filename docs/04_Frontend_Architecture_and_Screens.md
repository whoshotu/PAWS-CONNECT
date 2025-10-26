
# Paws Connect: Frontend Architecture and Screens

This document details the frontend architecture and describes the primary screens and UI flows for the Paws Connect web and mobile applications.

## 1. Frontend Architecture

- **Web Application:**
  - **Framework:** React with Next.js
  - **Styling:** Styled-components or Tailwind CSS with a custom theme based on the design guidelines.
  - **State Management:** React Context API for global state (e.g., user authentication) and `useSWR` or React Query for data fetching and caching.
  - **Deployment:** Vercel for seamless deployment and hosting.

- **Mobile Application:**
  - **Framework:** React Native with Expo
  - **UI Toolkit:** React Native Paper for Material Design components, customized to our theme.
  - **Navigation:** React Navigation for screen transitions.
  - **Code Sharing:** A monorepo structure (e.g., using Nx or Turborepo) will be considered to share code (e.g., API clients, validation logic) between the web and mobile apps.

## 2. Key Screens & UI Flow

### Onboarding (Web + Mobile)
- **Flow:** Welcome screen -> Sign up/Login -> Create User Profile -> Create Pet Profile -> Grant Permissions (Location, Notifications).
- **Description:** A simple, multi-step process to get users set up quickly. The UI will be friendly and encouraging, with clear instructions at each step.

### Main Feed (Web + Mobile)
- **Tabs:** "Following" (chronological feed of posts from users they follow) and "For You" (AI-powered feed of recommended content).
- **Components:** Post cards (image/video, caption, author, likes, comments), infinite scroll.
- **AI Integration:** The "For You" feed will be powered by the `/ai/recommendations` endpoint.

### Post Creation (Web + Mobile)
- **Flow:** Tap '+' icon -> Select image/video -> Write caption -> Get AI caption/hashtag suggestions -> Tag pet(s) -> Add location -> Post.
- **AI Integration:** A button "Generate Caption" will call the `/ai/caption` endpoint. The suggestions will appear in the caption input field for the user to accept or edit.

### Discover / Smart Search (Web + Mobile)
- **Components:** A search bar at the top, followed by a map view and a list view.
- **Search Types:** Users can search for "Vets", "Parks", "Friends", or "Shops".
- **AI Integration:** Search results will be ranked based on relevance, distance, and AI-powered recommendations.

### Chat & PawsBot (Web + Mobile)
- **Interface:** A standard chat interface for user-to-user messaging.
- **PawsBot:** A floating action button with a paw icon will be present on most screens. Tapping it opens a chat interface with "PawsBot".
- **AI Integration:** PawsBot will use an NLP API to understand user queries and provide helpful information.

### Profile (Web + Mobile)
- **Components:** User/pet profile picture, bio, grid of posts, list of friends/followers.
- **Actions:** Edit profile, add new pet, view saved posts.

### Admin Portal (Web-only)
- **Layout:** A simple dashboard layout with a sidebar for navigation.
- **Screens:**
  - **Dashboard:** Key metrics and insights (powered by the `Insights` data).
  - **Content Moderation:** A queue of user-reported and AI-flagged content. Each item shows the content, the reason for the flag, and the AI confidence score.
  - **User Management:** A table of users with the ability to view profiles, suspend accounts, etc.
