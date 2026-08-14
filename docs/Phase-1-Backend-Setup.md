# Phase 1: Backend Setup & Configuration

## 1. Prerequisites

Before starting the project, ensure the following software is installed.

### Node.js
**Check installation:**
```bash
node -v
```

**Purpose:**
- Runs JavaScript outside the browser
- Executes our Express backend
- Includes npm (Node Package Manager)

### npm
**Check installation:**
```bash
npm -v
```

**Purpose:**
- Installs external JavaScript packages
- Manages project dependencies

### Git
**Check installation:**
```bash
git --version
```

**Purpose:**
- Version control
- Tracks project history
- Connects the project with GitHub

### Visual Studio Code
**Purpose:**
- Source code editor
- Integrated terminal
- Extensions for JavaScript, MongoDB, React, etc.

---

## 2. Project Structure

### Created the project folder:
```
Vendor360/
├── client/
├── server/
├── docs/
├── README.md
└── .gitignore
```

### Folder Purpose

| Folder | Purpose |
|--------|---------|
| `client/` | React frontend (to be developed later) |
| `server/` | Node.js + Express backend |
| `docs/` | Stores project documentation (SRS, Database Design, API Documentation, Diagrams) |
| `README.md` | Contains project overview |
| `.gitignore` | Specifies files Git should ignore |

---

## 3. Initialize Git Repository

**Command:**
```bash
git init
```

**Purpose:**
- Creates a local Git repository
- Enables version tracking
- Enables commits and branches
- Enables GitHub integration

After initialization, Git creates a `.git/` folder which stores the repository history.

---

## 4. Move into Backend Folder

**Command:**
```bash
cd server
```

**Purpose:**
All backend-related work will be performed inside this folder.

---

## 5. Initialize Node Project

**Command:**
```bash
npm init -y
```

**Purpose:**
- Creates the project configuration file: `package.json`
- The `-y` flag automatically accepts default values

---

## 6. Install Backend Dependencies

**Command:**
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer
```

### Purpose of Each Dependency

#### Express
- Backend web framework
- Responsibilities:
  - Create HTTP server
  - Handle routes
  - Receive requests
  - Send responses
- Example: `app.get("/")`

#### Mongoose
- ODM (Object Document Mapper) for MongoDB
- Responsibilities:
  - Create schemas
  - Validate data
  - Perform CRUD operations
  - Connect Node.js to MongoDB

#### dotenv
- Loads environment variables from the `.env` file
- Used for storing:
  - Database URI
  - JWT Secret
  - Port Number
- Keeps sensitive information out of the source code

#### CORS
- Allows communication between different origins
- Example:
  - React: `http://localhost:3000`
  - Backend: `http://localhost:5000`
- Without CORS, browsers block these requests

#### bcryptjs
- Encrypts passwords before storing them
- Instead of saving `password123`, it stores a secure hash
- Improves security

#### jsonwebtoken (JWT)
- Handles user authentication
- Responsibilities:
  - Generate login tokens
  - Verify tokens
  - Keep users authenticated

#### Multer
- Handles file uploads
- Used for:
  - GST Certificates
  - PAN Cards
  - Contracts
  - Compliance Documents

---

## 7. Install Development Dependency

**Command:**
```bash
npm install --save-dev nodemon
```

**Purpose:**
- Automatically restarts the backend whenever source files are modified
- Without Nodemon: Every code change requires manually stopping and restarting the server
- With Nodemon: Save the file → Server restarts automatically

---

## 8. Configure package.json

**Update the scripts section:**
```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```

### Purpose

- **`npm start`**: Runs `node server.js` (used mainly in production)
- **`npm run dev`**: Runs `nodemon server.js` (used during development)

---

## 9. Backend Folder Structure

**Created:**
```
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── .env
├── .gitignore
└── server.js
```

### Purpose of Each Folder

| Folder | Purpose |
|--------|---------|
| `config/` | Stores application configuration (e.g., `db.js` for database connection logic) |
| `controllers/` | Contains business logic (e.g., `registerUser()`, `loginUser()`, `uploadDocument()`) |
| `middleware/` | Stores reusable middleware (Authentication, Authorization, Error Handling) |
| `models/` | Stores all Mongoose models (e.g., `User.js`, `Company.js`, `Vendor.js`) |
| `routes/` | Contains API endpoints (e.g., `POST /login`, `POST /register`, `GET /vendors`) |
| `uploads/` | Stores uploaded files (Documents, Contracts, Certificates) |
| `utils/` | Contains helper functions (Generate Vendor ID, Generate Company ID, Format dates) |
| `.env` | Stores secret environment variables |
| `server.js` | Main entry point of the backend |

---

## 10. Configure .gitignore

**Created:**
```
node_modules/
.env
uploads/
```

**Purpose:**
- Prevents Git from uploading installed packages
- Keeps secret keys private
- Excludes uploaded files
- Keeps the repository secure and lightweight

---

## 11. Create README.md

**Initial contents:**
```markdown
# Vendor360

Vendor Relationship & Compliance Management System

## Tech Stack

- React
- Node.js
- Express.js
- MongoDB
```

**Purpose:**
Provides a basic project overview for anyone opening the repository.

---

## 12. Start Development Server

**Command:**
```bash
npm run dev
```

**Result:**
```
Server running on http://localhost:5000
```

**Purpose:**
Starts the Express server using Nodemon.

---

## 13. Verify Server

**Opened in browser:**
```
http://localhost:5000
```

**Expected response:**
```
Vendor360 Backend Running
```

This confirmed:
- ✅ Express installed correctly
- ✅ Node.js configured correctly
- ✅ Nodemon functioning correctly
- ✅ Backend server successfully started

---

## Current Development Status

### Completed
- ✅ Git Repository Initialized
- ✅ Backend Folder Structure Created
- ✅ Node Project Initialized
- ✅ Runtime Dependencies Installed
- ✅ Development Dependencies Installed
- ✅ Express Server Running
- ✅ Development Environment Configured

---

## Commands Summary

| Command | Purpose |
|---------|---------|
| `git init` | Initialize Git repository |
| `cd server` | Navigate to backend folder |
| `npm init -y` | Create package.json |
| `npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer` | Install backend dependencies |
| `npm install --save-dev nodemon` | Install development dependency |
| `npm run dev` | Start backend using Nodemon |
| `npm start` | Start backend using Node.js |
| `node -v` | Check Node.js version |
| `npm -v` | Check npm version |
| `git --version` | Check Git version |

---

## Next Phase

We'll treat this as Developer Log – Phase 2, so by the end of Vendor360 you'll have a complete handbook from setup to deployment.

### Step 1: Push the current code to GitHub

From the Vendor360 root folder:

```bash
git status
```

If everything looks correct:

```bash
git add .
```

Commit:
```bash
git commit -m "feat: Initial Express backend setup with project structure"
```

Push:
```bash
git push origin main
```

If this is your first push after creating the repository:
```bash
git push -u origin main
```
