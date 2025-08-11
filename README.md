## Mindleap
Mindleap is a mental health tracking platform that combines gamification with personalized insights to support emotional well-being. It features the SCADS Test, an interactive quiz assessing five key mental health parameters:

- Stress
- Concentration
- Anxiety
- Depression
- Self-Worth

---
## Screenshots
<table>
  <tr>
    <td><img src="frontend/public/pictures/HOME.png" width="420"></td>
    <td><img src="frontend/public/pictures/PROFILE.png" width="420"></td>
  </tr>
  <tr>
    <td><img src="frontend/public/pictures/GAME.png" width="420"></td>
    <td><img src="frontend/public/pictures/CALENDAR.png" width="420"></td>
  </tr>
</table>

## Hosting status - Not Hosted

## Features Implemented
## Frontend

## User Profile Management

- View and update profile details (username, email, password).
- Track earned badges, total lily pads and their colors, and level progress.

## Daily Wellness Visualization

- Lily Pad Indicator: Changes color (Red, Orange, Yellow, Green) based on your SCADS score to reflect your daily mental health status.
- Score Calendar: Displays lily pads across the year, highlighting mental health trends over time.

## SCADS Test & Reports

- Submit a daily mental health assessment (once per day).
- Input sleep, activities, and answer introspective questions.
- Receive personalized scores, insights, and suggestions as well as a colored lilypad depending on your mental health score.

## Data Visualization & Analysis

- Graphical representation of your mental health patterns across categories.
- Analytical reports highlighting areas for improvement.

## Activities & Resources

- Engage with wellness activities (e.g., Yoga, Journaling, Art).
- Access external resources like music, books, and visual content.

## Score Tracking & Leaderboard

- Visualize daily scores with color-coded lily pads.
- Compete and compare with others based on level and EXP.
- Gain EXP from SCADS scores, leveling up as your mental health improves.

## Gamified Experience: Froggy’s Journey

- A mini-game simulating weekly progress, where lily pads earned influence Froggy’s crossing across a pond.
- Visualize weekly trends and motivate positive changes through interactive gameplay.
- Gain Exp by beating the game everyday with the lilypads you collected.
---
## Backend

## Security & Admin Features

- JWT-based authentication with bcryptjs for secure login.
- Admin panel protected by middleware to manage user accounts, view reports, and perform edits.
- Data Stored in Mongodb Cloud
---

<h1>⚙️ Technical Stack [MERN Stack]</h1>
<ul>
  <li>HTML + CSS + React.js (frontend)</li>
  <li>Node.js + Express.js (backend)</li>
  <li>MongoDB + Mongoose (database)</li>
</ul>

## Packages Used

<h2>Frontend Packages</h2>
<ul>
  <li>🔔 React-toastify for displaying toast notifications  </li>
  <li>🧭 React-router and react-router-dom for routing/navigation in React apps</li>
  <li>🧠 React-redux for connecting React with Redux for global state management</li>
  <li>🎨 React-icons for using popular icons</li>
  <li>📊 Recharts for visualizing charts</li>
  <li>🔗 axios for making API requests like fetching datas from backend</li>
  <li>🧰 @reduxjs/toolkit for modern way to write Redux logic with less boilerplate</li>
</ul>

<h2>Backend Packages</h2>
<ul>
  <li>🔁 Nodemon for auto restarting server on changes</li>
  <li>🍃 Mongoose for ODM (Object Data Modeling) library for MongoDB</li>
  <li>🔐 Jsonwebtoken for creating and verifying jwt for authentication and authorization</li>
  <li>⚙️ Express-async-handler for simplifying error handling in async/await route handlers</li>
  <li>🌍 Express for framework for building web servers and APIs in Node.js.</li>
  <li>🔐 Dotenv for loading environment variables from .env files</li>
  <li>🍪 Cookie-parser for parsing Cookie header and populates req.cookies with an object</li>
  <li>🚀 Concurently for running multiple commands/scripts in parallel like frontend and backend</li>
  <li>🔐 Bcryptjs for password hashing</li>
</ul>

---

## 🖥️ Localhost Setup
Follow these steps to run the project locally:

## Note:
- You have to manually install all .mp4 files from frontend/public/videos and paste in their respective folders
- This is because these files are large and were pushed through git lfs
- If this is not done, none of the background Videos will be visible!

## 1️⃣ Clone the Repository
<pre>
git clone https://github.com/AadidevSoni/Gamified-Mental-Health-Tracker.git
cd Gamified-Mental-Health-Tracker
</pre>

## 2️⃣ Install Dependencies
<pre>
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
</pre>

# 3️⃣ Configure Environment Variables
In the main directory, outside frontend and backend folder, create a .env file with the following:
<pre>

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

</pre>

## 4️⃣ Start the Development Servers

<pre>
# Start the Backend
cd backend
npm run server

# Start the Frontend
cd ../frontend
npm run dev
</pre>

---

## Team Members
- Aadidev Soni
- Ishika Gupta

---

## Demo Video
[🎥 Watch Demo](frontend/public/videos/Demo.mp4)

## Note:
Demo video was recorded a week before final website
Features implemented:
- Better gameplay fonts
- Exp gained on winning the game 
- Game playable only once a day

---
