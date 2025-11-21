"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]); // ← タスク一覧
  const [newTask, setNewTask] = useState(""); // ← 新規タスク

  // -----------------------------
  // ユーザー確認
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
        fetchTasks(user.id); // ← ログインできたらタスクを読み込む
      }
    };

    getUser();
  }, [router]);

  // -----------------------------
  // タスク取得
  // -----------------------------
  const fetchTasks = async (userId) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
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

    if (error) {
      alert(error.message);
    } else {
      setNewTask("");
      fetchTasks(user.id); // ← 再読み込み
    }
  };

  // -----------------------------
  // ログアウト
  // -----------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (!user) return <div style={{ padding: 40 }}>読み込み中...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>ログイン中: {user.email}</p>
      <button onClick={handleLogout}>ログアウト</button>

      <hr style={{ margin: "20px 0" }} />

      <h2>タスク追加</h2>
      <input
        type="text"
        placeholder="タスク名"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask} style={{ marginLeft: 10 }}>
        追加
      </button>

      <h2 style={{ marginTop: 30 }}>タスク一覧</h2>

      {tasks.length === 0 && <p>タスクはありません</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.is_done ? "✔" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
