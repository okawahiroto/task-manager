# Environment Variables

The application requires the following environment variables to be set in `.env.local` for local development, or in the Vercel project settings for production.

## Required Variables

| Variable Name | Description | Where to find |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | The URL of your Supabase project. | Supabase Dashboard > Project Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anonymous public key for your Supabase project. | Supabase Dashboard > Project Settings > API > Project API keys (anon / public) |

## Example `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> [!IMPORTANT]
> Never commit your `.env.local` file to version control. It is already included in `.gitignore`.
