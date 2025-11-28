# Project Handover Document

## 1. Project Overview
**App Name**: Task Manager
**Description**: A simple task management application where users can sign up, log in, and manage their personal tasks.
**Key Features**:
- User Authentication (Sign up / Login)
- Dashboard for task management
- Create, Read, Update, Delete (CRUD) tasks
- Real-time updates across devices

## 2. Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS 4
- **Backend / Database**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel (Recommended)

## 3. Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase project

### Installation
1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd task-manager
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    - Copy `.env.local.example` (if exists) or create `.env.local`.
    - See `docs/ENV_VARS.md` for details.

4.  Run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. Deployment
This project is optimized for deployment on **Vercel**.

1.  Push your code to a Git repository (GitHub, GitLab, etc.).
2.  Import the project in Vercel.
3.  Add the Environment Variables in Vercel project settings.
4.  Deploy.

## 5. Documentation Index
- [Functional Specifications](docs/SPECIFICATION.md)
- [System Architecture](docs/ARCHITECTURE.md)
- [Database Schema](docs/SCHEMA.md)
- [Environment Variables](docs/ENV_VARS.md)
