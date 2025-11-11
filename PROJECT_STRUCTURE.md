# Project Structure Documentation

Complete file and folder structure of the Medicare Pro Healthcare Management System.

---

## 📁 Root Directory

```
Medicare-Pro/
├── server/                 # Backend (Node.js + Express)
├── client/                 # Frontend (React + Vite)
├── README.md               # Main project documentation
├── API_DOCUMENTATION.md    # API endpoints documentation
├── DATABASE_SCHEMA.md      # Database structure documentation
├── USER_GUIDE.md           # User manual for all roles
├── TESTING_GUIDE.md        # Testing checklist and guide
├── PROJECT_PLAN.md         # Development plan and progress
└── PROJECT_STRUCTURE.md    # This file - project structure docs
```

---

## 🖥️ Server (Backend) Structure

```
server/
├── node_modules/           # NPM dependencies (auto-generated)
├── package.json            # Backend dependencies and scripts
├── package-lock.json       # Lock file for dependencies
├── .env                    # Environment variables (create this)
├── scripts/                # Database scripts
│   ├── init.sql            # SQL schema and table creation
│   └── run-init-sql.js     # Script to initialize database
└── src/                    # Source code
    ├── index.js            # Main server entry point
    ├── lib/                # Library utilities
    │   └── db.js           # Database connection and query helpers
    ├── middleware/         # Express middleware
    │   └── auth.js         # JWT authentication middleware
    ├── routes/             # API route handlers
    │   ├── auth.js         # Authentication routes (login/logout)
    │   ├── users.js        # User management routes
    │   ├── patients.js     # Patient CRUD routes
    │   ├── appointments.js # Appointment routes
    │   ├── dashboard.js    # Dashboard statistics routes
    │   └── medicalRecords.js # Medical records routes
    └── utils/              # Utility functions
        └── crypto.js       # Password hashing (bcrypt)
```

### 📄 Server Files Description

#### **server/package.json**
- Defines backend dependencies (express, pg, jwt, bcrypt, etc.)
- Contains npm scripts: `dev`, `start`, `db:init`
- Configuration for Node.js backend

#### **server/.env** (Create this file)
- Environment variables:
  - `PORT` - Server port (default: 4000)
  - `DATABASE_URL` - PostgreSQL connection string
  - `JWT_SECRET` - Secret key for JWT tokens
  - `JWT_EXPIRES_IN` - Token expiration time
  - `CORS_ORIGIN` - Frontend URL for CORS

#### **server/src/index.js**
- Main Express server entry point
- Sets up middleware (CORS, JSON parsing)
- Registers all API routes
- Starts HTTP server
- Connects to PostgreSQL database

#### **server/src/lib/db.js**
- Database connection pool management
- PostgreSQL connection using `pg` library
- Query helper function
- Database pool initialization

#### **server/src/middleware/auth.js**
- JWT token verification middleware
- Role-based access control middleware
- Protects API routes from unauthorized access
- Extracts user info from JWT token

#### **server/src/routes/auth.js**
- `POST /api/auth/login` - User login endpoint
- `POST /api/auth/logout` - Logout endpoint
- Validates credentials and returns JWT token

#### **server/src/routes/users.js**
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create new user (admin only)
- User management endpoints

#### **server/src/routes/patients.js**
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

#### **server/src/routes/appointments.js**
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- Appointment management endpoints

#### **server/src/routes/dashboard.js**
- `GET /api/dashboard` - Get dashboard statistics
- Returns: total patients, appointments, users
- Returns: today's appointments list

#### **server/src/routes/medicalRecords.js**
- `GET /api/medical-records/patient/:patientId` - Get records for patient
- `POST /api/medical-records` - Create new medical record
- `PUT /api/medical-records/:id` - Update medical record
- `DELETE /api/medical-records/:id` - Delete medical record

#### **server/src/utils/crypto.js**
- Password hashing using bcrypt
- Password comparison for login
- Security utilities

#### **server/scripts/init.sql**
- SQL schema definitions
- Creates tables: users, patients, appointments, medical_records
- Sample data seeding
- Database initialization script

