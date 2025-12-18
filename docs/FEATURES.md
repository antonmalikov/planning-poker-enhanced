# Planning Poker Enhanced - Features Overview

## 🎯 Core Features

### 1. Session Management

#### Create New Session
- **Game Types Available**:
  - **Fibonacci**: 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, ☕
  - **Short Fibonacci**: 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕
  - **T-Shirt Sizes**: XS, S, M, L, XL, XXL, ?, ☕
  - **T-Shirt + Numbers**: Combination of sizes and numbers
  - **Custom**: Define your own card values

- **Session Options**:
  - Session name (required)
  - Allow members to manage session (optional)
  - Auto-reveal when all vote (optional)

```
┌─────────────────────────────────────┐
│      Create Planning Session        │
├─────────────────────────────────────┤
│ Session Name: [____________]        │
│                                     │
│ Game Type:                          │
│  ○ Fibonacci                        │
│  ○ Short Fibonacci                  │
│  ○ T-Shirt                          │
│  ⦿ Custom                           │
│                                     │
│ ☑ Allow members to manage session  │
│ ☑ Auto-reveal when all vote        │
│                                     │
│        [Create Session]             │
└─────────────────────────────────────┘
```

#### Join Existing Session
- Direct link sharing
- Session ID entry
- Recent sessions list

### 2. Real-Time Collaboration

#### Voting Process Flow

```
Player joins → Sees cards → Selects value → Card flips (👍)
                                                    ↓
All players vote ← Game continues ← Other players vote
        ↓
Moderator reveals OR Auto-reveal triggers
        ↓
Cards flip to show values with color coding
        ↓
Average calculated and displayed
        ↓
Moderator can reset for next story
```

#### Player States Visualization

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   John 🤔    │  │   Sarah 👍   │  │   Mike 👍    │
│              │  │              │  │              │
│              │  │              │  │              │
│  (Thinking)  │  │   (Voted)    │  │   (Voted)    │
└──────────────┘  └──────────────┘  └──────────────┘

            BEFORE REVEAL

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│     John     │  │    Sarah     │  │     Mike     │
│              │  │              │  │              │
│      5       │  │      8       │  │      5       │
│   [Green]    │  │   [Yellow]   │  │   [Green]    │
└──────────────┘  └──────────────┘  └──────────────┘

            AFTER REVEAL
```

### 3. Game Controller Features

```
┌─────────────────────────────────────────────────┐
│  Sprint Planning Session                  🚀    │
│                              Timer: 05:00       │
│                              In Progress ⏱️      │
│  Auto Reveal: [ON/OFF]      Average: 6.33      │
├─────────────────────────────────────────────────┤
│                                                 │
│  [👁️]      [🔄]      [🗑️]      [🚪]      [🔗]   │
│  Reveal   Restart  Delete    Exit    Invite    │
│                                                 │
│  Story Name: [User login feature_____________]  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Moderator Controls**:
- **👁️ Reveal**: Show all votes to everyone
- **🔄 Restart**: Reset all votes for new story
- **🗑️ Delete**: Remove session completely
- **🚪 Exit**: Leave the session
- **🔗 Invite**: Copy shareable link
- **Timer**: Optional countdown timer

### 4. Card Color Coding (After Reveal)

The app uses intelligent color coding to show consensus:

```
Similar Votes (Good Consensus):
┌────┐ ┌────┐ ┌────┐
│ 5  │ │ 5  │ │ 5  │  All Green
└────┘ └────┘ └────┘

Moderate Spread:
┌────┐ ┌────┐ ┌────┐
│ 3  │ │ 5  │ │ 8  │  Green → Yellow → Orange
└────┘ └────┘ └────┘

Wide Disagreement (Needs Discussion):
┌────┐ ┌────┐ ┌────┐
│ 2  │ │ 8  │ │ 21 │  Green → Yellow → Red
└────┘ └────┘ └────┘
```

### 5. Timer Feature

```
┌─────────────────────┐
│   Timer Controls    │
├─────────────────────┤
│  Duration: [5] min  │
│                     │
│  ⏸️ Pause / ▶️ Play  │
│  🔔 Sound: ON/OFF   │
│                     │
│   ┌─────────────┐   │
│   │   ⏱️ 04:32   │   │
│   └─────────────┘   │
│                     │
│  Progress: [████░░] │
└─────────────────────┘
```

**Features**:
- Customizable duration
- Pause/Resume
- Sound notifications
- Visual progress bar
- Visible to all players

### 6. Internationalization (i18n)

Supported Languages:
- 🇺🇸 English
- 🇪🇸 Spanish (Español)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇧🇷 Portuguese (Português)
- 🇳🇱 Dutch (Nederlands)
- 🇷🇺 Russian (Русский)
- 🇮🇳 Hindi (हिन्दी)
- 🇮🇳 Tamil (தமிழ்)
- 🇹🇼 Chinese Traditional (繁體中文)

