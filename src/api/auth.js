import { supabase } from "../supabaseClient";

// Logowanie użytkownika
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Wylogowanie
export async function logout() {
  await supabase.auth.signOut();
}
