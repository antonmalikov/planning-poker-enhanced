# Planning Poker Enhanced - Architecture Documentation

## 🎯 Overview

Planning Poker Enhanced is a real-time collaborative estimation tool for Agile/Scrum teams. It allows team members to join virtual rooms, vote on story points, and reach consensus on task complexity.

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    React Application                      │   │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────┐   │   │
│  │  │  HomePage  │  │  JoinPage  │  │   GamePage       │   │   │
│  │  │            │  │            │  │  ┌────────────┐  │   │   │
│  │  │ Create/    │  │  Join      │  │  │   Poker    │  │   │   │
│  │  │ Join Game  │  │  Existing  │  │  │ Component  │  │   │   │
│  │  └────────────┘  └────────────┘  │  └────────────┘  │   │   │
│  │                                   │        │         │   │   │
│  │                                   │        ▼         │   │   │
│  │                                   │  ┌────────────┐  │   │   │
│  │                                   │  │ GameArea   │  │   │   │
│  │                                   │  │            │  │   │   │
│  │                                   │  │ ┌────────┐ │  │   │   │
│  │                                   │  │ │Players │ │  │   │   │
│  │                                   │  │ └────────┘ │  │   │   │
│  │                                   │  │ ┌────────┐ │  │   │   │
│  │                                   │  │ │Controller││ │   │   │
│  │                                   │  │ └────────┘ │  │   │   │
│  │                                   │  │ ┌────────┐ │  │   │   │
│  │                                   │  │ │CardPicker││ │   │   │
│  │                                   │  │ └────────┘ │  │   │   │
│  │                                   │  └────────────┘  │   │   │
│  │                                   └──────────────────┘   │   │
│  └───────────────────────┬──────────────────────────────────┘   │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 Service Layer                             │   │
│  │  ┌──────────────┐        ┌──────────────────┐            │   │
│  │  │ games.ts     │        │  players.ts      │            │   │
│  │  │              │        │                  │            │   │
│  │  │ - addNewGame │        │ - addPlayer      │            │   │
│  │  │ - streamGame │        │ - removePlayer   │            │   │
│  │  │ - updateGame │        │ - updateValue    │            │   │
│  │  │ - resetGame  │        │ - getCurrentId   │            │   │
│  │  │ - finishGame │        │                  │            │   │
│  │  └──────────────┘        └──────────────────┘            │   │
│  └───────────────────────┬──────────────────────────────────┘   │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Repository Layer                             │   │
│  │  ┌─────────────────┐      ┌──────────────────────┐       │   │
│  │  │  firebase.ts    │      │  localStorage.ts     │       │   │
│  │  │                 │      │                      │       │   │
│  │  │ - Firestore ops │      │ - Player games cache│       │   │
│  │  │ - Real-time     │      │ - Recent games      │       │   │
│  │  │   streams       │      │                      │       │   │
│  │  └─────────────────┘      └──────────────────────┘       │   │
│  └───────────────────────┬──────────────────────────────────┘   │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │     Firebase Cloud Services         │
         │  ┌───────────────────────────────┐  │
         │  │      Firestore Database       │  │
         │  │                               │  │
         │  │  /games/{gameId}              │  │
         │  │    - Game metadata            │  │
         │  │    - Status, cards, timer     │  │
         │  │                               │  │
         │  │  /games/{gameId}/players      │  │
         │  │    - Player list              │  │
         │  │    - Votes & status           │  │
         │  └───────────────────────────────┘  │
         │                                     │
         │  ┌───────────────────────────────┐  │
         │  │     Firebase Hosting          │  │
         │  │   (Static Site Deployment)    │  │
         │  └───────────────────────────────┘  │
         └─────────────────────────────────────┘
```

## 🎮 Game Flow Diagram

```
┌─────────────┐
│  Home Page  │
└──────┬──────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐   ┌────────────┐
│ Create Game  │   │ Join Game  │
└──────┬───────┘   └─────┬──────┘
       │                 │
       │    Firebase     │
       │   Creates:      │
       │   - Game Doc    │
       │   - Player Doc  │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │   Game Page     │
       │  (Real-time)    │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │   Game States   │
       └─────────────────┘
                │
       ┌────────┼────────┐
       │        │        │
       ▼        ▼        ▼
   ┌───────┐ ┌────────┐ ┌──────────┐
   │Started│ │In Prog │ │ Finished │
   └───────┘ └────────┘ └──────────┘
       │        │             │
       │        │             ▼
       │        │      ┌──────────────┐
       │        │      │ Show Results │
       │        │      │ - Votes      │
       │        │      │ - Average    │
       │        │      │ - Card colors│
       │        │      └──────────────┘
       │        │             │
       └────────┴─────────────┘
                │
                ▼
         ┌──────────────┐
         │    Reset     │
         │ (New Round)  │
         └──────────────┘
