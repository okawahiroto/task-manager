# プロジェクト引き継ぎ資料

## 1. プロジェクト概要
**アプリ名**: Task Manager
**説明**: ユーザーがサインアップ、ログインし、個人のタスクを管理できるシンプルなタスク管理アプリケーションです。
**主な機能**:
- ユーザー認証 (サインアップ / ログイン)
- タスク管理ダッシュボード
- タスクの作成、読み取り、更新、削除 (CRUD)
- デバイス間のリアルタイム更新

## 2. 技術スタック
- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS 4
- **Backend / Database**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel (推奨)

## 3. セットアップ手順

### 前提条件
- Node.js (v18 以上)
- npm または yarn
- Supabase プロジェクト

### インストール
1.  リポジトリをクローンします:
    ```bash
    git clone <repository-url>
    cd task-manager
    ```
2.  依存関係をインストールします:
    ```bash
    npm install
    ```
3.  環境変数を設定します:
    - `.env.local.example` (存在する場合) をコピーするか、`.env.local` を作成します。
    - 詳細は `docs/ENV_VARS_jp.md` を参照してください。

4.  開発サーバーを起動します:
    ```bash
    npm run dev
    ```
    ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 4. デプロイ
このプロジェクトは **Vercel** へのデプロイに最適化されています。

1.  コードを Git リポジトリ (GitHub, GitLab など) にプッシュします。
2.  Vercel にプロジェクトをインポートします。
3.  Vercel のプロジェクト設定で環境変数を追加します。
4.  デプロイします。

## 5. ドキュメント一覧
- [機能仕様書](docs/SPECIFICATION_jp.md)
- [システムアーキテクチャ](docs/ARCHITECTURE_jp.md)
- [データベース設計書](docs/SCHEMA_jp.md)
- [環境変数定義書](docs/ENV_VARS_jp.md)
