# PAWS-CONNECT Project

This project is being developed with the assistance of a Gemini AI agent with the following role: Senior full-stack product engineer, UX designer, and AI architect.

This file tracks the development progress and current status of the PAWS-CONNECT project.

## Current Status

- **Local Environment:** Checked and verified that the local development environment is up-to-date.
    - Node.js version: v22.20.0
    - npm version: 11.5.2
    - Backend dependencies: All packages are up to date.
- **Database:** Successfully connected to MongoDB Atlas.
- **Backend API:**
    - Created Mongoose models for all data entities.
    - **User API:**
        - Implemented user registration (`/api/users`).
        - Implemented user login (`/api/users/login`).
        - Implemented fetching all users and a single user.
        - Implemented user profile updates (including profile picture) and deletion with authentication.
    - **Pet API:**
        - Implemented creating a new pet profile with automatic age calculation.
        - Implemented fetching all pets for the logged-in user.
        - Implemented fetching a single pet by ID.
        - Implemented updating a pet's medical information.
        - Implemented deleting a pet profile.
    - **Post API:**
        - Implemented creating a new post with image uploads.
        - Implemented fetching all posts with pagination.
        - Implemented fetching a single post by ID.
        - Implemented updating a post's caption.
        - Implemented deleting a post.
        - Implemented liking/unliking and commenting on posts.
    - **Service API:**
        - Implemented creating a new service.
        - Implemented fetching all services with filtering and pagination.
    - **Insights API:**
        - Implemented an endpoint to fetch all insights (`/api/insights`).
- **AI Integration:**
    - Content moderation is implemented using the Google Gemini API. **(Requires user-provided API key)**
