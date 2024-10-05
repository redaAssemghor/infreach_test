"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = "https://infreach-test.vercel.app";

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

// resetPasswordAction is used to send a password reset email to the user
export const resetPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = "https://infreach-test.vercel.app";
  console.log(`Redirect URL: ${origin}/reset_password_callback`);

  if (!email) {
    return { error: "Email is required" };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset_password_callback`,
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/password_recovery", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/password_recovery",
      "A password reset link has been sent to your email."
    );
  }
};

// updatePasswordAction is used to update the user's password
export const updatePasswordAction = async (formData: FormData) => {
  const password = formData.get("password")?.toString();
  const supabase = createClient();

  if (!password) {
    return { error: "Password is required" };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/auth/reset_password_callback",
      error.message
    );
  }

  return redirect("/sign-in");
};
