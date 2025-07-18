# Swimlane Dashboard

A Next.js application implementing a swimlane dashboard with drag-and-drop, state management, and search functionality.

## Setup
1. Clone the repository: `git clone https://github.com/YasinduDulshanPeiris/swimlane-dashboard-.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser.

## Features
- Pixel-perfect UI based on Figma mockup using TailwindCSS.
- Responsive design up to 768px.
- Drag-and-drop tasks between swimlanes using react-beautiful-dnd.
- State management with Zustand and localStorage persistence.
- Task data fetched from `public/data/tasks.json` (mock API).
- Dynamic search functionality to filter tasks.
- Error handling for failed API fetches with fallback UI.

## Notes
- Assets are placed in `public/images`.
- Tested for cross-browser compatibility (Chrome, Firefox, Safari, Edge).
