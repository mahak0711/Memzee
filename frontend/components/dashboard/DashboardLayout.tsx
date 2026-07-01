import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Timeline from "./Timeline";
import GraphCanvas from "./GraphCanvas";
import Inspector from "./Inspector";

export default function DashboardLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <Sidebar />

      <div className="ml-20">

        <Topbar />

        <div className="grid h-[calc(100vh-72px)] grid-cols-[320px_1fr_360px]">

          <Timeline />

          <GraphCanvas />

          <Inspector />

        </div>

      </div>

    </main>
  );
}