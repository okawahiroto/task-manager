"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // -----------------------------
  // ユーザー確認 & タスク読み込み
  // -----------------------------
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
      } else {
        setUser(user);
        fetchTasks(user.id);
      }
    };

    getUser();
  }, [router]);

  // -----------------------------
  // Realtime（リアルタイム購読）
  // -----------------------------
  useEffect(() => {
    if (!user) return;

    // "tasks" テーブルの変更をリッスン
    const channel = supabase
      .channel("tasks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Realtime event:", payload);

          // DBに変更があったら最新データを再取得
          fetchTasks(user.id);
        }
      )
      .subscribe();

    // クリーンアップ（ページ離脱時に購読解除）
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // -----------------------------
  // タスク取得
  // -----------------------------
  const fetchTasks = async (userId) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) {
      setTasks(data);
    }
  };

  // -----------------------------
  // タスク追加
  // -----------------------------
  const addTask = async () => {
    if (!newTask.trim()) return;

    const { error } = await supabase.from("tasks").insert([
      {
        title: newTask,
        user_id: user.id,
      },
    ]);

    if (!error) {
      setNewTask("");
      fetchTasks(user.id);
    }
  };

  // -----------------------------
  // タスク完了切り替え
  // -----------------------------
  const toggleTask = async (task) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_done: !task.is_done })
      .eq("id", task.id);

    if (!error) {
      fetchTasks(user.id);
    }
  };

  // -----------------------------
  // タスク削除
  // -----------------------------
  const deleteTask = async (taskId) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (!error) {
      fetchTasks(user.id);
    }
  };

  // -----------------------------
  // ログアウト
  // -----------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (!user)
    return <div className="p-10 text-center text-gray-500">読み込み中...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white shadow p-8 rounded">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            ログアウト
          </button>
        </div>

        <p className="text-gray-600 mb-6">ログイン中: {user.email}</p>

        {/* タスク追加 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="タスク名を入力"
            className="flex-1 border p-2 rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            追加
          </button>
        </div>

        {/* タスク一覧 */}
        <h2 className="text-xl font-semibold mb-4">タスク一覧</h2>

        {tasks.length === 0 && (
          <p className="text-gray-500">タスクはありません</p>
        )}

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-3 bg-gray-50 border rounded flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.is_done}
                  onChange={() => toggleTask(task)}
                />
                <span
                  className={
                    task.is_done ? "line-through text-gray-500" : "text-gray-800"
                  }
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
