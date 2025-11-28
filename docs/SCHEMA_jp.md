# データベース設計

## 概要
アプリケーションはプライマリデータベースとして **Supabase (PostgreSQL)** を使用しています。

## テーブル

### `tasks`
ユーザーのタスクを保存します。

| カラム名 | 型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `PK`, `default: gen_random_uuid()` | タスクの一意な識別子。 |
| `created_at` | `timestamptz` | `default: now()` | タスクが作成されたタイムスタンプ。 |
| `title` | `text` | `NOT NULL` | タスクの内容。 |
| `is_done` | `boolean` | `default: false` | タスクの完了状態。 |
| `user_id` | `uuid` | `FK (auth.users.id)` | タスクを所有するユーザーへの参照。 |

## 行レベルセキュリティ (RLS) ポリシー

ユーザーが自分のデータにのみアクセスできるように、`tasks` テーブルで RLS が有効になっています。

### ポリシー: `Users can only access their own tasks`
- **操作**: `ALL` (SELECT, INSERT, UPDATE, DELETE)
- **ターゲットロール**: `authenticated`
- **Using 式**: `auth.uid() = user_id`
- **With check 式**: `auth.uid() = user_id`

## リアルタイム
ダッシュボードでのライブ更新をサポートするため、`tasks` テーブルでリアルタイムが有効になっています。
