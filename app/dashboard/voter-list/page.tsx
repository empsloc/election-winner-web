"use client";

import React, { useEffect, useState } from "react";
import { MdEmail, MdCall, MdFlag, MdBadge, MdSearch } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditVoterPage from "./edit-voter/page";
import { useVoters, Voter } from "@/context/VotersContext";
import { dummyVoters } from "@/data/constants";
import { Phone } from "lucide-react";
import VoterSummary from "@/app/_components/VoteSummary";

// 15 dummy Indian voters



export default function VoterListPage() {
  const { voters, addVoter } = useVoters();
  const [search, setSearch] = useState("");
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);

  // Add dummy voters if empty
  useEffect(() => {
    if (voters.length === 0) {
      dummyVoters.forEach((v) => addVoter(v));
    }
  }, [voters, addVoter]);

  const filteredVoters = voters.filter(
    (voter) =>
      voter.name.toLowerCase().includes(search.toLowerCase()) ||
      (voter.email && voter.email.toLowerCase().includes(search.toLowerCase())) ||
      voter.voter_id.toLowerCase().includes(search.toLowerCase()) ||
      voter.serial.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-black/90 dark:text-white/90">Voter List</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Manage and update voter information for your political party.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-black/10 dark:border-white/10 p-4 sm:p-6">
        <div className="relative flex-1">
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by Name, Email, ID, Serial Number"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background-light dark:bg-white/5 text-black/90 dark:text-white/90 placeholder:text-black/50 dark:placeholder:text-white/50 border-transparent focus:ring-2 focus:ring-primary focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Voter cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVoters.map((voter,index) => (
          
          <EditVoterPage key={index}  voter={voter} />
        ))}
      </div>

       {/* Pagination placeholder */}
       <VoterSummary/>
    </div>
  );
}
