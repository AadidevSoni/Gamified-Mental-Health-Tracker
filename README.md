# 🧠 Mindleap

**Mindleap** is a calming, gamified mental health tracker that helps users analyze their mood, sleep, and emotional wellness.  
This is done through an interactive and engaging quiz called the **SCADS Test**, which evaluates five key mental health parameters:

- **S** — Stress  
- **C** — Concentration  
- **A** — Anxiety  
- **D** — Depression  
- **S** — Self-Worth  

The SCADS Test generates a personalized wellness report and gives suggestions based on the user's current mental state.

---

## 🌿 Daily Wellness Visual — The Lily Pad

Your daily progress is visualized using a **lily pad that changes color** depending on your SCADS score:

- 🟥 **Red** – High distress  
- 🟧 **Orange** – Moderate imbalance  
- 🟨 **Yellow** – Moderate balance  
- 🟩 **Green** – Balanced and healthy  

The **calendar section** displays a lily pad for each day of the year, helping users identify mental health trends over time.

---

## 🌟 Key Features

### 🧑‍💼 User Profile Management
- View current profile with username, email, level, and EXP
- Display earned **badge** based on level
- Track total lily pads collected with color breakdown
- Update profile info (username, email, password)

---

### 📅 Daily Mental Health Test
- **Submit once per day** (resets at midnight)
- Inputs:
  - Sleep hours  
  - Daily activities  
  - 20 introspective questions (4 per SCADS category)
- Calculates and stores:
  - Total wellness score
  - Individual category scores
- Personalized suggestions based on each category score

---

### 🛠️ Admin Functionality
- Protected by `authenticate` and `authorizedAdmin` middleware
- Admin features:
  - View all user accounts (excluding passwords)
  - Edit usernames and emails
  - Delete accounts (except other admins)

---

### 🎯 Activity Overview
- Grid of engaging wellness activities (Yoga, Journaling, Art, etc.)
- Each activity links to a themed content page
- Includes external resources for music, books, visual entertainment

---

### 📆 Score Calendar
- Visualizes your daily score using colored lily pads:
  - 🟥 Score < 50  
  - 🟧 50–79  
  - 🟩 80+  
- Automatically pulls data from each user’s `scoreHistory`

---

### 🏆 Leaderboard
- Ranks users based on:
  - **Level**
  - **EXP** (gained from SCADS test scores)
- EXP System:
  - Earn EXP equal to your SCADS test score
  - Level up at every 100 EXP (resets to 0 after leveling)
  - Better mental health → higher level!

---

## 🔐 Authentication
- JWT-secured login system
- Features:
  - User Registration
  - Login / Logout
  - Secure password hashing with `bcryptjs`
  - Cookie-based session tracking

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Redux Toolkit  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT, bcryptjs, cookie-parser  

---

## 📌 Future Enhancements
- Habit tracking and streaks  
- Avatar customization based on achievements  
- Challenge rooms for group check-ins  
- Mobile PWA support for daily reminders  

---

> 🌱 *Mindleap is your daily mental wellness companion — grow one lily pad at a time.*
