import "./globals.css";

export const metadata = {
  title: "Intelligent Academic Planner",
  description: "AI-powered academic planning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
