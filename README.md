# Gamified-Mental-Health-Tracker
<h1>Day1</h1>
<h1>⚙️ Technical Stack (Backend)</h1>
<ul>
  <li>Node.js + Express.js</li>
  <li>MongoDB + Mongoose</li>
  <li>JWT for authentication (stored in cookies)</li>
  <li>bcryptjs for password hashing</li>
  <li>cookie-parser for secure token handling</li>
  <li>Structured MVC architecture with separation of concerns</li>
</ul>

<h1>🚀 Features Implemented (Backend)</h1>

<h1>✅ Authentication System</h1>

<ul>
  <li>User Registration (POST /api/users)</li>
  <li>Validates username, email, and password</li>
  <li>Hashes password securely using bcryptjs</li>
  <li>Stores user in MongoDB</li>
  <li>Sets HTTP-only JWT cookie</li>
  <li>Returns user profile (without password)</li>
  <li>User Login (POST /api/users/auth)</li>
  <li>Authenticates email and password</li>
  <li>Returns JWT in HTTP-only cookie</li>
  <li>Sends back user profile (without password)</li>
  <li>User Logout (POST /api/users/logout)</li>
  <li>Clears the JWT cookie</li>
  <li>Sends success message</li>
</ul>

<h1>🧑‍💻 User Profile Management</h1>

<ul>
  <li>Get Current User Profile (GET /api/users/profile)</li>
  <li>Protected route with JWT</li>
  <li>Returns logged-in user's details</li>
  <li>Update User Profile (PUT /api/users/profile)</li>
  <li>Allows updating:</li>
  <ul>
    <li>username</li>
    <li>email (with duplication check)</li>
    <li>password (securely re-hashed)</li>
    <li>Returns updated user data</li>
  </ul>
</ul>

<h1>🛡️ Admin Functionality</h1>

<ul>
  <li>All admin routes are protected by authenticate and authorizedAdmin middlewares.</li>
  <li>Get All Users (GET /api/users)</li>
  <li>Admin-only access</li>
  <li>Returns a list of all registered users</li>
  <li>Get User By ID (GET /api/users/:id)</li>
  <li>Returns user data (excluding password)</li>
  <li>Update User By ID (PUT /api/users/:id)</li>
  <li>Admin-only access</li>
  <li>Allows:</li>
  <ul>
    <li>Changing username, email, and isAdmin status</li>
    <li>Checks for email duplication</li>
    <li>Returns updated user</li>
    <li>Delete User By ID (DELETE /api/users/:id)</li>
    <li>Deletes user by MongoDB _id</li>
  </ul>
  <li>Prevents deletion of admin accounts</li>
</ul>

<h1>🔒 Security Middleware authenticate</h1>
<ul>
  <li>Verifies JWT from cookies</li>
  <li>Attaches user to req.user</li>
  <li>Blocks unauthorized requests</li>
  <li>authorizedAdmin</li>
  <li>Checks if the user is an admin</li>
  <li>Protects admin-only routes</li>
</ul>