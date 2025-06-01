# Simple Task Manager (Full Stack, Dockerized)

## Overview
A simple task manager app with real-time sync, built with:
- **Backend:** ASP.NET Core + GraphQL (HotChocolate) + EF Core + SQLite
- **Frontend:** React + TypeScript + Adobe React Spectrum + Relay
- **Deployment:** Fully dockerized with Docker Compose

## Features
- Add, view, and toggle tasks (Pending/Completed)
- Delete completed tasks
- Real-time UI updates
- Responsive, modern UI

## Architecture
```
[ React + Relay + Spectrum ]  <-->  [ ASP.NET Core + GraphQL + EF Core + SQLite ]
         (frontend)                              (backend)
```
- **Frontend**: Built with React, TypeScript, Relay, and Adobe React Spectrum. Served via Nginx in Docker.
- **Backend**: ASP.NET Core Web API with HotChocolate GraphQL, EF Core, and SQLite. Runs in Docker.
- **Database**: SQLite file persisted in a Docker volume.

## Quick Start (Docker Compose)
1. **Build and run everything:**
   ```sh
   docker-compose up --build
   ```
2. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend GraphQL Playground: [http://localhost:5052/graphql](http://localhost:5052/graphql)

## Development
- **Frontend only:**
  ```sh
  cd frontend
  npm start
  ```
- **Backend only:**
  ```sh
  cd backend
  dotnet run
  ```

## AI Tools Used
- **GitHub Copilot** and **GPT-4** for code generation, scaffolding, and troubleshooting.
- **AI agentic workflow** for rapid prototyping, Dockerization, and code review.

## Design Choices
- **Relay** for real-time GraphQL data and UI sync.
- **React Spectrum** for accessible, beautiful UI.
- **SQLite** for simple, file-based persistence (easy to swap for SQL Server).
- **Docker Compose** for one-command, full-stack orchestration.

---
**Built in under 2 hours with AI assistance.**
