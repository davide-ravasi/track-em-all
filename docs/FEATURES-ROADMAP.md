# Track'em All - Features Roadmap

This document outlines potential new features and enhancements for the Track'em All application.

## Current Features ✅

- Home page with TV shows discovery
- Search functionality
- Show/Series detail pages
- Episode pages
- Person (actor/director) pages
- Favorites system (requires authentication)
- User authentication (Sign up/Sign in)
- Listing pages (categories/sections)
- About page
- PWA support (offline capability, installable)

---

## Proposed New Features

### 🔥 High Priority Features

#### 1. Watchlist System
**Description:** Separate list from favorites - "Want to Watch" vs "Currently Watching" vs "Completed"
- **User Value:** Better organization of shows user plans to watch
- **Implementation:**
  - Add `watchlist` field to user model (array of show IDs)
  - Create watchlist page/component
  - Add "Add to Watchlist" button on show pages
  - Support multiple watchlist statuses (Want to Watch, Watching, Completed, Dropped)
- **Backend:** New endpoints for watchlist CRUD operations
- **Frontend:** New page, Redux slice for watchlist state

#### 2. Watch History Tracking
**Description:** Track which episodes user has watched
- **User Value:** Know where you left off in a series
- **Implementation:**
  - Add `watchHistory` field to user model (object with showId: { lastEpisodeId, lastWatchedDate })
  - Mark episodes as watched/unwatched
  - Auto-track when user views episode page
  - Show progress indicators on show cards
- **Backend:** Endpoints to update watch history
- **Frontend:** Episode tracking UI, progress bars

#### 3. Episode Notifications
**Description:** Alert users when new episodes of their favorite shows air
- **User Value:** Never miss a new episode
- **Implementation:**
  - Check TMDB API for new episodes (scheduled job or API polling)
  - Store notification preferences in user model
  - Send notifications via:
    - Browser push notifications (PWA)
    - Email notifications
    - In-app notification center
- **Backend:** Background job to check for new episodes, notification service
- **Frontend:** Notification settings page, notification center component

#### 4. User Profile & Settings
**Description:** User profile page with preferences and settings
- **User Value:** Customize app experience
- **Implementation:**
  - Profile page showing:
    - User stats (shows watched, favorites count, etc.)
    - Account settings
    - Notification preferences
    - Privacy settings
  - Edit profile functionality
- **Backend:** User profile endpoints, settings update endpoints
- **Frontend:** Profile page, settings forms

#### 5. Ratings & Reviews
**Description:** Allow users to rate shows and episodes, write reviews
- **User Value:** Share opinions, discover shows based on ratings
- **Implementation:**
  - Add rating system (1-5 stars or 1-10 scale)
  - Review text field (optional)
  - Display average ratings on show pages
  - Show user's ratings in profile
- **Backend:** Rating/review model, endpoints for CRUD
- **Frontend:** Rating component, review display, review form

---

### 🟡 Medium Priority Features

#### 6. Recommendations Engine
**Description:** "Because you watched..." style recommendations
- **User Value:** Discover new shows based on preferences
- **Implementation:**
  - Analyze user's favorites and watch history
  - Use TMDB recommendations API
  - Show recommended shows on home page
  - "Similar shows" section on show detail pages
- **Backend:** Recommendation algorithm/service
- **Frontend:** Recommendations component, similar shows section

#### 7. Advanced Filters & Sorting
**Description:** Enhanced search with filters (genre, year, rating, etc.)
- **User Value:** Find exactly what you're looking for
- **Implementation:**
  - Filter by:
    - Genre
    - Release year
    - Rating (TMDB or user ratings)
    - Status (airing, ended, upcoming)
  - Sort by: popularity, rating, release date, alphabetical
  - Save filter presets
- **Backend:** Enhanced search endpoints with filter parameters
- **Frontend:** Filter sidebar/panel, filter UI components

#### 8. Calendar View
**Description:** Calendar showing when new episodes air
- **User Value:** Plan viewing schedule
- **Implementation:**
  - Fetch upcoming episodes from TMDB
  - Display in calendar format (weekly/monthly view)
  - Highlight episodes from user's favorites/watchlist
  - Click episode to go to episode page
- **Backend:** Endpoint to fetch upcoming episodes
- **Frontend:** Calendar component, episode cards in calendar

