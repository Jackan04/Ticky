# TodoApp

A playful, minimal personal to‑do app — delightful enough to actually use. Track lists, add tasks (quick or detailed), set due dates, and keep things tidy without the bloated stuff.

What makes it unique
- Focused on quick capture and a small, pleasant UI
- Minimalism over feature bloat — useful for personal task management

Core features
- Create, edit, and delete lists
- Add tasks quickly or via a detailed modal (title, notes, due date)
- Toggle tasks complete / hide completed
- Simple list filtering and task counts

Tech stack
- React (Vite)
- Firebase Firestore
- CSS variables + CSS modules

Run locally

1. Install dependencies

   npm install

2. Start the dev server

   npm run dev

Open http://localhost:5173 (or the URL printed by Vite) in your browser.

Build for production

1. Create a production build

   npm run build

2. Preview the production build locally (optional)

   npm run preview

Notes
- This is a personal side project — small, iterative, and opinionated. Tweak it however you like.
- If you use Firebase, make sure your `src/firebase/FirebaseConfig.js` is configured with your project credentials.

If you want, I can help add tests, CI, or a deployment script.