```

## 🔑 Key Design Decisions

### 1. **Real-time Synchronization**
- **Technology**: Firestore real-time listeners (snapshots)
- **Rationale**: Essential for collaborative voting where all participants need instant updates
- **Implementation**: `streamGame()` and `streamPlayers()` in service layer

### 2. **Client-side State Management**
- **Technology**: React Hooks (useState, useEffect)
- **Rationale**: Simple state needs, Firebase handles persistence
- **Local Cache**: localStorage for recent games (reconnection UX)

### 3. **Optimistic UI Updates**
- **Pattern**: Local updates followed by Firebase sync
- **Benefits**: Instant feedback, better UX
- **Trade-off**: Occasional re-sync if conflicts occur

### 4. **Player Identity Management**
- **Approach**: ULID-based unique IDs stored in localStorage
- **Rationale**: No authentication required, simple join flow
- **Security**: Game creator has moderator privileges

### 5. **Game Types & Card Systems**
```
Fibonacci:        0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, ☕
Short Fibonacci:  0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕
T-Shirt:          XS, S, M, L, XL, XXL, ?, ☕
Custom:           User-defined values
```

### 6. **Moderator Permissions**
- **Creator**: Always has control
- **Optional**: Allow all members to manage session
- **Controls**: Reveal, Reset, Delete, Remove players

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Poker/           # Game-specific components
│   │   ├── Poker.tsx           # Main game container
│   │   ├── GameArea/           # Game display area
│   │   ├── GameController/     # Control panel
│   │   ├── CreateGame/         # Game creation form
│   │   └── JoinGame/           # Join flow
│   ├── Players/         # Player display & card picking
│   │   ├── Players.tsx         # Player grid
│   │   ├── PlayerCard/         # Individual cards
│   │   └── CardPicker/         # Voting interface
│   ├── SVGs/            # Icon components
│   ├── Loading/         # Loading states
│   └── Toolbar/         # Navigation bar
├── pages/               # Route-level pages
│   ├── HomePage/        # Landing & create/join
│   ├── GamePage/        # Active game
│   ├── JoinPage/        # Join specific game
│   └── AboutPage/       # Documentation
├── service/             # Business logic
│   ├── games.ts         # Game operations
│   └── players.ts       # Player operations
├── repository/          # Data access layer
│   ├── firebase.ts      # Firestore operations
│   └── localStorage.ts  # Browser storage
├── types/               # TypeScript definitions
│   ├── game.ts          # Game interfaces
│   ├── player.ts        # Player interfaces
│   └── status.ts        # Status enum
└── utils/               # Helper functions
```

## 🔄 Data Flow Example: Voting Process

```
1. User clicks card value
   ↓
2. CardPicker.onClick → updatePlayerValue()
   ↓
3. Service layer (players.ts)
   - Get current player
   - Update with new value + emoji
   - Set status to "Finished"
   ↓
4. Repository (firebase.ts)
   - updatePlayerInStore()
   - Firestore write
   ↓
5. Firestore triggers real-time update
   ↓
6. All clients receive snapshot
   ↓
7. streamPlayers() callback
   - Update local state
   - React re-renders
   ↓
8. UI updates:
   - Player card shows 👍
   - Game controller checks if all voted
   - If auto-reveal enabled → reveal cards
```

## 🎨 UI/UX Features

### Visual Feedback System
- **🤔 (Thinking)**: Player hasn't voted yet
- **👍 (Thumbs up)**: Player has voted (value hidden)
- **Card Value**: Shown when game is revealed
- **Card Colors**: After reveal, colors indicate alignment
  - Similar values → Similar colors
  - Outliers → Different colors

### Responsive Design
- **Tailwind CSS**: Utility-first styling
- **Dark Mode**: Full dark theme support
- **Mobile-first**: Touch-friendly controls
- **Internationalization**: i18next for 10+ languages

## 🔒 Security Considerations

### Current Security Model
1. **No Authentication**: Open access, trust-based
2. **Game IDs**: ULIDs provide unpredictability
3. **Moderator Controls**: Creator-based permissions
4. **Client-side Validation**: All validation in browser

### Firestore Security Rules (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if true;
    }
  }
}
```

## 📊 Performance Optimizations

1. **Lazy Loading**: React.lazy for route-based code splitting
2. **Image Optimization**: react-lazy-load-image-component
3. **Real-time Efficiency**: Only subscribe to active game
4. **Local Caching**: Recent games in localStorage
5. **Bundle Optimization**: Vite for fast builds

## 🧪 Testing Strategy

- **Unit Tests**: Service layer logic (Jest)
- **Component Tests**: React Testing Library
- **Integration**: Firebase emulator for local testing
- **E2E**: Manual testing of game flows

## 🚀 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 17 | UI library |
| Language | TypeScript 5 | Type safety |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| State | React Hooks | Local state management |
| Routing | React Router 5 | SPA routing |
| Database | Firestore | Real-time NoSQL database |
| Hosting | Firebase Hosting | Static site deployment |
| Build | Vite 5 | Fast build tool |
| i18n | i18next | Internationalization |
| Testing | Jest + RTL | Unit & component tests |

---

**Last Updated**: December 2024
