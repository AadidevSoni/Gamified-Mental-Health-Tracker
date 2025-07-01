# Gamified-Mental-Health-Tracker

<h1>⚙️ Technical Stack [MERN Stack]</h1>
<ul>
  <li>HTML + CSS + React.js (frontend)</li>
  <li>Node.js + Express.js (backend)</li>
  <li>MongoDB + Mongoose (database)</li>
</ul>

<h1>📦 Packages Used📦</h1>

<h2>Backend Packages</h2>
<ul>
  <li>🔁 Nodemon for auto restarting server on changes</li>
  <li>📦 Multer for handling form-data, used for uploading files</li>
  <li>🍃 Mongoose for ODM (Object Data Modeling) library for MongoDB</li>
  <li>🔐 Jsonwebtoken for creating and verifying jwt for authentication and authorization</li>
  <li>📝 Express-formidable for parsing form data and file uploads like Multer</li>
  <li>⚙️ Express-async-handler for simplifying error handling in async/await route handlers</li>
  <li>🌍 Express for framework for building web servers and APIs in Node.js.</li>
  <li>🔐 Dotenv for loading environment variables from .env files</li>
  <li>🔄 Cors for enabling Cross-Origin Resource Sharing for communication between frontend and backend</li>
  <li>🍪 Cookie-parser for parsing Cookie header and populates req.cookies with an object</li>
  <li>🚀 Concurently for running multiple commands/scripts in parallel like frontend and backend</li>
  <li>🔐 Bcryptjs for password hashing</li>
</ul>

<h2>Frontend Packages</h2>
<ul>
  <li>🎠 Slick-carousel for responsive image sliders or product carousels</li>
  <li>🚗 react-slick for building carousels/sliders</li>
  <li>🔔 React-toastify for displaying toast notifications  </li>
  <li>🧭 React-router and react-router-dom for routing/navigation in React apps</li>
  <li>🧠 React-redux for connecting React with Redux for global state management</li>
  <li>🎨 React-icons for using popular icons</li>
  <li>📊 Apexcharts for visualizing charts</li>
  <li>📊 react-apexcharts for React wrapper for apexcharts</li>
  <li>🕒 moment for date and time manipulation</li>
  <li>🔗 axios for making API requests like fetching datas from backend</li>
  <li>🧰 @reduxjs/toolkit for modern way to write Redux logic with less boilerplate</li>
</ul>

<h1>🚀 Features Implemented (Backend)</h1>

<h1>✅ Authentication System</h1>

<ul>
  <li>User Registration (POST /api/users)</li>
  <li>Validates username, email, and password</li>
  <li>Hashes password securely using bcryptjs</li>
  <li>Creates token/cookies upon login</li>
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

<h1>🌟 UI/UX Enhancements</h1>
<ul>
  <li>Introduced video background sections for Login, Register, and Profile screens using MP4 assets.</li>
  <li>Scoped overlay and brightness filters to enhance visual appeal without affecting form readability.</li>
  <li>Implemented custom full-screen loading animation with spinner and message for transitions.</li>
  <li>Improved responsiveness and contrast of form inputs/buttons across different resolutions.</li>
</ul>

<h1>👤 Profile Management (Frontend)</h1>
<ul>
  <li>Created Profile Page (<code>Profile.jsx</code>) to allow users to update:</li>
  <ul>
    <li>Username</li>
    <li>Email</li>
    <li>Password</li>
  </ul>
  <li>Preserves existing values using <code>useEffect</code> from Redux store (<code>auth</code> slice).</li>
  <li>Uses RTK Query’s <code>useProfileMutation</code> to submit updates to the backend.</li>
  <li>Displays success and error messages via toast notifications.</li>
  <li>Form validation includes password match check before submission.</li>
</ul>

<h1>🔁 Reusable Loader Integration</h1>
<ul>
  <li><code>Loader</code> component reused across Login, Register, and Profile pages.</li>
  <li>Conditional rendering of loader during API calls.</li>
  <li>Loading screen on page mount (e.g., Profile) to create smooth transitions.</li>
</ul>

<h1>📁 Media Management</h1>
<ul>
  <li>Handled large video file hosting concerns by storing them in the <code>public/videos</code> folder (not pushed to GitHub).</li>
  <li>Git ignored heavy media files via <code>.gitignore</code> while ensuring local Netlify builds work using public assets.</li>
