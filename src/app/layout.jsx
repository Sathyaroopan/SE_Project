import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Intelligent Academic Planner",
  description: "AI-powered academic planning platform",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
