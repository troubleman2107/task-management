# ai_rules.md

## 🧠 AI Generation Rules for Task Management System

This document defines standardized prompts and requirements for using AI tools to generate code, UI, and documentation for the Task Management System project (Node.js, Express, PostgreSQL, React, TypeScript).

---

## 🔧 Source Code Generation (Backend & Frontend)

**Prompt to Use:**
```
Create a full-stack task management system using Node.js, Express, PostgreSQL, React, and TypeScript.

Backend:
- REST API with CRUD for tasks
- Task model: title, description, priority (Low, Medium, High), dueDate, isCompleted (boolean)
- Filtering and search via query params
- Prisma ORM for PostgreSQL
- Input validation (TypeScript)

Frontend:
- Task list with pagination
- Create/edit/delete tasks
- Mark task as completed
- Filter by priority and due date
- Search bar for title/description
- TailwindCSS for styling

Structure for scalability and developer productivity.
```

**Expected Output:**
- `/back`: Node.js Express API with Prisma/PostgreSQL
- `/front`: React app with TypeScript and TailwindCSS
- Prisma schema and migrations
- API routes with filtering/search
- Type-safe interfaces for Task

---

## 🎨 UI Generation (Design Tools)

**Prompt to Use:**
```
Design a modern, responsive task management dashboard UI for a web app.

Components:
- Sidebar + Top Header layout
- Task List View: title, priority, due date, completion status
- Checkbox/toggle for completion
- Filter UI: priority dropdown, due date range picker
- Search bar for title/description
- Task Form Modal for create/edit
- Consistent, minimalistic UI elements
```

**Expected Output:**
- Main dashboard layout
- UI components (task card/table, filters, modal)
- Consistent naming/grouping for dev handoff
- Responsive design and clear visual hierarchy

---

## ✅ General Notes
- Priority should use color-coded visual tags
- Due date picker must be user-friendly
- Task completion should update UI instantly (strike-through/fade)
- Filtering and search should be combinable
- Mobile responsiveness is required

---

Use these prompts and rules as the single source of truth for AI-assisted code and design generation in this project.