import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

// Reviewers/admins log in with a plain username, never an email.
// Supabase Auth still requires an email internally, so usernames
// are deterministically mapped to a fake address under this fixed
// domain (which never receives real mail). When creating an
// account in Supabase's dashboard, set its email to exactly
// "<username>@cwc.staff" — e.g. username "sandid" → "sandid@cwc.staff".
const STAFF_EMAIL_DOMAIN = "cwc.staff";

function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@${STAFF_EMAIL_DOMAIN}`;
}

export async function getReviewerSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signInReviewer(
  username: string,
  password: string
): Promise<{ error: string | null }> {
  if (!username.trim() || !password) {
    return { error: "Enter a username and password." };
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: usernameToEmail(username),
    password,
  });
  if (error) return { error: "Incorrect username or password." };
  return { error: null };
}

export async function signOutReviewer(): Promise<void> {
  await supabase.auth.signOut();
}
