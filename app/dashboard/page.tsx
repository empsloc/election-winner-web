"use client";

import Image from "next/image";
import {
  ChartBarIcon,
  UsersIcon,
  HandThumbUpIcon,
  MegaphoneIcon,
  MapIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  ArrowsRightLeftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import path from "path";
import Link from "next/link";

export default function DashboardPage() {
  const cards = [
    { label: "Voter List", icon: UsersIcon, path: "/dashboard/voter-list" },
    { label: "Votes", icon: HandThumbUpIcon, path: "/dashboard/votes" },
    { label: "Promotional Material", icon: MegaphoneIcon },
    { label: "Booth System", icon: MapIcon },
    { label: "Phone Diary", icon: PhoneIcon },
    { label: "Refresh Data", icon: ArrowsRightLeftIcon },
    { label: "Chat", icon: ChatBubbleLeftIcon },
    { label: "Send Email", icon: EnvelopeIcon },
    { label: "War Room", icon: UserGroupIcon },
    { label: "Vote Stats", icon: ChartBarIcon },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
       

        {/* Dashboard grid */}
        <main className="flex-grow">
          <div className=" max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8 md:hidden">Dashboard</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {cards.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.label}
                    className="group flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-slate-900/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200 transform hover:-translate-y-1 shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-800"
                    href={item.path || "#"}
                  >
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      <Icon className="h-8 w-8 text-primary group-hover:text-white" />
                    </div>
                    <p className="font-semibold text-center text-sm">{item.label}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>

        {/* Footer */}
        
      </div>
    </div>
  );
}
