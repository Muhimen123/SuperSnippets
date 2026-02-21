import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "SuperSnipptes",
  description:
    "Simplified Codebook Generation Tool For Competitive Programmers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
          <Toaster
            toastOptions={{
              style: { border: "1px solid black", padding: "16px" },
            }}
            position="bottom-right"
          />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
