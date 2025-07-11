# 🧠 Mindleap

*Mindleap* is a calming gamified mental health tracker that helps users analyse their mood, sleep, and emotional wellness.  
This is done with the help of an interactive, fun quiz that analyses various mental health parameters such as:
• Stress 
• Concentration
• Anxiety
• Depression 
• Self Worth
And hence the name *SCADS TEST*. This test gives a daily report and suggestion to the user regarding their mental well being.

Your daily progress is visualized through a *lily pad that changes color* depending on the *SCADS score*:
The user can keep track of their mental well being every day of they year in the calendar section.

•⁠  ⁠🟥 *Red* – High distress  
•⁠  ⁠🟧 *Orange* – Moderate imbalance  
•⁠  🟨 *Yellow* – Moderate balance
•⁠  ⁠🟩 *Green* – Balanced and healthy  

By analysing the lily pad color, the user knows their mental health pattern each day.
---

## 🌟 Key Features

### 🧪 Daily Mental Health Test (⁠ /test ⁠)
•⁠  ⁠Submit once a day (resets at midnight)
•⁠  ⁠Inputs: Sleep hours, activities, 10 introspective questions
•⁠  ⁠Calculates a wellness score as well as scores for each of the 5 categories and saves it with date
•⁠  Gives suggestions according to the score they get for each of thr 5 categories

### 🌿 Activity Overview (⁠ /activities ⁠)
•⁠  ⁠Grid of wellness activities (Yoga, Journaling, Art, etc.)
•⁠  ⁠Each links to a detailed content page
•⁠  Including links to visual entertainment, music and reading websites.

### 📆 Score Calendar (⁠ /calendar/:month ⁠)
•⁠  ⁠Visualizes daily scores using colored lily pads:
  - 🟥 < 50
  - 🟧 50–79
  - 🟩 80+
•⁠  ⁠Pulls the score from each user’s⁠ scoreHistory ⁠

### 📆 Leaderboard ( /leaderboard)
•⁠  ⁠Leaderoard where users are ranked according to their level and exp
•⁠  ⁠Level and exp are gained from the SCAD test scores that the user gets.
•⁠  ⁠Better the mental well being, higher the level!

---

## 🔄 Additional Highlights

•⁠  ⁠JWT-secured user login & profile
•⁠  ⁠Admin dashboard for managing users

---

## 🔜 Coming Soon

•⁠  ⁠🎯 XP Levels & Achievements  
•⁠  ⁠🎨 Avatar Customization  
•⁠  ⁠🏆 Leaderboard & Green-Day Challenges  
•⁠  ⁠🛍️ Virtual Reward Store  

---

## ⚙️ Tech Stack

•⁠  ⁠*Frontend:* React.js, Redux.js
•⁠  ⁠*Backend:* Node.js, Express.js  
•⁠  ⁠*Database:* MongoDB, Mongoose  
•⁠  ⁠*Auth:* JWT, bcryptjs, cookie-parser