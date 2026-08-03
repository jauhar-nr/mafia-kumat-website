import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";
import "katex/dist/katex.min.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mafia Kumat | Fisika Kuantum Material",
  description: "Platform pembelajaran komprehensif dari komunitas Mafia Kumat. Eksplorasi matematika esensial, fisika kuantum, hingga sains material modern.",
  openGraph: {
    title: "Mafia Kumat | Fisika Kuantum Material",
    description: "Platform pembelajaran komprehensif dari komunitas Mafia Kumat.",
    url: "https://mafia-kumat.netlify.app",
    siteName: "Mafia Kumat",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
