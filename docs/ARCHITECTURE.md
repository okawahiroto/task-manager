# System Architecture

## 1. Directory Structure (App Router)

The application follows the Next.js App Router structure.

```
app/
├── auth/
│   └── page.jsx       # Login / Sign up page
├── dashboard/
│   └── page.jsx       # Main application dashboard (Protected)
├── page.jsx           # Landing page (Redirects to /auth)
├── layout.js          # Root layout
└── globals.css        # Global styles (Tailwind directives)
lib/
└── supabaseClient.js  # Supabase client initialization
```

## 2. Key Components

### 2.1 Authentication Flow
- **Client-side Auth**: The app uses `supabase.auth` on the client side for interactions.
- **Protection**:
    - The `Dashboard` component checks for a user session in `useEffect`.
    - If no user is found, it redirects to `/auth`.
    - *Note*: For better security in production, Middleware is recommended to protect routes on the server side.

### 2.2 Data Fetching & State Management
- **Fetching**: Data is fetched directly from Supabase in `useEffect` hooks within components.
- **State**: React `useState` is used to manage local state (tasks list, input values).
- **Realtime**: The `Dashboard` component subscribes to Supabase Realtime changes on the `tasks` table to update the state automatically.

## 3. Deployment Architecture
- **Frontend**: Hosted on Vercel (Serverless Functions / Edge Network).
- **Backend**: Managed Supabase instance (PostgreSQL).
- **Connection**: The frontend connects to Supabase via REST API (using `supabase-js`) and WebSocket (for Realtime).
