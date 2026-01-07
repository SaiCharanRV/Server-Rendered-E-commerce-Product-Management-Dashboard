import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      {/* 'ml-64' pushes your products page to the right of the blue sidebar */}
      <main className="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}