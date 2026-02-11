import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: "SuperSnipptes",
  description: "Simplified Codebook Generation Tool For Competitive Programmers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}> 
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
