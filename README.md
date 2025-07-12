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

### User Profile Management
•⁠  Get Current User Profile 
•⁠  Displays User Level and Exp as well as a *Badge* according to the user's level
•⁠  Display total number of lilypads collected along with the color of the lilypad
•⁠  Update User Profile 
•⁠  Allows updating
  •⁠  username
  •⁠  email (with duplication check)
  •⁠  password (securely re-hashed)

### Daily Mental Health Test 
•⁠  ⁠Submit once a day (resets at midnight)
•⁠  ⁠Inputs: Sleep hours, activities, 10 introspective questions
•⁠  ⁠Calculates a wellness score as well as scores for each of the 5 categories and saves it with date
•⁠  Gives suggestions according to the score they get for each of thr 5 categories

### Admin Functionality
•⁠  Protected by authenticate and authorizedAdmin middlewares.
•⁠  Get all User details except the password
•⁠  Update User name and email ID
•⁠  Delete user accounts
•⁠  Prevents deletion of admin accounts

### Activity Overview
•⁠  ⁠Grid of wellness activities (Yoga, Journaling, Art, etc.)
•⁠  ⁠Each links to a detailed content page
•⁠  Including links to visual entertainment, music and reading websites.

### Score Calendar 
•⁠  ⁠Visualizes daily scores using colored lily pads:
  - 🟥 < 50
  - 🟧 50–79
  - 🟩 80+
•⁠  ⁠Pulls the score from each user’s⁠ scoreHistory ⁠

### Leaderboard
•⁠  ⁠Leaderoard where users are ranked according to their level and exp
•⁠  ⁠Level and exp are gained from the SCAD test scores that the user gets.
•⁠  User gains the exp equivalent to the SCAD score received and the exp resets to 0 and level increments by 1 when the exp reaches 100
•⁠  ⁠Better the mental well being, higher the level!

---

## Additional Highlights

•⁠  User registration , login and logout system
•⁠  ⁠JWT-secured user login & profile

---

## ⚙️ Tech Stack

•⁠  ⁠*Frontend:* React.js, Redux.js
•⁠  ⁠*Backend:* Node.js, Express.js  
•⁠  ⁠*Database:* MongoDB, Mongoose  
•⁠  ⁠*Auth:* JWT, bcryptjs, cookie-parser