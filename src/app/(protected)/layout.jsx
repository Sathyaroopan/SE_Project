import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies(); 
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (!token) {
    redirect("/login");
  }

  let userName = "Student";

  try {
    const decoded = verifyToken(token);
    userName = decoded.name || decoded.rollNumber || "Student";
  } catch (err) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar userName={userName} />
        <main className="flex-1 overflow-y-auto p-6 bg-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
