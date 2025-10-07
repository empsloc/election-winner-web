"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Map,
  ChartBar,
  Users,
  ThumbsUp,
  Megaphone,
  Phone,
  MessageSquare,
  Mail,
  Group,
  Menu,
  X,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const Layout = ({ children, title = "PartyConnect" }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // current path
  const {user} = useUser()

  const sidebarLinks = [
    { icon: ChartBar, label: "Dashboard", href: "/dashboard/" },
    { icon: Users, label: "Voter List", href: "/dashboard/voter-list" },
    { icon: ThumbsUp, label: "Votes", href: "/dashboard/votes" },
    { icon: Megaphone, label: "Promotional", href: "#" },
    { icon: Map, label: "Booth System", href: "#" },
    { icon: Phone, label: "Phone Diary", href: "#" },
    { icon: MessageSquare, label: "Chat", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
    { icon: Group, label: "War Room", href: "#" },
    { icon: ChartBar, label: "Vote Stats", href: "#" },
  ];

  const renderLinks = () =>
    sidebarLinks.map((item, idx) => {
      const isActive = pathname === item.href;
      return (
        <li key={idx}>
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg mt-2 ${
              isActive
                ? "bg-primary/10 text-primary dark:bg-primary/20 font-semibold"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <item.icon className="h-5 w-5" /> {item.label}
          </Link>
        </li>
      );
    });

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-sidebar-dark border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4 h-16 px-4 border-b border-slate-200 dark:border-slate-800 md:justify-start">
          
          <h1 className="text-xl font-bold">Party Management</h1>
          <button
            className="md:hidden ml-auto p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>
        <nav className="py-6 px-4">
          <ul>{renderLinks()}</ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          sidebarOpen ? "ml-64" : "ml-0"
        } md:ml-0`}
      >
        {/* Header */}
        <header className="bg-background-light dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-20 border-b border-black/10 dark:border-white/10">
          <div className="px-5">
            <div className="flex flex-wrap md:flex-nowrap h-16 items-center justify-between gap-2">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                  className="md:hidden p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="w-8 h-8 text-primary flex-shrink-0">
                <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0L20.4545 5.33333L0 25.3333V14.6667L15 0Z" fill="#06D1D4"></path>
<path d="M2.90827 28.177L15 40L30 25.3334V14.6667L20.4545 5.33337L0 25.3334L0.0041688 25.3375L20.4545 5.33337V20.6667L11.25 29.6667V20.1324L2.90827 28.177Z" fill="#3628A0"></path>
</svg>
                </div>
                <h1 className="text-xl hidden md:block font-bold text-black/90 dark:text-white/90 truncate">
                  {title}
                </h1>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 mt-2 md:mt-0">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  <Bell className="text-2xl" />
                </button>
                {user&&<UserButton/>}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