- **Deployment:**
    - **Backend:** Deployed to Render at [https://paws-connect.onrender.com/](https://paws-connect.onrender.com/).
    - **Frontend:** Deployed to Netlify at [https://pawz-connect.netlify.app/](https://pawz-connect.netlify.app/).
- **Known Issues:**
    - **[Resolved]** Users are currently unable to log in to the deployed application. This was due to missing environment variables on the Heroku server.

---

## Deployment Configuration

For the deployed application to function correctly, the following environment variables must be set on the Render server

- **`MONGODB_URI`**: The connection string for the MongoDB Atlas database.
- **`JWT_SECRET`**: A secret key for signing authentication tokens.
- **`GEMINI_API_KEY`**: The user's Google Gemini API key for content moderation.

These can be added as "Config Vars" in the Render dashboard

---

## Project Roadmap: Paws-Connect

**Phase 1: Backend Development**

*   [x] **Foundation:** Set up the Node.js server, connect to the MongoDB database, and establish the project structure.
*   [x] **Data Modeling:** Define the Mongoose schemas for all data entities (`User`, `Pet`, `Post`, etc.).
*   [x] **User API:** Implement the API endpoints for user management, including registration, login, and profile updates.
*   [x] **Pet API:** Implement the API endpoints for creating, reading, updating, and deleting pet profiles.
*   [x] **Post API:** Implement the API endpoints for creating, reading, updating, and deleting posts.
*   [x] **Service API:** Implement the API endpoints for services.

**Phase 2: Frontend Development**

*   [x] **Setup:** Initialize a new React application in the `frontend` directory.
*   [x] **Component Library:** Choose a UI component library (e.g., Material-UI, Chakra UI) for a consistent look and feel.
*   [x] **Authentication:** Implement login and registration forms connected to the backend API.
*   **Core Features:**
    *   [x] **Pet Profiles:** Create, view, and manage profiles for pets.
    *   [x] **Main Feed:** Develop the main social feed to display posts.
    *   [x] **User Profiles:** Allow users to flesh out their own profiles with a bio, profile picture, etc.
    *   [x] **Services Browser:** Allow users to browse for pet-related services.
*   [x] **AI Integration:** Integrate AI-powered features like recommendations and content moderation.

**Phase 3: Deployment**

*   [x] **Backend:** Deploy the Node.js backend to a cloud platform.
*   [x] **Frontend:** Deploy the React frontend to a static hosting service.
*   [x] **Database:** Connect the deployed backend to the production MongoDB Atlas database.

**Phase 4: Future Features**

*   **Q&A Forum:** A text-only forum for unregistered users to ask questions and get answers from the community.
*   **Frontend Age Calculation Info:** Add a note to the frontend to inform users how the pet's age is calculated.
*   **Local Media Uploads:** Allow users to upload images and videos from their local device.
*   **"Barks" Feed:** A short-form video feed with ephemeral posts (24-hour lifespan unless saved).
*   **Location Permission:** Request location permission during profile creation and use it for all location-based features.
*   **Follow Feature:** Allow users to follow each other and see a personalized feed.
*   **Post Privacy:** Allow users to set their posts to public or private.
*   **Frontend Post Edit Info:** Add a note to the frontend to inform users that post edits are non-reversible.
*   **User Roles:** Implement "user", "business", and "admin" roles to manage permissions.
*   **External Service Sourcing:** Source service data from external sites like Yelp and Google.
*   **Frontend Service Creation Logic:** Implement the frontend logic to ask about mobile/on-site businesses and and conditionally ask for an address.
*   **"Closest to Me" Sorting:** Implement sorting services by distance from the user's location.
*   **Service Reviews and Ratings:** Allow users to review and rate services.

---

## Progress Log

*Changes made by your Senior full-stack product engineer, UX designer, and AI architect.*

**2025-10-26**
*   **Deployment:**
    *   **Troubleshooting:** Investigated and resolved the login issue on the deployed application. The root cause was missing environment variables (`MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`) on the Heroku server.
    *   **Instructions:** Provided the user with instructions on how to set the required "Config Vars" in the Heroku dashboard.
*   **Bug Fix:**
    *   Fixed a typo in `backend/controllers/userController.js` that would have prevented users from updating their profiles.

**2025-10-25**
*   **Deployment:**
    *   Deployed the backend application to Render.
    *   Guided the user through deploying the frontend application to Netlify.
    *   **Issue:** Users are unable to log in. Troubleshooting is in progress.
*   **AI Integration (Content Moderation):**
    *   Improved the existing content moderation feature to be more robust.
    *   The system now requires a user-provided Gemini API key to function.
*   **Frontend Services Browser:**
    *   Implemented a services browser to view a list of available pet-related services.
    *   Created a `ServiceProvider` to manage service data.
    *   Developed `Service` and `ServiceList` components.
*   **Frontend User Profiles:**
    *   Implemented user profiles with the ability to edit bio and upload a profile picture.
    *   Created a `ProfileProvider` for managing profile state.
    *   Developed `Profile`, `ProfileForm`, and `ProfileModal` components.
*   **Frontend Main Feed (Enhanced):**
    *   Implemented image uploads for posts, including backend setup with `multer`.
    *   Added the ability to like and unlike posts.
    *   Implemented a comment section with the ability to add and view comments.
*   **Frontend Main Feed (Initial):**
    *   Implemented the initial structure for the main social feed.
    *   Created a `PostContext` for managing post data.
    *   Developed `Post`, `Feed`, and `PostForm` components.
    *   Integrated the new components into the `Dashboard`.
*   **Frontend Pet Profiles (CRUD):**
    *   Implemented full CRUD (Create, Read, Update, Delete) functionality for pet profiles.
    *   Styled the `Dashboard`, `Pets`, and `PetForm` components using Material-UI for a consistent and modern look.
    *   Created a `PetModal` for adding and editing pets, improving the user experience.
    *   Updated `PetContext` to include `updatePet` and `deletePet` functions, completing the pet management logic.

**2025-10-15**
*   **Frontend Authentication:**
    *   Added basic form validation to the `Login` and `Register` components. The forms now check for required fields, valid email format, and minimum password length before allowing submission.
    *   Added a show/hide toggle icon to the password fields in the `Login` and `Register` components for better usability.
    *   **Backend:** Implemented the missing `/api/users/login` endpoint in the backend.
    *   **Frontend:** Integrated both the `Register` and `Login` components with the backend API.
    *   **Architecture:** Implemented an `AuthContext` to provide global state management for user authentication. The application now persists user sessions and and dynamically updates the UI based on login status.