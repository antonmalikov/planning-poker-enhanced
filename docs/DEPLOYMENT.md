# Deployment Guide - Planning Poker Enhanced

This guide will help you deploy Planning Poker to your own Firebase account.

## 📋 Prerequisites

Before starting, ensure you have:

- [ ] Node.js version 16.0 or higher installed
- [ ] Yarn package manager installed
- [ ] A Google/Firebase account
- [ ] Firebase CLI installed globally

## 🚀 Step-by-Step Deployment

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., `my-planning-poker`)
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

### Step 2: Set Up Firestore Database

1. In your Firebase project console, go to **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set up rules next)
4. Select your preferred location (choose closest to your team)
5. Click **"Enable"**

### Step 3: Configure Firestore Security Rules

1. In Firestore console, go to the **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Games collection - allow read/write for all authenticated users
    match /games/{gameId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if true;
      
      // Players subcollection within games
      match /players/{playerId} {
        allow read: if true;
        allow create: if true;
        allow update: if true;
        allow delete: if true;
      }
    }
  }
}
```

3. Click **"Publish"**

> **Note**: These rules allow public access. For production, consider implementing authentication.

### Step 4: Set Up Firebase Hosting

1. In Firebase Console, go to **"Build"** → **"Hosting"**
2. Click **"Get started"**
3. Follow the setup wizard (we'll configure via CLI next)

### Step 5: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Register your app (give it a name like "Planning Poker Web")
5. Copy the Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 6: Clone and Configure the Repository

1. Clone your fork or the original repository:

```bash
git clone https://github.com/antonmalikov/planning-poker-enhanced.git
cd planning-poker-enhanced
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Edit `.env` with your Firebase configuration:

```env
VITE_FB_API_KEY=your-api-key
VITE_FB_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FB_PROJECT_ID=your-project-id
VITE_FB_STORAGE_BUCKET=your-project.appspot.com
VITE_FB_MESSAGING_SENDER_ID=your-sender-id
VITE_FB_APP_ID=your-app-id
VITE_FB_MEASUREMENT_ID=your-measurement-id
VITE_USE_FIRESTORE_EMULATOR=false
```

> **Important**: Set `VITE_USE_FIRESTORE_EMULATOR=false` for production!

### Step 7: Install Firebase CLI

If you haven't already:

```bash
npm install -g firebase-tools
```

### Step 8: Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

### Step 9: Initialize Firebase in Your Project

```bash
firebase init
```

When prompted:

1. **Select features**: Choose `Hosting` (use spacebar to select)
2. **Select project**: Choose "Use an existing project" and select your project
3. **Public directory**: Enter `build` (default is correct)
4. **Configure as SPA**: Yes
5. **Set up automatic builds**: No (optional)
6. **Overwrite index.html**: No

### Step 10: Update Firebase Configuration File

Edit `firebase.json` to match:

```json
{
  "hosting": {
    "site": "your-custom-site-name",
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Step 11: Build the Application

```bash
yarn build
```

This creates an optimized production build in the `build/` directory.

### Step 12: Deploy to Firebase Hosting

```bash
firebase deploy
```

You should see output like:

```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id/overview
Hosting URL: https://your-project-id.web.app
```

### Step 13: Access Your Deployed App

Visit the Hosting URL provided (e.g., `https://your-project-id.web.app`)

## 🔧 Optional: Custom Domain

### Set Up a Custom Domain

1. In Firebase Console, go to **"Hosting"**
2. Click **"Add custom domain"**
3. Enter your domain name (e.g., `planningpoker.yourdomain.com`)
4. Follow the verification steps:
   - Add TXT record to your DNS
   - Add A records once verified
5. Wait for SSL certificate provisioning (can take up to 24 hours)

## 🔄 Continuous Deployment (Optional)

### Set Up GitHub Actions

1. Create a Firebase service account:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Go to **IAM & Admin** → **Service Accounts**
   - Create a service account with Firebase Admin role
   - Generate a JSON key

