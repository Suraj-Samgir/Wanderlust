# 🏠 Wanderlust - Airbnb Clone (Shorter Version)

Wanderlust is a simplified version of Airbnb, where users can list their apartments or homes and wanderers can explore and book them for a stay.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating Engine:** EJS + EJS-Mate
- **Styling:** Bootstrap 5
- **Utilities:** Method-Override, Express-Session, Connect-Flash, Cookie-Parser, JOI, Passport.js

---

## 📁 Project Structure (Phase-wise)

### ✅ Phase 1 - Core Functionality
#### Part A: Basic Setup & CRUD
- Initialized Node.js + Express project
- Installed required packages: `express`, `mongoose`, `method-override`, `path`
- Created **Listing Model** with fields:
  - `title`, `description`, `image`, `price`, `location`, `country`
- Seeded database with dummy data
- Implemented CRUD operations and basic routes

#### Part B: Styling with EJS-Mate
- Installed and configured **EJS Mate** for templating layouts
- Styled pages: `index`, `show`, `edit`, `add new`

---

### 🧩 Middlewares
- **Custom Middleware**: Logger
- **Built-in & Installed Middlewares**:
  - `method-override`
  - `express.static`
  - `express.urlencoded`
  - `cookie-parser`
  - `express-session`
  - `connect-flash`
- Created utility middleware for access control and logging
- Handled multiple middlewares with chaining and `next()`

---

### ❗ Error Handling
- Default and custom error handlers
- Custom `ExpressError` class
- Async error handling using:
  - `try-catch`
  - `wrapAsync` function

---

### ✅ Phase 1 - Continued
#### Part C: Form Validation
- **Client-side:** HTML + Bootstrap
- **Server-side:**
  - JOI schema validation
  - Middleware to validate listings
  - Custom error views (`error.ejs`)

#### Part D: MongoDB Relationships
- Embedded and Referenced relationships:
  - One-to-few → Embed
  - One-to-many → Reference with `ObjectId`
- Populated child documents using Mongoose `.populate()`

---

## 📘 Phase 2 - Advanced Features
### Part A: Reviews
- Users can post reviews with rating & comments
- Reviews are embedded under listings
- Handled deletion of reviews with `$pull` operator
- Used `mongoose middleware` (pre & post) to manage deletion cascades

### Part B: Express Router & Cookies
- Modular routing with `express.Router()`
- Used `mergeParams` to access parent route params
- Cookies:
  - Set & read cookies
  - Implemented signed cookies using `cookie-parser`

---

## 🧠 State Management
- Introduced `express-session` for persistent state
- Configured session options
- Used `connect-flash` for flash messages
- Implemented `res.locals` to store reusable values

---

## 🔐 Authentication (In Progress)
- Hashed password storage (using bcrypt)
- Concepts used:
  - Hashing & Salting
  - Authentication via `passport.js` (setup initiated)

---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
npm install
