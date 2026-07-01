import {
    Brain,
    LayoutDashboard,
    Search,
    Settings,
} from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-20 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div className="flex h-full flex-col items-center justify-between py-6">
                <div className="flex flex-col items-center gap-8">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500">
                        <Brain size={22} />
                    </div>

                    <LayoutDashboard className="text-cyan-400" />

                    <Search className="text-zinc-500 hover:text-white transition-colors" />

                </div>
                <Settings className="text-zinc-500" />

            </div>
        </aside>
    );
}