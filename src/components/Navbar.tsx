"use client";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center w-full px-4">
      <h2 className="text-lg font-medium text-gray-700">
        Dashboard / <span className="text-gray-400">Overview</span>
      </h2>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-900">{session?.user?.name || "Admin"}</p>
          <p className="text-xs text-gray-500 capitalize">
            {/* The (session?.user as any) cast fixes the TypeScript red line */}
            {(session?.user as any)?.role || "Administrator"}
          </p>
        </div>
        
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}