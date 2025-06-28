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

<h1>Day 2</h1> 
<h1>🎨 Technical Stack (Frontend)</h1> 
<ul> 
  <li>React.js with Vite</li> 
  <li>React Router DOM for client-side routing</li> 
  <li>Redux Toolkit with RTK Query for state management and API calls</li> 
  <li>React Toastify for notifications</li> 
  <li>Custom CSS (no external frameworks)</li> 
</ul> 
<h1>🚀 Features Implemented (Frontend)</h1> 
<h2>🧭 Navigation</h2> 
<ul> 
  <li>Sidebar-based Navigation Component</li> 
  <li>Dynamic highlighting of routes</li> 
  <li>Responsive hover to expand nav items</li> 
  <li>Includes links to Home, Profile, Calendar, Tests</li> 
  <li>Login and Register links shown conditionally</li> 
</ul> 
<h2>🔐 Authentication (Frontend)</h2> 
<ul> 
  <li>Login Page (Login.jsx)</li> 
  <li>Uses RTK Query login mutation</li> 
  <li>Redirects logged-in users using `useLocation` and `navigate`</li> 
  <li>Stores credentials in Redux store using `setCredentials`</li> 
  <li>Error handling with React Toastify</li> 
  <li>Loader shown during login request</li> 
  <li>Preserves redirect path in login/register flows</li> 
</ul> 
<h2>🧱 Structure & Styling</h2> 
<ul> 
  <li>Set up shared App layout with Navigation + Outlet</li> 
  <li>Different background styles for Login screen using scoped CSS</li> 
  <li>Maintained navigation bar visibility across routes, including Login</li> 
  <li>Scoped Home and Login background styles to prevent overlap</li> 
</ul> 
<h2>⚙️ Configurations & Utilities</h2> 
<ul> 
  <li>Configured proxy in Vite to redirect `/api/` to backend</li> 
  <li>Enabled `credentials: include` in baseQuery for cookie-based JWT auth</li> 
  <li>Fixed import paths and ensured consistent Redux store setup</li>
</ul>

<h1>🌱 Calendar Module (Frontend)</h1>

<ul>
  <li>Added a new Calendar page for month-wise mental health tracking.</li>
  <li>Created a responsive grid of 12 months with clean styling.</li>
  <li>Implemented navigation to individual month views using dynamic routes.</li>
  <li>Used <code>react-router-dom</code> dynamic route: <code>/calendar/:month</code> to open a calendar view per month.</li>
</ul>

<h1>📅 Month View Page</h1>
<ul>
  <li>Built a reusable <code>MonthView</code> component using <code>useParams()</code>.</li>
  <li>Automatically determines the number of days in the selected month (28–31 days).</li>
  <li>Utilized JavaScript Date API: <code>new Date(year, month + 1, 0).getDate()</code> to calculate accurate days.</li>
  <li>Displayed each day in a visually distinct grid layout.</li>
  <li>Styled day boxes to show small day numbers at the top-right corner of each box.</li>
  <li>Fully responsive layout ready for extension (e.g., mood icons or journal entries per day).</li>
</ul>

<h1>🎨 Styling Improvements</h1>
<ul>
  <li>Used CSS Grid to organize the month buttons into 4 rows and 3 columns.</li>
  <li>Centered the entire calendar module both vertically and horizontally.</li>
  <li>Improved UI consistency with custom font, padding, and hover effects for buttons.</li>
</ul>