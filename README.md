<h1 align="center">Planning Poker App</h1>

Free / Open source Scrum/Agile Planning Poker Web App to estimate user stories for the Agile/Scrum teams. Create session and invite team members to estimate user stories efficiently. Intuitive UI/UX for voting the story points, showing team members voting status with emojis(👍 - Voting Done, 🤔 - Yet to Vote). Session Moderator has full control on revealing story points and restarting the session.

<div align="center">
  
[![Build and Tests](https://github.com/hellomuthu23/planning-poker/actions/workflows/build-and-tests.yml/badge.svg)](https://github.com/hellomuthu23/planning-poker/actions/workflows/build-and-tests.yml)
[![Deploy to Firebase](https://github.com/hellomuthu23/planning-poker/actions/workflows/deploy-to-firebase-on-master.yml/badge.svg)](https://github.com/hellomuthu23/planning-poker/actions/workflows/deploy-to-firebase-on-master.yml)

</div>

## Live Site

- <https://planning-poker-agile.web.app/>

## Home Page

<img src="docs/HomePage.jpg"  />

## Active Session

<img src="docs/ActiveSession.jpg"  />

## Features

1. Create new Session(Fibonacci, Short Fibonacci, TShirt size or Custom)
2. Join Session
3. Invite Link
4. **QR Code Generation** - Quickly share session link via QR code for easy mobile joining
5. Share User story name/number with others using the board
6. Session controller - Moderator can Reveal and restart the session anytime.
7. Reveal - Reveal the cards for all users
8. Voting status - Users Cards show voting status using emojis - 👍 - Voting Done, 🤔 - Yet to Vote, 👁️ - Spectator
9. **Spectator Mode** - Join sessions as an observer without participating in voting
10. Remove user from session
11. Delete Session - Moderator can delete the session completely
12. Dark Theme Support
13. Multiple language support
14. Mobile/Tablet screen support
15. Timer 

## Tech Stack

1. React - Frontend
2. Tailwind CSS - For styling
3. Firestore - Database
4. Firebase - Hosting

## How to run the app locally for development

Pre-req

- Node.js version 16.0 or higher.
- Yarn
- Java JDK version 11 or higher.(for firestore db emulator)

1. Clone the repo

   ```bash
   git clone https://github.com/hellomuthu23/planning-poker.git
   ```

2. Run `yarn` command to install the required npm package.
3. Install the Firebase CLI

   ```bash
   npm install -g firebase-tools
   ```

4. Start the firebase db emulator

   ```bash
   npm run start:emulator
   ```

5. Copy `.env.example` file as `.env` file and make sure `REACT_APP_USE_FIRESTORE_EMULATOR` is set to `true`
6. Run `yarn start` to start the app.
7. Access the app at `http://localhost:3000`.

## Creating docker container

pre-req

- docker desktop

1. Build the app using below command. Make sure `REACT_APP_USE_FIRESTORE_EMULATOR` env variable is set to true.

   ```bash
   npm run build
   ```

2. Build docker image

   ```bash
   docker build -t planning-poker .
   ```

3. Running the container

   ```
   docker run -it -p 8080:8080 -p 3000:3000  planning-poker
   ```

4. Wait for both emulator and app to start
5. Access the app from local container using <http://localhost:3000>

## Development Guidelines

1. Keep it simple as much as possible
2. Add required unit tests
3. Use strong type always
4. Use functional and hooks based approach for components
5. Avoid adding new colors
6. Use tailwind utility classes for styling the components
7. Don't duplicate code and use service folder to keep non-component/shared codes

## New Features (Latest Updates)

### QR Code Generation

Share your planning poker session instantly with team members using QR codes:
- Click the "QR Code" button in the game controller
- Display the QR code on your screen
- Team members can scan with their phone camera to join instantly
- Perfect for in-person meetings or screen sharing

### Spectator Mode

Allow team members to observe voting sessions without participating:
- Toggle spectator mode using the switch in the game controller
- Spectators see all activity but cannot vote
- Spectator cards display an eye icon (👁️)
- Voting calculations automatically exclude spectators
- Great for stakeholders, new team members, or rotating facilitators

## Documentation

For detailed information, see:
- [Architecture Documentation](docs/ARCHITECTURE.md) - Complete system design with diagrams
- [Features Overview](docs/FEATURES.md) - Detailed feature descriptions
- [Deployment Guide](docs/DEPLOYMENT.md) - Step-by-step deployment to your Firebase account

## Pending features open to development

1. Export options
2. Preserve history of voting and show it in session
3. Ask AI Option

## Tech Debts

1. Add Semantic Release to generate changelog and release notes
2. Add missing unit tests for services

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hellomuthu23)
