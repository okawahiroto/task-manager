# 環境変数

アプリケーションは、ローカル開発の場合は `.env.local` に、本番環境の場合は Vercel プロジェクト設定に、以下の環境変数を設定する必要があります。

## 必須変数

| 変数名 | 説明 | 確認場所 |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクトの URL。 | Supabase Dashboard > Project Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase プロジェクトの匿名公開キー (anon key)。 | Supabase Dashboard > Project Settings > API > Project API keys (anon / public) |

## `.env.local` の例

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> [!IMPORTANT]
> `.env.local` ファイルはバージョン管理にコミットしないでください。`.gitignore` にはすでに含まれています。
