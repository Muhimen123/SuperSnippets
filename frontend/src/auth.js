import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"; // 1. Import Google Provider

const API_BASE = process.env.BACKEND_URL || "http://localhost:5000";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        try {
          const response = await fetch(`${API_BASE}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            return null;
          }

          const user = await response.json();

          return {
            id: user.id || user.email,
            name: user.name || user.email?.split("@")[0],
            email: user.email,
            role: user.role || "user",
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 2. This runs when Google (or Credentials) successfully verifies the user
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
            // 3. Send Google Profile to YOUR Express Backend
            const response = await fetch(`${API_BASE}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    googleId: user.id, // Unique ID from Google
                }),
            });
            
            if (!response.ok) {
                return false; // Prevent login if backend fails
            }

            const backendUser = await response.json();
            
            // Attach backend ID to the user object for the session
            user.id = backendUser.id; 
            user.role = backendUser.role;
            
            return true;
        } catch (error) {
            console.error("Error saving Google user to backend:", error);
            return false;
        }
      }
      return true; // Allow Credentials login to proceed normally
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
});