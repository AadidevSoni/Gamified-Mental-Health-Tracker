# 🧠 Mindleap

*Mindleap* is a calming gamified mental health tracker that helps users reflect on mood, sleep, and emotional wellness.  
Your daily progress is visualized through a *lily pad that changes color*:

•⁠  ⁠🟥 *Red* – High distress  
•⁠  ⁠🟧 *Orange* – Moderate imbalance  
•⁠  🟨 *Yellow* – Moderate balance
•⁠  ⁠🟩 *Green* – Balanced and healthy  

---

## 🌟 Key Features

### 🧪 Daily Mental Health Test (⁠ /test ⁠)
•⁠  ⁠Submit once a day (resets at midnight)
•⁠  ⁠Inputs: Sleep hours, activities, 10 introspective questions
•⁠  ⁠Calculates a wellness score and stores it with the date
•⁠  ⁠Full-screen frog-themed background + loading animation

### 🌿 Activity Overview (⁠ /activities ⁠)
•⁠  ⁠Grid of wellness activities (Yoga, Journaling, Art, etc.)
•⁠  ⁠Each links to a detailed content page
•⁠  ⁠Soothing background video + loader

### 📆 Score Calendar (⁠ /calendar/:month ⁠)
•⁠  ⁠Visualizes daily scores using colored lily pads:
  - 🟥 < 50
  - 🟧 50–79
  - 🟩 80+
•⁠  ⁠Pulls from each user’s ⁠ scoreHistory ⁠

---

## 🔄 Additional Highlights

•⁠  ⁠JWT-secured user login & profile
•⁠  ⁠Score stored in MongoDB per day
•⁠  ⁠Admin dashboard for managing users

---

## 🔜 Coming Soon

•⁠  ⁠🎯 XP Levels & Achievements  
•⁠  ⁠🎨 Avatar Customization  
•⁠  ⁠🏆 Leaderboard & Green-Day Challenges  
•⁠  ⁠🛍️ Virtual Reward Store  

---

## ⚙️ Tech Stack

•⁠  ⁠*Backend:* Node.js, Express.js  
•⁠  ⁠*Database:* MongoDB, Mongoose  
•⁠  ⁠*Auth:* JWT, bcryptjs, cookie-parser