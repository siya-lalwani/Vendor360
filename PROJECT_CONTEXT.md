# Vendor360 — Project Context

## 1. Project Overview
Vendor360 is a Vendor Relationship & Compliance Management System designed to manage company–vendor relationships, contracts, documents, compliance workflows, notifications, feedback, and activity tracking.

## 2. Tech Stack
- Frontend: React (to be developed)
- Backend: Node.js
- Web Framework: Express.js
- Database: MongoDB Atlas
- ODM: Mongoose
- Authentication: JWT
- Password Security: bcryptjs
- File Uploads: Multer
- Environment Variables: dotenv
- Cross-Origin Requests: cors
- Development Server: Nodemon
- Version Control: Git + GitHub
- API Testing: Postman

## 3. Project Scope
Vendor management and compliance management platform.

## 4. Design Status
- SRS: ✅
- Database Schema: ✅
- UML / OOAD Diagrams: ✅
- Use Case Diagrams: ✅
- Class Diagram: ✅
- Design Frozen: ✅

Diagrams were created in PlantUML and downloaded before implementation began.

## 5. User Roles
- Company
- Vendor
- Compliance Officer

### Employee Login Design
- Each employee has an individual login.
- For the current version, employees are kept at the same access level within their organization.
- Role-based employee permissions can be introduced later.

## 6. Important Business Rules
- A company can verify immediately.
- A vendor must complete their profile before participating in connection/request workflows.
- A company can search for vendors by vendor name or vendor ID.
- There is no public/private vendor profile distinction in the current design.
- If a searched vendor is not registered, the company can send a pre-made invitation email containing a link to join Vendor360.
- Both companies and vendors can request documents from each other.
- A partnership can have multiple contracts over its lifetime.
- Only one contract can be ACTIVE at a time for a partnership.
- The partnership stores a reference to its current active contract.
- Only the latest approved document copy is stored in the current implementation.
- Document version history can be introduced later if cloud storage/versioning is adopted.
- Compliance officers have restricted access.
- JWT authentication is used for protected backend routes.

## 7. Main Modules
- Authentication
- Company Management
- Vendor Management
- Partnership / Vendor Connection
- Invitations
- Contracts
- Documents
- Document Requests
- Notifications
- Feedback
- Activity Log
- Compliance

## 8. Database Models Implemented
All 11 planned Mongoose models have been created and successfully loaded:

1. `User.js`
2. `Company.js`
3. `Vendor.js`
4. `Invitation.js`
5. `Partnership.js`
6. `Contract.js`
7. `DocumentRequest.js`
8. `Document.js`
9. `Notification.js`
10. `Feedback.js`
11. `ActivityLog.js`

### Key Relationships
- User → Company through `createdBy`
- User → Vendor through `createdBy`
- Company + Vendor → Partnership
- Partnership → Contract
- Partnership → DocumentRequest
- DocumentRequest → Document
- User → Notification
- Partnership → Feedback
- Partnership → ActivityLog
- Company → Invitation

## 9. Backend Structure
Current backend structure:

```text
server/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── companyController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Company.js
│   ├── Vendor.js
│   ├── Invitation.js
│   ├── Partnership.js
│   ├── Contract.js
│   ├── DocumentRequest.js
│   ├── Document.js
│   ├── Notification.js
│   ├── Feedback.js
│   └── ActivityLog.js
├── routes/
│   ├── authRoutes.js
│   └── companyRoutes.js
├── uploads/
├── utils/
├── .env
├── .gitignore
├── server.js
└── package.json
```

## 10. MongoDB Atlas
- MongoDB Atlas cluster created.
- Cluster name: `Vendor360`
- Database: `vendor360`
- Backend connects using Mongoose.
- Atlas Network Access was configured so the current development machine can connect.

## 11. Environment Variables
`.env` contains:

```env
PORT=5000
MONGODB_URI=<MongoDB Atlas connection string>
JWT_SECRET=vendor360_secret_key
```

The actual MongoDB URI and secret must remain private and must never be committed to GitHub.

## 12. Authentication Implemented

### Registration
Endpoint:

```text
POST /api/auth/register
```

Implemented:
- Required-field validation
- Duplicate email check
- bcrypt password hashing
- User creation in MongoDB
- Password excluded from response

Verified successfully through Postman.

### Login
Endpoint:

```text
POST /api/auth/login
```

Implemented:
- Email/password validation
- User lookup
- bcrypt password comparison
- JWT generation
- JWT contains:
  - `userId`
  - `role`
  - `organizationType`
- Token expiry: 1 day

Verified successfully through Postman with HTTP `200`.

### JWT Middleware
File:

```text
middleware/authMiddleware.js
```

Implemented:
- Reads `Authorization` header
- Requires `Bearer <token>` format
- Verifies JWT using `JWT_SECRET`
- Stores decoded payload in `req.user`
- Rejects missing/invalid/expired tokens with HTTP `401`

A temporary protected test route was used to verify this and then removed.

## 13. Company API Implemented

### Create Company
Endpoint:

```text
POST /api/companies
```

Protected by JWT middleware.

Implemented:
- Required-field validation
- Duplicate `companyId` check
- Duplicate company email check
- Company creation
- Associates company with authenticated user using:
  `createdBy: req.user.userId`

Verified successfully through Postman with HTTP `201 Created`.

The created Company document was also verified in MongoDB Atlas.

## 14. Verified End-to-End Flow

```text
User Registration
      ↓
bcrypt password hashing
      ↓
MongoDB Atlas
      ↓
User Login
      ↓
JWT generated
      ↓
Bearer Token
      ↓
JWT Middleware
      ↓
Protected Company API
      ↓
Company Mongoose Model
      ↓
MongoDB Atlas
```

## 15. Git Milestones
Completed and pushed to GitHub:
- Initial Project Setup
- MongoDB Atlas Integration
- Mongoose Models
- User Registration API
- Login + JWT Authentication
- JWT Authentication Middleware
- Company Profile API

## 16. Current Development Status

### Completed
- Project setup
- Git/GitHub
- Express backend
- MongoDB Atlas
- Mongoose configuration
- 11 Mongoose models
- User registration
- bcrypt password hashing
- User login
- JWT generation
- JWT verification middleware
- Protected routes
- Company profile creation API

### Next
1. Vendor Profile API
2. Enforce `profileCompleted` business rule
3. Vendor search
4. Company → registered vendor connection request
5. Company → unregistered vendor invitation
6. Partnership workflow
7. Contract APIs
8. Document request APIs
9. Document upload/approval workflow
10. Notifications
11. Feedback
12. Activity logs
13. Compliance Officer APIs
14. React frontend
15. Integration and final testing

## 17. Important Implementation Convention
Keep naming consistent:
- Use `userId`, not `userID`
- Use camelCase for JavaScript/Mongoose field names
- Keep authentication logic in controllers/middleware rather than directly in routes
- Keep secrets in `.env`
- Test backend APIs with Postman before connecting the React frontend