2. Add the key to GitHub Secrets:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add `FIREBASE_SERVICE_ACCOUNT` with the JSON key content

3. The `.github/workflows/deploy-to-firebase-on-master.yml` should already exist in the repo. Update it if needed:

```yaml
name: Deploy to Firebase
on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: yarn install
        
      - name: Build
        run: yarn build
        env:
          VITE_FB_API_KEY: ${{ secrets.VITE_FB_API_KEY }}
          VITE_FB_AUTH_DOMAIN: ${{ secrets.VITE_FB_AUTH_DOMAIN }}
          VITE_FB_PROJECT_ID: ${{ secrets.VITE_FB_PROJECT_ID }}
          VITE_FB_STORAGE_BUCKET: ${{ secrets.VITE_FB_STORAGE_BUCKET }}
          VITE_FB_MESSAGING_SENDER_ID: ${{ secrets.VITE_FB_MESSAGING_SENDER_ID }}
          VITE_FB_APP_ID: ${{ secrets.VITE_FB_APP_ID }}
          VITE_FB_MEASUREMENT_ID: ${{ secrets.VITE_FB_MEASUREMENT_ID }}
          VITE_USE_FIRESTORE_EMULATOR: false
          
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

4. Add all Firebase config values as GitHub Secrets

## 🧪 Testing Your Deployment

1. **Create a test game**:
   - Visit your deployed URL
   - Click "Create Session"
   - Enter a session name
   - Choose a game type (e.g., Fibonacci)
   - Click "Create"

2. **Join from another device/browser**:
   - Copy the invite link from your game
   - Open in incognito/another device
   - Enter a different name
   - Join the game

3. **Test voting**:
   - Vote on both devices
   - Use "Reveal" button to show results
   - Test "Restart" to reset votes

## 🐛 Troubleshooting

### Build Fails

**Error**: `Cannot find module` or dependency issues
- **Solution**: Delete `node_modules` and `yarn.lock`, then run `yarn install` again

### Deployment Fails

**Error**: `Permission denied`
- **Solution**: Run `firebase login` again and ensure you have owner/editor access to the project

### App Loads But Shows Errors

**Error**: Firebase configuration errors
- **Solution**: Double-check all values in `.env` file match your Firebase project settings

### Real-time Updates Don't Work

**Error**: Firestore connection issues
- **Solution**: 
  1. Check Firestore is enabled in Firebase Console
  2. Verify security rules are published
  3. Check browser console for specific errors

### App Works Locally But Not in Production

**Error**: Environment variable issues
- **Solution**: Ensure `VITE_USE_FIRESTORE_EMULATOR=false` in production `.env`

## 📊 Monitoring Your Deployment

### Firebase Console Metrics

1. **Hosting Usage**:
   - Go to Hosting in Firebase Console
   - View bandwidth, requests, and storage

2. **Firestore Usage**:
   - Go to Firestore Database
   - Check "Usage" tab for reads/writes/storage

3. **Performance**:
   - Enable Performance Monitoring in Firebase
   - Track page load times and app metrics

### Cost Management

Firebase free tier (Spark Plan) includes:
- **Firestore**: 1 GB storage, 50K reads/day, 20K writes/day
- **Hosting**: 10 GB storage, 360 MB/day transfer

For higher usage, upgrade to Blaze (pay-as-you-go) plan.

## 🔐 Security Best Practices

1. **Keep Firebase config public** (it's safe - it identifies your project)
2. **Protect sensitive rules** in Firestore security rules
3. **Monitor usage** to detect abuse
4. **Set up billing alerts** in Google Cloud Console
5. **Enable App Check** (optional) to prevent API abuse

## 📞 Support

If you encounter issues:

1. Check [Firebase Documentation](https://firebase.google.com/docs)
2. Review [GitHub Issues](https://github.com/antonmalikov/planning-poker-enhanced/issues)
3. Check browser console for detailed errors

---

**Estimated Deployment Time**: 30-45 minutes

**Last Updated**: December 2024
