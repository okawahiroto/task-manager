"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
      else alert("ログイン成功！");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) alert(error.message);
      else alert("サインアップ成功！メールを確認してください。");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>{isLogin ? "ログイン" : "サインアップ"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">
          {isLogin ? "ログイン" : "サインアップ"}
        </button>
      </form>

      <p
        style={{ cursor: "pointer", color: "blue", marginTop: 20 }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "アカウントを作る →" : "すでにアカウントがある →"}
      </p>
    </div>
  );
}
