# Project Rules for Task Management System

This document defines the essential rules and guidelines for developing and maintaining the Task Management System project using Node.js, Express, PostgreSQL, React, and TypeScript.

---

## 1. Project Structure
- Backend code is located in `/back`.
- Frontend code is located in `/front`.
- Use clear folder organization: `/components`, `/pages`, `/services`, `/types`, `/prisma`, etc.

## 2. Naming Conventions
- Use kebab-case for folders and files.
- Use camelCase for variables and functions.
- Use PascalCase for classes, components, and interfaces.
- Use UPPER_SNAKE_CASE for constants.

## 3. API Design
- Follow RESTful conventions: `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`.
- Use plural nouns for resource names.
- Return appropriate HTTP status codes.
- Validate request bodies before processing.

## 4. TypeScript Usage
- Always define types/interfaces for function parameters and return types.
- Use `interface` for objects and data models.
- Avoid using `any` type.

## 5. Error Handling
- Handle errors gracefully in both backend and frontend.
- Use centralized error handling middleware in Express.
- Show user-friendly error messages in the UI.

## 6. Code Quality
- Keep functions pure and concise.
- Follow Single Responsibility Principle (SRP).
- Avoid deep nesting; use early returns.
- Reuse components and logic where possible.

## 7. Environment & Configuration
- Use `.env` files for sensitive configuration.
- Do not commit `.env` files to source control.
- Document required environment variables in `.env.example`.

## 8. Linting & Formatting
- Use ESLint and Prettier for code quality and formatting.
- Max line length: 100 characters.
- Use pre-commit hooks to enforce standards.

## 9. Commit Messages
- Use clear, conventional commit messages: `feat:`, `fix:`, `refactor:`, `docs:`, etc.
- Example: `feat(api): add task filtering by priority and due date`

## 10. Collaboration
- Document all major decisions and changes.
- Review code before merging.
- Communicate clearly in pull requests and issues.

---

Following these rules ensures maintainability, scalability, and a high-quality codebase for all contributors.
