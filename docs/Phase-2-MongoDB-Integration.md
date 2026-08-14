# Phase 2: MongoDB Atlas Integration

## Objective

The objective of this phase is to connect the Express backend to a MongoDB Atlas cloud database using Mongoose. Instead of storing data locally, all application data will now be stored in a cloud-hosted MongoDB database.

---

## 1. Create MongoDB Atlas Cluster

### Cluster Created:
**Cluster Name:** `Vendor360`

### Purpose:
- Cloud-hosted MongoDB database
- Accessible from anywhere
- Suitable for MERN stack development
- No local MongoDB installation required

---

## 2. Create Environment Variables

### Created:
`server/.env`

### Contents:
```
PORT=5000

MONGODB_URI=mongodb+srv://<username>:<password>@vendor360.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Vendor360

JWT_SECRET=vendor360_secret_key
```

### Explanation

#### PORT=5000
- Defines the port on which the Express server runs
- Instead of hardcoding `const PORT = 5000;`, we can change it by editing the `.env` file

#### MONGODB_URI=...
- Stores the connection string used by Mongoose
- **Purpose:**
  - Keeps credentials out of the source code
  - Makes switching databases easy
  - Prevents secrets from being uploaded to GitHub

#### JWT_SECRET=vendor360_secret_key
- Stores the secret key used for JWT authentication
- Although authentication has not yet been implemented, the variable is created now to avoid future changes

---

## 3. Create Database Configuration

### Created:
`config/db.js`

### Source Code:
```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "vendor360",
        });

        console.log("✅ MongoDB Connected Successfully");

    } catch (error) {

        console.error("❌ MongoDB Connection Failed");

        console.error(error.message);

        process.exit(1);

    }
};

module.exports = connectDB;
```

### Line-by-Line Explanation

#### Import Mongoose
```javascript
const mongoose = require("mongoose");
```
- Loads the Mongoose library
- **Purpose:**
  - Connects Node.js with MongoDB
  - Provides schemas and models
  - Handles CRUD operations

#### Define Database Function
```javascript
const connectDB = async () => {
```
- Creates an asynchronous function responsible for establishing the database connection
- **Why async?**
  - Connecting to a cloud database takes time
  - JavaScript waits until the connection succeeds or fails

#### Try Block
```javascript
try {
```
- Attempts to connect to MongoDB
- If anything fails, execution jumps to the catch block

#### Connect to MongoDB
```javascript
await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "vendor360",
});
```

**Explanation:**
- `process.env.MONGODB_URI` - Reads the connection string from `.env`
- `await` - Waits until the connection is completed
  - Without await, the server might start before MongoDB is connected
- `dbName: "vendor360"` - Specifies the database name
  - MongoDB automatically creates this database the first time data is inserted

#### Success Message
```javascript
console.log("✅ MongoDB Connected Successfully");
```
- Prints a confirmation once the connection succeeds
- Useful for debugging during development

#### Catch Block
```javascript
catch(error)
```
- Runs only if the connection fails
- **Possible reasons:**
  - Wrong password
  - Invalid URI
  - Internet issues
  - Atlas Network Access not configured

#### Error Message
```javascript
console.error(error.message);
```
- Displays the exact MongoDB error
- Much more useful than simply printing "Connection Failed"

#### Exit Program
```javascript
process.exit(1);
```
- Stops the server if the database cannot be reached
- **Purpose:**
  - Running the backend without a database would cause many APIs to fail
  - It is better to stop immediately

#### Export Function
```javascript
module.exports = connectDB;
```
- Makes the `connectDB()` function available to other files

---

## 4. Update server.js

### Current Source Code
```javascript
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Vendor360 backend running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
```

### Line-by-Line Explanation

#### Load Environment Variables
```javascript
require("dotenv").config();
```
- Reads the `.env` file and loads all environment variables into `process.env`
- **Without this line:** `process.env.MONGODB_URI` would return `undefined`

#### Import Express
```javascript
const express = require("express");
```
- Imports the Express framework

#### Import CORS
```javascript
const cors = require("cors");
```
- Allows requests from different origins
- Later, React will communicate with this backend through CORS

#### Import Database Function
```javascript
const connectDB = require("./config/db");
```
- Imports the database connection function created in `db.js`

#### Create Express Application
```javascript
const app = express();
```
- Initializes the Express server
- All routes and middleware are attached to this object

#### Connect Database
```javascript
connectDB();
```
- Immediately connects to MongoDB when the application starts
- **Without this line:** the backend would never establish a database connection

#### Enable CORS
```javascript
app.use(cors());
```
- Allows cross-origin HTTP requests
- Necessary because React and Express will run on different ports during development

#### Parse JSON
```javascript
app.use(express.json());
```
- Automatically converts incoming JSON request bodies into JavaScript objects
- **Example:**
  - Incoming JSON: `{ "name":"Siya" }`
  - Becomes: `req.body.name`

#### Create Test Route
```javascript
app.get("/", (req,res)=>{
```
- Creates an HTTP GET endpoint
- URL: `http://localhost:5000/`

#### Send Response
```javascript
res.send("Vendor360 backend running");
```
- Returns a simple message to verify that the backend is working

#### Read Port
```javascript
const PORT = process.env.PORT || 5000;
```
- Reads the port number from `.env`
- If unavailable, defaults to 5000

#### Start Server
```javascript
app.listen(PORT, ()=>{
```
- Starts the Express server and begins listening for incoming requests

#### Print Startup Message
```javascript
console.log(`Server running on http://localhost:${PORT}`);
```
- Displays the URL where the backend is currently running

---

## 5. Verification

### Command executed:
```bash
npm run dev
```

### Expected output:
```
MongoDB Connected Successfully

Server running on http://localhost:5000
```

### Browser verification:
Navigate to: `http://localhost:5000`

**Response:**
```
Vendor360 backend running
```

---

## Current Project Status

### Completed
- ✅ Express Backend
- ✅ Git Repository
- ✅ MongoDB Atlas Cluster
- ✅ Environment Variables
- ✅ Mongoose Configuration
- ✅ Database Connection
- ✅ Backend Successfully Running

---

## What's Next

The backend is now fully connected to MongoDB Atlas. The next phases will involve:
- Creating Mongoose schemas and models
- Implementing API routes and controllers
- Setting up authentication and authorization
- Implementing file upload functionality
- Building the React frontend

---

## Troubleshooting

### MongoDB Connection Failed
- Verify your connection string in `.env`
- Check MongoDB Atlas network access settings
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct

### Port Already in Use
```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Environment Variables Not Loading
- Ensure `dotenv` is installed: `npm install dotenv`
- Verify `.env` file is in the correct location (`server/.env`)
- Restart the development server after editing `.env`
