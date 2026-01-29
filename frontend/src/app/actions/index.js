"use server";
import { signIn } from "@/auth";

const API_BASE = process.env.BACKEND_URL || "http://localhost:5000";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/dashboard" });
}

export async function doSocialSignUp(formData) {
    const action = formData.get('action');
    // Google OAuth handles both signup and login automatically
    // If user doesn't exist, backend creates them via the signIn callback
    await signIn(action, { redirectTo: "/dashboard" });
}
export async function doCredentialLogin(email, password) {
    try {
        // This calls the 'authorize' function we defined in auth.js
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: error.message || "Invalid credentials" };
    }
}

export async function doSignUp({ email, password, name }) {
    const normalizedEmail = email?.trim().toLowerCase();
    const trimmedPassword = password?.trim();

    if (!normalizedEmail || !trimmedPassword) {
        return { error: "Email and password are required." };
    }

    const resolvedName = name?.trim() || normalizedEmail.split("@")[0];

    try {
        const response = await fetch(`${API_BASE}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: normalizedEmail,
                password: trimmedPassword,
                name: resolvedName,
            }),
        });

        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            const message = payload?.error || payload?.message || "Signup failed.";
            return { error: message };
        }

        const user = await response.json();
        return { success: true, user };
    } catch (error) {
        return { error: "Unable to reach signup service." };
    }
}