"use client";

import { GraduationCap, User, BarChart3 } from "lucide-react";

interface DashboardHeaderProps {
  studentName: string;
  onLogoClick: () => void;
}

export function DashboardHeader({
  studentName,
  onLogoClick,
}: DashboardHeaderProps) {
  return (
    <header className="glass border-b border-glass-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">
                Adaptive Mastery
              </h1>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Intelligent Learning System
              </p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-muted-foreground">
                pyBKT Engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {studentName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
