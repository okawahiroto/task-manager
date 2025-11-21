"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // 未ログイン → /auth に移動
        router.push("/auth");
      } else {
        // ログイン済み → state に格納
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (!user) {
    return <div style={{ padding: 40 }}>読み込み中...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>ログイン中ユーザー: {user.email}</p>

      <button onClick={handleLogout} style={{ marginTop: 20 }}>
        ログアウト
      </button>
    </div>
  );
}
