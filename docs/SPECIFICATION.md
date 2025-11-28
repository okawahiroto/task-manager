# Functional Specifications

## 1. User Authentication
### 1.1 Sign Up
- **Actor**: Guest User
- **Action**: Enter email and password to create an account.
- **System Behavior**:
    - Validates email format and password strength (min 6 chars).
    - Creates a new user in Supabase Auth.
    - Sends a confirmation email (if enabled in Supabase) or logs in immediately.
    - Redirects to Dashboard upon success.

### 1.2 Login
- **Actor**: Guest User
- **Action**: Enter registered email and password.
- **System Behavior**:
    - Authenticates against Supabase Auth.
    - Redirects to Dashboard on success.
    - Displays error message on failure.

### 1.3 Logout
- **Actor**: Logged-in User
- **Action**: Click "Logout" button on Dashboard.
- **System Behavior**:
    - Ends the session.
    - Redirects to the Login page.

## 2. Task Management (Dashboard)
### 2.1 View Tasks
- **Actor**: Logged-in User
- **Action**: Access `/dashboard`.
- **System Behavior**:
    - Fetches tasks from the `tasks` table where `user_id` matches the current user.
    - Displays tasks ordered by creation date (newest first).
    - Shows empty state if no tasks exist.

### 2.2 Create Task
- **Actor**: Logged-in User
- **Action**: Enter task title and click "Add".
- **System Behavior**:
    - Inserts a new record into `tasks` table with `title`, `user_id`, and default `is_done = false`.
    - Clears the input field.
    - Updates the task list immediately (via Realtime or optimistic update).

### 2.3 Toggle Completion
- **Actor**: Logged-in User
- **Action**: Click checkbox next to a task.
- **System Behavior**:
    - Updates `is_done` status in the database.
    - Toggles strikethrough style on the task title.

### 2.4 Delete Task
- **Actor**: Logged-in User
- **Action**: Click "Delete" button on a task.
- **System Behavior**:
    - Deletes the record from `tasks` table.
    - Removes the task from the list.

## 3. Real-time Updates
- **Feature**: Multi-device sync.
- **Behavior**: Any change (add, update, delete) made on one device/browser tab is instantly reflected on other open tabs for the same user via Supabase Realtime subscription.