### 7. Theme Support

```
Light Mode:              Dark Mode:
┌──────────────┐        ┌──────────────┐
│ ☀️ Light     │        │ 🌙 Dark      │
│ White BG     │        │ Gray-900 BG  │
│ Dark Text    │        │ Light Text   │
│              │        │              │
└──────────────┘        └──────────────┘
```

Auto-detects system preference, toggleable in UI.

### 8. Responsive Design

```
Desktop (>1024px):
┌────────────────────────────────────────┐
│ [Header Navigation]                     │
├────────────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐        │
│  │ P │ │ P │ │ P │ │ P │ │ P │        │
│  └───┘ └───┘ └───┘ └───┘ └───┘        │
│                                        │
│         [Controller Panel]             │
│                                        │
│  [0] [1] [2] [3] [5] [8] [13] [?] [☕] │
└────────────────────────────────────────┘

Mobile (<768px):
┌──────────────┐
│  [Header]    │
├──────────────┤
│ ┌──┐ ┌──┐   │
│ │P1│ │P2│   │
│ └──┘ └──┘   │
│ ┌──┐ ┌──┐   │
│ │P3│ │P4│   │
│ └──┘ └──┘   │
│              │
│ [Controls]   │
│              │
│ [0][1][2]    │
│ [3][5][8]    │
│ [13][?][☕]  │
└──────────────┘
```

## 🎨 User Experience Highlights

### 1. Visual Feedback
- **Instant Updates**: Changes reflect in real-time for all users
- **Emoji States**: Quick visual indication of player status
- **Color Coding**: Post-reveal consensus visualization
- **Animations**: Smooth transitions for state changes

### 2. Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Dark mode for reduced eye strain
- **Touch Friendly**: Large tap targets on mobile

### 3. Performance
- **Fast Load**: Optimized bundle size with code splitting
- **Lazy Loading**: Images and routes load on demand
- **Real-time Sync**: Sub-second latency for updates
- **Offline Resilience**: Graceful degradation without connection

## 🔧 Advanced Features

### 1. Recent Games
```
┌────────────────────────────────────┐
│       Recent Sessions              │
├────────────────────────────────────┤
│ Sprint 24 Planning                 │
│ Created by: John | 2 hours ago     │
│ [Rejoin] ─────────────────────────│
│                                    │
│ Product Refinement                 │
│ Created by: Sarah | 1 day ago      │
│ [Rejoin] ─────────────────────────│
└────────────────────────────────────┘
```

Stored in browser localStorage for quick reconnection.

### 2. Auto-Reveal
When enabled:
- Automatically reveals cards when all players vote
- Eliminates need for moderator to manually reveal
- Speeds up estimation process

### 3. Allow Members to Manage
When enabled:
- Any player can use moderator controls
- Useful for self-organizing teams
- Distributed control model

### 4. Story Name Tracking
- Enter story ID or description
- Visible to all participants
- Helps track what's being estimated
- Useful for record-keeping

## 📊 Analytics & Metrics

### Game Statistics
After reveal, the system shows:
- **Average**: Mean of all numeric votes
- **Rounded Average**: Nearest Fibonacci number
- **Participation**: Who voted vs. who didn't
- **Consensus Level**: Visual color coding

### Example Average Calculation
```
Players vote: 3, 5, 5, 8
Average = (3 + 5 + 5 + 8) / 4 = 5.25
Rounded = 5 (nearest Fibonacci)

Displayed as: "Average: 5.25 ⓘ (Rounded: 5)"
```

## 🚀 Workflow Example

### Complete Estimation Session

```
1. Scrum Master creates session
   ↓
2. Shares link with team
   ↓
3. Team members join
   ↓
4. SM enters first story: "User Login"
   ↓
5. SM starts timer (optional)
   ↓
6. Team discusses story
   ↓
7. Everyone selects their estimate
   ↓
8. All cards show 👍
   ↓
9. Auto-reveal OR SM clicks Reveal
   ↓
10. Results shown with colors
   ↓
11. If consensus good (green): Accept estimate
    If spread wide (red): Discuss and re-vote
   ↓
12. SM clicks Restart
   ↓
13. Repeat for next story
```

## 🎯 Use Cases

### 1. Sprint Planning
- Estimate entire sprint backlog
- Track which stories discussed
- Maintain voting history in session

### 2. Backlog Refinement
- Pre-estimate upcoming work
- Identify stories needing breakdown
- Build shared understanding

### 3. Remote Teams
- Async-friendly with persistent sessions
- Real-time for synchronous estimation
- Works across time zones

### 4. Educational/Training
- Teach estimation techniques
- Practice consensus building
- Learn Fibonacci sequence

---

**Design Philosophy**: Simple, fast, collaborative, and accessible to all team members regardless of technical background.

**Last Updated**: December 2024
