import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  // SSR では supabase.auth.getUser() が使えないので
  // クライアント側で判定した方が安全
  redirect("/auth");
}
