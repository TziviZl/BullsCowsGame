# BullsCowsGame
🎯 REST API game of Bulls &amp; Cows built with TypeScript, Express, and MongoDB – including player management, game logic, validation, and Postman tests.

## 🧩 About the Project
This project is a backend implementation of a classic number guessing game. The player tries to guess a secret 4-digit code generated randomly, where digits are unique and range from 1 to 9. Each guess returns feedback about how many digits are correct and in the correct position, and how many digits are correct but in the wrong position.

---

## 🛠 What I Built
I implemented the backend using **Node.js**, **Express**, and **TypeScript**, with **MongoDB** as the database. The project is structured into features like `games` and `players`, with clear separation of concerns using controllers, services, and models.

Input validation middleware ensures guesses are valid (4 unique digits between 1–9), and player data like emails and passwords are properly checked.

All game data and user info are stored in MongoDB, including guess history and game statuses.

---

## 📁 Project Structure
The codebase is organized as follows:

src/  
├── app.ts  
├── server.ts  
├── db/ // Database connection  
├── games/ // Game logic and API  
├── players/ // Player logic and API  
└── middleware/ // Validation middlewares  


---

## 🌐 API Features
- Player registration and login
- Starting a new game with a random secret code
- Submitting guesses with feedback on matches
- Retrieving game status and guess history
- Ending a game early
- Viewing leaderboard with top players
- Editing and deleting player profiles

---

## 📬 Postman Testing
A Postman collection was created to test all endpoints, including valid and invalid scenarios to demonstrate middleware validations and full game flows.

---

## 🚀 Technologies Used
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Postman
- REST API with validation middleware