#### **server/scripts/run-init-sql.js**
- Runs init.sql script
- Creates database tables
- Seeds sample data
- Generates bcrypt password hashes

---

## 💻 Client (Frontend) Structure

```
client/
├── node_modules/           # NPM dependencies (auto-generated)
├── package.json            # Frontend dependencies and scripts
├── package-lock.json       # Lock file for dependencies
├── index.html              # HTML entry point
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── src/                    # Source code
    ├── main.jsx            # React app entry point
    ├── App.jsx             # Main app component with routing
    ├── index.css           # Global CSS styles
    ├── components/         # Reusable React components
    │   ├── Notification.jsx # Success/error notification component
    │   └── RoleGuard.jsx   # Role-based access control component
    ├── pages/              # Page components
    │   ├── Login.jsx       # Login page
    │   ├── Dashboard.jsx   # Dashboard page with statistics
    │   ├── Patients.jsx    # Patients list and management
    │   ├── PatientProfile.jsx # Patient detail page
    │   └── Appointments.jsx # Appointments list and management
    ├── services/           # API service layer
    │   ├── api.js          # API request helper functions
    │   └── auth.js         # Authentication service (login/logout)
    └── utils/              # Utility functions
        └── validation.js   # Form validation utilities
```

### 📄 Client Files Description

#### **client/package.json**
- Defines frontend dependencies (react, react-router, vite, tailwindcss)
- Contains npm scripts: `dev`, `build`, `preview`
- Configuration for React frontend

#### **client/index.html**
- HTML entry point for React app
- Root div for React to mount
- Script tag for main.jsx

#### **client/vite.config.js**
- Vite build tool configuration
- React plugin setup
- Development server configuration
- Proxy setup for API calls

#### **client/tailwind.config.js**
- Tailwind CSS framework configuration
- Content paths for CSS purging
- Theme customization

#### **client/postcss.config.js**
- PostCSS configuration
- Tailwind CSS and Autoprefixer plugins
- CSS processing pipeline

#### **client/src/main.jsx**
- React application entry point
- Renders App component into DOM
- Sets up React Router
- Imports global CSS

#### **client/src/App.jsx**
- Main application component
- Defines all routes
- Navigation header
- Private route protection
- Notification system
- User authentication state management

#### **client/src/index.css**
- Global CSS styles
- Tailwind CSS directives
- Custom CSS animations
- Mobile responsive utilities

#### **client/src/components/Notification.jsx**
- Notification component for success/error messages
- Auto-dismiss functionality
- Slide-in animation
- Manual close option

#### **client/src/components/RoleGuard.jsx**
- Role-based access control component
- Checks user roles
- Hides/shows UI elements based on role
- Helper functions for role checks

#### **client/src/pages/Login.jsx**
- Login page component
- Email and password form
- Authentication handling
- Error display
- Redirect after login

#### **client/src/pages/Dashboard.jsx**
- Dashboard page with statistics
- Displays: total patients, appointments, users
- Shows today's appointments
- Stats cards with colors
- Responsive grid layout

#### **client/src/pages/Patients.jsx**
- Patients list page
- Patient management table
- Add patient form (admin/receptionist only)
- Delete patient button (admin only)
- View profile links
- Form validation

#### **client/src/pages/PatientProfile.jsx**
- Patient detail page
- Edit patient information form
- Appointments list for patient
- Medical records section
- Add medical record form (doctor/admin only)
- View all medical records

#### **client/src/pages/Appointments.jsx**
- Appointments list page
- Create appointment form (admin/receptionist only)
- Appointments table
- Patient selection dropdown
- Date and time pickers

#### **client/src/services/api.js**
- API request helper function
- Handles authentication headers
- Error handling
- Network error detection
- JSON request/response handling

#### **client/src/services/auth.js**
- Authentication service
- Login function
- Logout function
- Token storage in localStorage
- User data storage
- Token retrieval

#### **client/src/utils/validation.js**
- Email validation function
- Phone number validation function
- Required field validation
- Validation error messages
- Form validation helpers

---

## 📚 Documentation Files

