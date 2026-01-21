import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"; // 1. Import Google Provider

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // ... your existing credentials config ...
    }),
  ],
  callbacks: {
    // 2. This runs when Google (or Credentials) successfully verifies the user
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
            // 3. Send Google Profile to YOUR Express Backend
            const response = await fetch("http://localhost:5000/api/auth/google", {
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
    async jwt({ token, user, account }) {
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
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
});