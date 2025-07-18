# Costar Web App — Project Scope

## Overview

Costar is a single-page web application that allows users to compare the filmographies of two people (actors, directors, etc.) using the TMDB API. Users can search for two individuals, and the app will display a list of projects (movies, TV shows) that both have worked on. Clicking a project title will show more details in a modal. The app will be built with Next.js and feature a modern, minimal, mobile-responsive dark UI.

---

## Features

### 1. Dual Search Boxes

- Two simple search boxes for entering the names of people (e.g., actors, directors).
- As the user types, show autocomplete suggestions using TMDB’s person search endpoint.
- Each search box is independent.
- Each search box includes a clear button to quickly reset the input.

### 2. Search Results Container

- After both people are selected, fetch and display all their credits (movies, TV shows).
- Compare credits to find overlapping projects (i.e., projects both have worked on).
- Display a list of overlapping projects with:
  - Project title
  - Year
  - Poster image (if available)
  - Role(s) for each person (e.g., actor, director)
- For now, only overlapping projects will be shown (not all credits for each person).

### 3. Project Details Modal

- Clicking a project title opens a modal with detailed information:
  - Title, year, poster, overview/description
  - Full cast and crew (optional)
  - Links to TMDB or IMDb
  - Genres, runtime, etc.
- Modal can be closed by clicking outside or pressing a close button.

### 4. UI/UX

- Modern, minimal, and dark-themed design
- Mobile responsive (works well on all screen sizes)
- Smooth transitions and loading indicators
- Accessible (keyboard navigation, ARIA labels)
- Built using Material UI for components and theming

---

## Technical Stack

- **Framework:** Next.js (React)
- **Styling:** Material UI (MUI) for components, theming, and responsiveness
- **API:** TMDB API (requires API key)
- **State Management:** React state/hooks (no need for Redux)
- **Modal:** Material UI Dialog component
- **TypeScript:** For type safety
- **Caching:** Implement caching of API results to reduce TMDB requests

---

## TMDB API Usage

- **Person Search:** `/search/person` endpoint for autocomplete and selection
- **Person Credits:** `/person/{person_id}/combined_credits` to fetch all credits
- **Project Details:** `/movie/{movie_id}` or `/tv/{tv_id}` for detailed info

---

## User Flow

1. User enters a name in each search box and selects from suggestions.
2. App fetches credits for both people (with caching to reduce API calls).
3. App compares credits and displays overlapping projects.
4. User clicks a project to view more details in a modal.

---

## Stretch Goals (Optional)

- Show all projects for each person (not just overlaps)
- Filter overlaps by type (movie, TV, year, genre)
- Shareable URLs for specific comparisons
- Light/dark mode toggle
- Support searching for more than two people

---

## Questions/Clarifications Needed (Answered)

1. **Should the app support searching for more than two people?**
   - Not for the initial version; this will be a stretch goal.
2. **Should we show all credits for each person, or only overlaps?**
   - Only overlaps for now.
3. **Any specific accessibility or localization requirements?**
   - No additional requirements at this time.
4. **Should we cache API results to reduce TMDB requests?**
   - Yes, caching will be implemented.
5. **Any preferred UI library (e.g., Tailwind, Material UI)?**
   - Material UI will be used.

---

## File Structure

```
/ (project root)
  |-- app/
      |-- page.tsx                # Main page component
      |-- layout.tsx              # App layout and theme provider
      |-- globals.css             # Global styles (if needed)
  |-- components/
      |-- SearchBox.tsx           # Search box with autocomplete and clear button
      |-- ResultsContainer.tsx    # Displays overlapping projects
      |-- ProjectModal.tsx        # Modal for project details
      |-- PersonAvatar.tsx        # (Optional) Avatar or image for person
  |-- lib/
      |-- tmdb.ts                 # TMDB API utility functions and caching
  |-- theme/
      |-- theme.ts                # Material UI custom theme (dark, minimal)
  |-- public/                     # Static assets
  |-- scope.md                    # Project plan
  |-- README.md
  |-- package.json
  |-- tsconfig.json
```

---

## Theme

- The app will use a custom Material UI theme:
  - **Color Scheme:** Dark mode by default, with deep grays and accent colors for highlights.
  - **Typography:** Clean, modern sans-serif fonts.
  - **Components:** Minimal, flat design with subtle shadows and smooth transitions.
  - **Responsiveness:** All components will scale and adapt for mobile and desktop.
  - **Accessibility:** Sufficient color contrast, focus indicators, and ARIA support.
  - **Customization:** Theme defined in `theme/theme.ts` and provided via MUI’s ThemeProvider in `layout.tsx`.

---

## Next Steps

1. Set up Next.js project and install dependencies
2. Design UI wireframes
3. Implement search boxes with autocomplete and clear buttons
4. Integrate TMDB API for person search and credits (with caching)
5. Implement overlap comparison logic
6. Build results list and modal
7. Style for dark mode and responsiveness using Material UI
8. Test and refine UX