#### 9. Dark Mode / Theme Toggle
**Description:** Dark mode and theme customization
- **User Value:** Better viewing experience, reduce eye strain
- **Implementation:**
  - Add theme toggle in header/settings
  - Store theme preference in localStorage/user settings
  - Create dark theme SCSS variables
  - Apply theme across all components
- **Backend:** Store theme preference in user model (optional)
- **Frontend:** Theme context/provider, theme toggle component, dark mode styles

#### 10. Export/Import Data
**Description:** Allow users to backup and restore their data
- **User Value:** Data portability, backup safety
- **Implementation:**
  - Export favorites, watchlist, watch history to JSON/CSV
  - Import data from exported file
  - Validate imported data
- **Backend:** Export endpoint (generate JSON/CSV), import endpoint (validate and import)
- **Frontend:** Export/import buttons in settings, file upload component

---

### 🟢 Nice to Have Features

#### 11. Social Features
**Description:** Share shows, follow other users, see friends' activity
- **User Value:** Social interaction, discover shows from friends
- **Implementation:**
  - Share show links (social media, copy link)
  - Follow/unfollow users
  - Activity feed (friends' favorites, ratings)
  - User profiles (public view)
- **Backend:** User relationships model, activity feed endpoints, sharing utilities
- **Frontend:** Share buttons, follow button, activity feed component

#### 12. Custom Lists/Collections
**Description:** Create custom lists (e.g., "Crime Shows", "Anime to Watch")
- **User Value:** Organize shows into custom categories
- **Implementation:**
  - Create named lists
  - Add/remove shows from lists
  - Share lists with other users
  - Public/private list settings
- **Backend:** Lists model, list CRUD endpoints
- **Frontend:** Lists page, create list form, list management UI

#### 13. Statistics Dashboard
**Description:** View watch statistics (time watched, shows completed, etc.)
- **User Value:** Track viewing habits, achievements
- **Implementation:**
  - Calculate total watch time (estimate from episodes watched)
  - Shows completed count
  - Favorite genres
  - Watch streaks
  - Charts/graphs for visualization
- **Backend:** Statistics calculation endpoints
- **Frontend:** Statistics dashboard page, charts library integration

#### 14. Mobile UX Improvements
**Description:** Enhanced mobile experience
- **User Value:** Better mobile usability
- **Implementation:**
  - Swipe gestures for navigation
  - Bottom navigation bar
  - Pull-to-refresh
  - Mobile-optimized layouts
  - Touch-friendly buttons and interactions
- **Backend:** N/A
- **Frontend:** Mobile-specific components, responsive improvements, gesture libraries

---

## Implementation Notes

### Backend Considerations
- All new features requiring user data will need:
  - MongoDB schema updates
  - New API endpoints in `functions/controllers/`
  - Authentication middleware for protected routes
  - Input validation and error handling

### Frontend Considerations
- New features will need:
  - Redux slices for state management (if needed)
  - New pages/components
  - Routing updates in `App.tsx`
  - TypeScript type definitions in `src/typescript/types.ts`

### Database Schema Updates
Current user model likely needs:
- `watchlist: Array<Object>` - Watchlist items with status
- `watchHistory: Object` - Episode watch tracking
- `ratings: Array<Object>` - User ratings
- `settings: Object` - User preferences
- `notifications: Object` - Notification preferences

---

## Priority Ranking

1. **Watchlist System** - High user value, relatively simple
2. **Watch History Tracking** - Core feature for tracking app
3. **User Profile & Settings** - Foundation for other features
4. **Ratings & Reviews** - Enhances community aspect
5. **Episode Notifications** - High user value, requires background jobs
6. **Dark Mode** - Quick win, improves UX
7. **Advanced Filters** - Enhances existing search
8. **Calendar View** - Visual appeal, useful feature
9. **Recommendations** - Requires algorithm work
10. **Export/Import** - Data portability
11. **Social Features** - Requires significant backend work
12. **Custom Lists** - Nice organization feature
13. **Statistics Dashboard** - Analytics feature
14. **Mobile UX** - Ongoing improvements

---

## Notes

- Features can be implemented incrementally
- Some features depend on others (e.g., Statistics needs Watch History)
- Consider user feedback to prioritize features
- Test each feature thoroughly before moving to next
- Document API changes and database migrations

---

**Last Updated:** 2024
**Status:** Planning Phase