#### **README.md**
- Main project documentation
- Setup instructions
- Features overview
- Tech stack information
- Quick start guide
- Links to other documentation

#### **API_DOCUMENTATION.md**
- Complete API reference
- All endpoints documented
- Request/response examples
- Status codes
- Error responses
- Authentication requirements

#### **DATABASE_SCHEMA.md**
- Database structure documentation
- Table definitions
- Column descriptions
- Relationships (ERD)
- Common queries
- Data types and constraints

#### **USER_GUIDE.md**
- User manual for all roles
- Feature guides
- Step-by-step instructions
- Role-based feature list
- Troubleshooting guide
- Tips and best practices

#### **TESTING_GUIDE.md**
- Comprehensive testing checklist
- Test scenarios for all features
- Role-based testing
- Input validation testing
- Error handling testing
- Cross-browser testing

#### **PROJECT_PLAN.md**
- Development plan
- Phase breakdown
- Progress tracking
- Completed features
- Pending tasks
- Implementation order

#### **PROJECT_STRUCTURE.md** (This file)
- Complete file/folder structure
- File descriptions
- Purpose of each directory
- Organization explanation

---

## 🗂️ Directory Purposes

### **server/**
Backend application built with Node.js and Express.
- Handles all API requests
- Manages database operations
- Provides authentication
- Enforces role-based access control

### **client/**
Frontend application built with React and Vite.
- User interface
- User interactions
- API calls to backend
- State management
- Routing

### **server/src/routes/**
API route handlers for different resources.
- Separate file for each resource
- RESTful API endpoints
- Request validation
- Response formatting

### **server/src/middleware/**
Express middleware functions.
- Authentication middleware
- Authorization middleware
- Request processing

### **server/src/lib/**
Library and utility modules.
- Database connection
- Reusable functions
- Shared code

### **client/src/pages/**
React page components.
- One component per page
- Page-specific logic
- User interface

### **client/src/components/**
Reusable React components.
- Shared UI components
- Can be used across pages
- Independent functionality

### **client/src/services/**
API service layer.
- API communication
- Authentication handling
- Data fetching

### **client/src/utils/**
Utility functions.
- Helper functions
- Validation logic
- Common utilities

---

## 📦 Key Dependencies

### Backend (server/package.json)
- **express** - Web framework
- **pg** - PostgreSQL client
- **jsonwebtoken** - JWT token handling
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend (client/package.json)
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Routing
- **vite** - Build tool
- **tailwindcss** - CSS framework
- **autoprefixer** - CSS autoprefixing
- **postcss** - CSS processing

---

## 🔧 Configuration Files

### **.gitignore**
- Excludes node_modules, .env, build files
- Git ignore patterns

### **.env** (server/.env)
- Environment variables
- Database connection
- JWT secret
- Server configuration

### **vite.config.js**
- Vite build configuration
- React plugin
- Development server
- Proxy settings

### **tailwind.config.js**
- Tailwind CSS configuration
- Content paths
- Theme customization

### **postcss.config.js**
- PostCSS configuration
- Tailwind and Autoprefixer plugins

---

## 🚀 Entry Points

### Backend Entry Point
- **server/src/index.js**
  - Starts Express server
  - Connects to database
  - Registers routes
  - Listens on port 4000

### Frontend Entry Point
- **client/src/main.jsx**
  - Renders React app
  - Sets up routing
  - Mounts to DOM

---

## 📊 Data Flow

1. **User Action** → React Component (pages/)
2. **Component** → Service Layer (services/)
3. **Service** → API Call (api.js)
4. **API Call** → Backend Route (server/src/routes/)
5. **Route** → Database Query (server/src/lib/db.js)
6. **Database** → Response → Route → Service → Component → UI

---

## 🔐 Security Files

### **server/src/middleware/auth.js**
- JWT token verification
- Role-based authorization
- Protects API routes

### **server/src/utils/crypto.js**
- Password hashing
- Secure password storage
- Password comparison

### **client/src/services/auth.js**
- Token storage
- User session management
- Secure logout

---

## 🎨 Styling Files