</ul>

<h1>📽️ Background Video Styling</h1>
<ul>
  <li>Full-screen background video layout using <code>&lt;video&gt;</code> and CSS <code>object-fit: cover</code>.</li>
  <li>Overlay implemented with semi-transparent div for better contrast.</li>
  <li>Brightness filters and layering handled via <code>z-index</code> and <code>pointer-events</code> to keep forms interactive.</li>
</ul>

<h1>Development</h1>

<h2>Initial Setup and Backend</h2>
<ul> 
  <li>Creation of repository and installation of react vite</li>
  <li>Importing all frontend and backend packages and folder creations</li>
  <li>Modifying running scripts in package.json and project clean up</li>
  <li>Connecting to mongoDB database</li>
  <li>Running the app (index.js) and see if the backend works on Postman</li>
  <li>Creating routes (userRoutes) for different pages</li>
  <li>Creating userSchema and Model</li>
  <li>Creating an asyncHandler for catching errors of every async functions</li>
  <li>Creating a createUser user controller and route it to post of '/' path</li>
  <li>Hashing the password and test it in postman and the user must be created in mongoDB</li>
  <li>Creation of token and cookies in createToken utils</li>
  <li>Importing it in userController and create a token when new user created or logged in</li>
  <li>Testing it in Postman to see the cookie generation</li>
  <li>Creating login and logout routes</li>
  <li>Creating userController for login and logout</li>
  <li>Creating authentication and authorization middleware and importing to userRoutes</li>
  <li>Creating get all users if authenticated and authorized and get request in '/' route</li>
  <li>Creating get all users functionality in userController and testing in Postman</li>
  <li>Creating getUserProfile in userRoutes if get request in '/profile' route</li>
  <li>Creating getUserProfile functionality in userController and testing in Postman</li>
  <li>Creating updateUserProfile in userRoutes if put request in '/profile' route</li>
  <li>Creating updateUserProfile functionality in userController and testing in Postman</li>
  <li>Creating a '/:id' route with delete request for deleting user from admin side</li>
  <li>Creating a '/:id' route with get request for getting user from admin side</li>
  <li>Creating a '/:id' route with put request for updating user from admin side</li>
</ul> 

<h2>Frontend development</h2>
<ul>
  <li>Seting up main.jsx with browserRouter and routerProvider</li>
  <li>Creating App.jsx with all components</li>
  <li>Creating Navigation.jsx to include all 6 icons and transitions</li>
  <li>Using Redux Toolkit and RTK Query to manage authentication and API interactions</li>
  <li>Creating constants.js with API endpoints</li>
  <li>Defining API endpoints for user related operations in userApiSlice.js</li>
  <li>Creating authSice redux slice which initializes state from local storage</li>
  <li>Creating redux store and setting up RTK Query middleware.</li>
  <li>Provide this redux store to entire app in main.jsx</li>
  <li>Implementing useSelector,useDispacth and useLoginMutation in Navigation.jsx to display username</li>
  <li>Creating Home Page, Calendar page and MonthView Page</li>
  <li>Creating the Login Screen and logging in the user</li>
  <li>Creating dropdown button in user for logout and profile</li>
  <li>Creating logoutMutation endpoint and using it in Navigation logoutHandler to logout the user</li>
  <li>Creating Register page and registerMutation endpoint</li>
  <li>Massive redesign of website</li>
  <li>Creating a PrivateRoute component for Profile</li>
  <li>Creating PrivateRoute component in main.jsx and adding Profile component in it</li>
  <li>Creating a useProfileMutation in userApiSlice</li>
  <li>Creating the Profile page</li>
  <li>Create Admin Routes and import it in main.jsx and create userList route</li>
  <li>Create Message controller</li>
  <li>Creating all userApiSlice for admin functiionalities and exporting the mutation hooks</li>
  <li>Creating userlist page to view all users from admin side</li>
  <li>Creating delete and update user functionality for users</li>
  <li>Creating getLeaderBoard router in userRoutes</li>
  <li>Creating getLeaderBoard userController with the logic to rank the users</li>
  <li>Creating a userApiSlice getLeaderboard query</li>
  <li>Using it in Leaderbaoard.jsx and rendering the leaderbaord</li>
</ul>