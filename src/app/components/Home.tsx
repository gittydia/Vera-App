import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkAuditor } from "./LinkAuditor";
import { Scanner } from "./Scanner";
import { Link, ScanLine, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useTheme } from "../context/ThemeContext";
import darkLogo from "../../imports/dark_mode.png";
import lightLogo from "../../imports/light_mode.png";

export function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"check" | "scan">(
    "check",
  );

  return (
    <div
      className="size-full flex flex-col"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <header className="flex items-center justify-between px-4 py-2">
        <img
          src={theme === "dark" ? darkLogo : lightLogo}
          alt="Vera"
          className="h-8 w-auto object-contain"
        />
        <Avatar
          onClick={() => navigate("/profile")}
          className="cursor-pointer hover:opacity-80 transition-opacity w-9 h-9"
        >
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>

      <Separator />

      <div className="flex gap-2 p-4">
        <Button
          onClick={() => setActiveTab("check")}
          variant={activeTab === "check" ? "default" : "ghost"}
          className="flex-1"
        >
          Link check
        </Button>
        <Button
          onClick={() => setActiveTab("scan")}
          variant={activeTab === "scan" ? "default" : "ghost"}
          className="flex-1"
        >
          Scan
        </Button>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="w-full max-w-md mx-auto">
          {activeTab === "check" ? (
            <LinkAuditor />
          ) : (
            <Scanner />
          )}
        </div>
      </div>

      <nav
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 px-4"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <button
          onClick={() => setActiveTab("check")}
          className="flex flex-col items-center gap-1.5 py-2 px-4 rounded-xl transition-opacity hover:opacity-80"
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center`}
            style={{
              backgroundColor:
                activeTab === "check"
                  ? "#7C3AED"
                  : "var(--bg-tertiary)",
            }}
          >
            <Link className="w-4 h-4" />
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Check
          </span>
        </button>

        <button
          onClick={() => setActiveTab("scan")}
          className="flex flex-col items-center gap-1.5 py-2 px-4 rounded-xl transition-opacity hover:opacity-80"
        >
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center`}
            style={{
              backgroundColor:
                activeTab === "scan"
                  ? "#7C3AED"
                  : "var(--bg-tertiary)",
            }}
          >
            <ScanLine className="w-4 h-4" />
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Scan
          </span>
        </button>

        <button
          onClick={() => navigate("/history")}
          className="flex flex-col items-center gap-1.5 py-2 px-4 rounded-xl transition-opacity hover:opacity-80"
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <Clock className="w-4 h-4" />
          </div>
          <span
            className="text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            History
          </span>
        </button>
      </nav>
    </div>
  );
}