### **client/src/index.css**
- Global styles
- Tailwind directives
- Custom animations
- Mobile responsive utilities

### **tailwind.config.js**
- Tailwind configuration
- Theme customization
- Content paths

---

## 📝 Scripts

### **server/scripts/init.sql**
- Database schema
- Table creation
- Sample data

### **server/scripts/run-init-sql.js**
- Runs initialization script
- Creates database structure
- Seeds sample data

---

## 🗄️ Database Structure

Tables created by `init.sql`:
1. **users** - System users (admin, doctor, receptionist)
2. **patients** - Patient information
3. **appointments** - Appointment scheduling
4. **medical_records** - Medical notes and records

---

## 📱 Mobile Responsiveness

- Tailwind CSS responsive utilities
- Mobile-first design
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Responsive navigation

---

## 🔄 State Management

- React useState hooks
- LocalStorage for authentication
- Component-level state
- Props for data passing
- No global state management library (React Context could be added)

---

## 📡 API Communication

- Fetch API for HTTP requests
- JWT tokens in Authorization header
- JSON request/response format
- Error handling in api.js
- CORS enabled for development

---

## 🎯 Key Features by File

### Authentication
- `server/src/routes/auth.js` - Login/logout endpoints
- `server/src/middleware/auth.js` - Token verification
- `client/src/services/auth.js` - Login/logout functions
- `client/src/pages/Login.jsx` - Login UI

### Patient Management
- `server/src/routes/patients.js` - Patient API
- `client/src/pages/Patients.jsx` - Patient list
- `client/src/pages/PatientProfile.jsx` - Patient details

### Appointments
- `server/src/routes/appointments.js` - Appointment API
- `client/src/pages/Appointments.jsx` - Appointment management

### Medical Records
- `server/src/routes/medicalRecords.js` - Medical records API
- `client/src/pages/PatientProfile.jsx` - Medical records UI

### Dashboard
- `server/src/routes/dashboard.js` - Dashboard API
- `client/src/pages/Dashboard.jsx` - Dashboard UI

### Role-Based Access
- `server/src/middleware/auth.js` - Backend role checks
- `client/src/components/RoleGuard.jsx` - Frontend role checks
- `client/src/App.jsx` - Role-based navigation

---

## 🧪 Testing Files

- **TESTING_GUIDE.md** - Comprehensive testing checklist
- Test scenarios for all features
- Role-based testing
- Edge case testing

---

## 📖 Documentation Files

- **README.md** - Main documentation
- **API_DOCUMENTATION.md** - API reference
- **DATABASE_SCHEMA.md** - Database docs
- **USER_GUIDE.md** - User manual
- **TESTING_GUIDE.md** - Testing guide
- **PROJECT_PLAN.md** - Development plan
- **PROJECT_STRUCTURE.md** - This file

---

## 🔍 File Naming Conventions

### Backend
- Routes: `resource.js` (e.g., `patients.js`)
- Middleware: `feature.js` (e.g., `auth.js`)
- Utilities: `purpose.js` (e.g., `crypto.js`)

### Frontend
- Pages: `PageName.jsx` (e.g., `Dashboard.jsx`)
- Components: `ComponentName.jsx` (e.g., `Notification.jsx`)
- Services: `service.js` (e.g., `api.js`)
- Utils: `purpose.js` (e.g., `validation.js`)

---

## 📂 Folder Organization Principles

1. **Separation of Concerns** - Backend and frontend separated
2. **Feature-Based** - Routes grouped by resource
3. **Reusability** - Components and utilities in separate folders
4. **Scalability** - Easy to add new features
5. **Maintainability** - Clear structure and naming

---

## 🎓 Learning Resources

- **README.md** - Start here for setup
- **USER_GUIDE.md** - Learn how to use the app
- **API_DOCUMENTATION.md** - Understand API endpoints
- **DATABASE_SCHEMA.md** - Learn database structure
- **TESTING_GUIDE.md** - Learn how to test

---

*Last Updated: Project completion*
*This structure reflects the complete Medicare Pro Healthcare Management System*

