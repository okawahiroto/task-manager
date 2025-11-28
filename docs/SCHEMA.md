# Database Schema

## Overview
The application uses **Supabase (PostgreSQL)** as the primary database.

## Tables

### `tasks`
Stores user tasks.

| Column Name | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `PK`, `default: gen_random_uuid()` | Unique identifier for the task. |
| `created_at` | `timestamptz` | `default: now()` | Timestamp when the task was created. |
| `title` | `text` | `NOT NULL` | The content of the task. |
| `is_done` | `boolean` | `default: false` | Completion status of the task. |
| `user_id` | `uuid` | `FK (auth.users.id)` | Reference to the user who owns the task. |

## Row Level Security (RLS) Policies

RLS is enabled on the `tasks` table to ensure users can only access their own data.

### Policy: `Users can only access their own tasks`
- **Operation**: `ALL` (SELECT, INSERT, UPDATE, DELETE)
- **Target Role**: `authenticated`
- **Using expression**: `auth.uid() = user_id`
- **With check expression**: `auth.uid() = user_id`

## Realtime
Realtime is enabled for the `tasks` table to support live updates on the dashboard.
