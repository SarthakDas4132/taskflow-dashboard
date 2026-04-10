# TaskFlow - Jira-like Task Management

A responsive, high-performance Kanban board application inspired by Jira, built for the JMD Solutions & Beyond Frontend Developer Assessment.

## Live Demo
**(https://taskflow-dashboard-mu.vercel.app/)**

## Core Features
* **Interactive Kanban Board:** Full drag-and-drop functionality to move tasks between 'To Do', 'In Progress', 'In Review', and 'Done' columns.
* **State Management:** Utilizes Zustand with `localStorage` persistence so data remains intact across browser refreshes.
* **Task Management (CRUD):** * Create tasks with titles, descriptions, types, priorities, and deadlines.
  * Delete tasks seamlessly from the board.
  * Update task data (Title, Deadline, Priority, etc.) via an intuitive Edit Modal.
* **Fluid UI/UX:** Built with Tailwind CSS and animated using Framer Motion for smooth micro-interactions and transitions.
* **Dark Mode:** Fully responsive light/dark theme toggling.

## Tech Stack
* **Framework:** React + Vite (TypeScript)
* **Styling:** Tailwind CSS + Radix UI
* **State Management:** Zustand (with persist middleware)
* **Animations:** Framer Motion
* **Icons:** Lucide React

## Local Setup Instructions
1. Clone the repository: `git clone https://github.com/SarthakDas4132/taskflow-dashboard.git`
2. Navigate to the directory: `cd https://github.com/SarthakDas4132/taskflow-dashboard.git`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open `http://localhost:5173` in your browser.
