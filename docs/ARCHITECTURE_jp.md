# システムアーキテクチャ

## 1. ディレクトリ構造 (App Router)

このアプリケーションは Next.js App Router 構造に従っています。

```
app/
├── auth/
│   └── page.jsx       # ログイン / サインアップページ
├── dashboard/
│   └── page.jsx       # メインアプリケーションダッシュボード (保護されたページ)
├── page.jsx           # ランディングページ (/auth へリダイレクト)
├── layout.js          # ルートレイアウト
└── globals.css        # グローバルスタイル (Tailwind ディレクティブ)
lib/
└── supabaseClient.js  # Supabase クライアントの初期化
```

## 2. 主要コンポーネント

### 2.1 認証フロー
- **クライアントサイド認証**: アプリはクライアントサイドでの対話に `supabase.auth` を使用します。
- **保護**:
    - `Dashboard` コンポーネントは `useEffect` 内でユーザーセッションを確認します。
    - ユーザーが見つからない場合、`/auth` にリダイレクトします。
    - *注*: 本番環境でのセキュリティ向上のため、サーバーサイドでルートを保護する Middleware の導入が推奨されます。

### 2.2 データ取得と状態管理
- **取得**: データはコンポーネント内の `useEffect` フックで Supabase から直接取得されます。
- **状態**: ローカル状態 (タスクリスト、入力値) の管理には React `useState` が使用されます。
- **リアルタイム**: `Dashboard` コンポーネントは `tasks` テーブルの Supabase Realtime 変更を購読し、状態を自動的に更新します。

## 3. デプロイアーキテクチャ
- **Frontend**: Vercel (Serverless Functions / Edge Network) でホスト。
- **Backend**: 管理された Supabase インスタンス (PostgreSQL)。
- **接続**: フロントエンドは REST API (`supabase-js` を使用) と WebSocket (Realtime 用) を介して Supabase に接続します。
