import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "../icons/Logo";
import { Button } from "./Button";

export function Sidebar({ setType }) {
  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-100 border-r w-64 fixed left-0 top-0 px-6 py-8 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center text-2xl font-bold text-gray-800 tracking-tight">
        <div className="pr-3 text-purple-600 scale-125">
          <Logo />
        </div>
        Brainly
      </div>

      {/* Divider */}
      <div className="mt-6 mb-4 border-b border-gray-200" />

      {/* Navigation Buttons */}
      <div className="space-y-4">
        <SidebarButton
          label="All Contents"
          onClick={() => setType("All")}
        />

        <SidebarButton
          label="Twitter"
          icon={<TwitterIcon />}
          onClick={() => setType("twitter")}
        />

        <SidebarButton
          label="YouTube"
          icon={<YoutubeIcon />}
          onClick={() => setType("youtube")}
        />
      </div>
    </div>
  );
}

// 💡 Reusable Sidebar Button for consistent design
function SidebarButton({ label, icon, onClick }: { label: string; icon?: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-100 rounded-lg transition-all duration-200"
    >
      {icon && <span className="text-purple-600">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
