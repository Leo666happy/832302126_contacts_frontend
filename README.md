# Contacts Frontend (Vue 3)

A modern, responsive contact management frontend built with Vue 3—seamlessly integrated with the FastAPI backend for full contact CRUD, search, and avatar upload functionality.

## Features
- Clean, intuitive UI for contact management
- Real-time data sync with backend API
- Contact search (by name/phone)
- Avatar upload & preview
- Responsive design (works on mobile/desktop)
- Form validation for contact data

## Tech Stack
| Technology       | Version Requirement | Description                  |
|------------------|---------------------|------------------------------|
| Vue.js           | 3.2+                | Core frontend framework      |
| Vite             | 4.0+                | Build tool (fast dev/hot-reload) |
| Axios            | 1.0+                | HTTP client for API calls    |
| CSS3/Tailwind CSS| -                   | Styling (responsive design)  |
| Vue Router       | 4.0+                | Frontend routing             |

## Project Structure
```
frontend/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/          # CSS, images, icons
│   ├── components/      # Reusable components (ContactCard, Form, etc.)
│   ├── views/           # Page views (ContactList, ContactDetail, etc.)
│   ├── router/          # Routing configuration
│   ├── utils/
│   │   └── request.js   # Axios setup (API base URL, interceptors)
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── package.json         # Dependencies & scripts
└── README.md            # Frontend documentation
```

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 16+ (https://nodejs.org/en/download/)
- npm/yarn (included with Node.js)
- Backend API running locally (see backend README)

### 2. Clone & Setup
```bash
# Install dependencies
npm install
# Or with yarn: yarn install
```

### 3. Configure Backend API URL
Update the backend base URL in `src/utils/request.js`:
```javascript
// src/utils/request.js
import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8000/api', // Match backend API base URL
  timeout: 5000
});

export default service;
```

### 4. Run Dev Server
```bash
npm run dev
# Or with yarn: yarn dev
```

## Core Functions
- **Contact List**: View all contacts with pagination
- **Search**: Find contacts by name or phone number
- **Add Contact**: Create new contact with optional avatar upload
- **Edit Contact**: Update existing contact details/avatar
- **Delete Contact**: Remove contacts (with confirmation)

## Build for Production
To generate static files for deployment (e.g., on Nginx/Netlify/Vercel):
```bash
npm run build
# Or with yarn: yarn build
```
Static files will be output to the `dist` folder.

## Notes
- Ensure the backend API is running before starting the frontend
- For CORS issues: Verify backend CORS configuration allows `http://localhost:5173`
- Avatar uploads require the backend `static/avatars` folder (auto-created by backend)

---

### Combined Frontend + Backend Quick Start (Bonus)
For local development with both services running:
1. Start backend (per backend README): `uvicorn main:app --reload`
2. Start frontend: `npm run dev`
