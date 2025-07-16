# Coding Standards for Task Management System

This document defines coding conventions and best practices for the Task Management System using Node.js, Express, PostgreSQL, React, and TypeScript.

---

## 📦 Project Structure

### Backend
```
/back
  /prisma
  index.js
  .env
```

### Frontend
```
/front
  /components
  /pages
  /hooks
  /services
  /types
  /lib
  /public
  tsconfig.json
```

---

## 🔤 Naming Conventions

| Type         | Convention       | Example                        |
|--------------|------------------|--------------------------------|
| Folders      | kebab-case       | `task-controller`              |
| Files        | kebab-case       | `create-task.ts`               |
| Variables    | camelCase        | `taskList`, `isCompleted`      |
| Constants    | UPPER_SNAKE_CASE | `MAX_TASKS_PER_PAGE`           |
| Functions    | camelCase        | `createTask()`, `fetchTasks()` |
| Classes      | PascalCase       | `TaskService`, `AppError`      |
| Components   | PascalCase       | `TaskCard`, `TaskForm`         |
| Interfaces   | PascalCase + I   | `ITask`, `IUser`               |
| Enums        | PascalCase       | `TaskPriority`                 |

---

## 🧪 TypeScript Guidelines

- Always define types/interfaces for function parameters and return types.
- Use `interface` for objects and data models.
- Use enums for constants like priority (`Low`, `Medium`, `High`).
- Avoid using `any`.

---

## 🧼 Clean Code Practices

- Keep functions pure and under 30 lines if possible.
- Follow Single Responsibility Principle (SRP).
- Handle all errors with centralized error handling middleware (backend).
- Avoid deep nesting. Use early returns.

---

## 🚀 API Design (Backend)

- Follow RESTful conventions:
  - `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- Use plural nouns for resource names.
- Return appropriate HTTP status codes.
- Validate request bodies using a schema (e.g. Zod, Joi, or manual).

---

## 🎨 Frontend Standards

- Use functional components with React Hooks.
- Prefer local state (`useState`) unless lifting or sharing via context or state manager.
- Use `useEffect` for side-effects, and always clean up subscriptions.
- Encapsulate API calls in `/services`.
- Use `react-query` for advanced data fetching.
- Reuse components where possible, break down complex UIs into smaller parts.

---

## 📝 Commit Message Format

```
<type>(scope): description

Types:
- feat: new feature
- fix: bug fix
- refactor: code improvement (no behavior change)
- style: formatting, missing semi colons, etc
- chore: build process or auxiliary tool changes
- docs: documentation only changes
```

**Example:**
```
feat(api): add task filtering by priority and due date
```

---

## ✅ Linting & Formatting

- Use ESLint for JavaScript/TypeScript linting.
- Use Prettier for formatting.
- Add pre-commit hook with `lint-staged` to auto-format on commit.
- Max line length: 100 characters.

---

## 📄 Environment Configuration

- Use `.env` files with `dotenv` or built-in support.
- Do not commit `.env` files to source control.
- Document required env variables in `.env.example`.

---

Adhering to this standard ensures code quality, better collaboration, and a more scalable codebase.