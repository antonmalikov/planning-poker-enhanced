# Vote Distribution Feature

## Visual Example

When a game is revealed (Status: Finished), the vote distribution appears below the game controller showing:

```
┌─────────────────────────────────────────────────────────────┐
│  Sprint Planning Session                          🎉        │
│  Timer: --:--                      Finished      Avg: 5.25  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Vote Distribution                                          │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ 3  ████████████░░░░░░░░░░░░░░  2 votes        33%    │ │
│  │ 5  ████████████████████████    5 votes (🟢)   56%    │ │
│  │ 8  ██████░░░░░░░░░░░░░░░░░░░  1 vote         11%    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  [👁️] [🔄] [🗑️] [🚪] [🔗] [QR]                            │
│                                                             │
│  Story Name: User authentication feature                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Features

### Visual Design
- **Horizontal bar chart** showing vote distribution
- **Leading option highlighted in green** (gradient: green-400 to green-500)
- **Other options in blue** (gradient: blue-400 to blue-500)
- **Vote count displayed** inside each bar ("X votes" or "X vote")
- **Percentage shown** on the right side
- **Sorted by value** (lowest to highest)

### Implementation Details

**Component**: `VoteDistribution` in `GameController.tsx`

**When displayed**: 
- Only shown when `game.gameStatus === Status.Finished`
- Appears below the game controller buttons

**Data calculated**:
- Excludes spectators from vote counts
- Groups votes by card value
- Calculates percentages based on voting players only
- Identifies the leading option (most votes)

**Responsive design**:
- Works in light and dark modes
- Smooth transitions with `duration-300`
- Text uses `mix-blend-difference` for visibility over gradients

### Example Scenarios

#### Scenario 1: Strong Consensus
```
Vote Distribution
5  ████████████████████████  8 votes (🟢)  100%
```
All team members voted 5 - perfect consensus!

#### Scenario 2: Split Decision
```
Vote Distribution
3  ██████████████░░░░░░░░░  3 votes        38%
5  ████████████████████    5 votes (🟢)   62%
```
Most people voted 5, but some think it's smaller (3).

#### Scenario 3: Wide Spread
```
Vote Distribution
2   ████░░░░░░░░░░░░░░░░░░  1 vote         14%
3   ████████░░░░░░░░░░░░░░  2 votes        29%
5   ████████████░░░░░░░░░░  3 votes (🟢)   43%
13  ████░░░░░░░░░░░░░░░░░░  1 vote         14%
```
Team disagrees significantly - discussion needed!

#### Scenario 4: With Spectators
If there are 10 total people, but 2 are spectators:
- Only 8 votes count in the distribution
- Percentages calculated from 8 voting players
- Spectators don't appear in the bars

### Translation Support

Added key: `GameController.voteDistribution` = "Vote Distribution"

Available in English, framework ready for other languages.

### Technical Implementation

```typescript
// Count votes by value
const voteCounts: { 
  [key: string]: { 
    count: number; 
    displayValue: string; 
    actualValue: number 
  } 
} = {};

// Exclude spectators
const votingPlayers = players.filter(
  (p) => !p.isSpectator && p.status === Status.Finished
);

// Calculate bar width relative to max
const maxCount = Math.max(...voteArray.map(v => v.count));
const barWidth = (vote.count / maxCount) * 100;

// Highlight leader
const isLeading = vote.count === maxCount;
```

### Color Scheme

**Leading option** (most votes):
- Light mode: Green gradient (green-400 → green-500)
- Dark mode: Green gradient (green-500 → green-600)

**Other options**:
- Light mode: Blue gradient (blue-400 → blue-500)  
- Dark mode: Blue gradient (blue-500 → blue-600)

**Background**:
- Light mode: Gray-200
- Dark mode: Gray-700

**Text**:
- Label: Gray-700 / Gray-300
- Count: Gray-800 / Gray-100 (mix-blend-difference)
- Percentage: Gray-600 / Gray-400

### Benefits

1. **Quick consensus check** - See at a glance if the team agrees
2. **Identify outliers** - Spot votes that differ significantly
3. **Facilitate discussion** - Visual prompt for why estimates differ
4. **Decision making** - Helps moderator decide if re-vote needed
5. **Transparency** - Everyone sees the same distribution

---

**Added in commit**: c30419b
**Feature requested by**: @antonmalikov
**Status**: ✅ Implemented and tested
