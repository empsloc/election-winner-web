"use client";

import { CheckCircle } from "lucide-react";
import { MdWrongLocation } from "react-icons/md";
import { useVoters } from "@/context/VotersContext"; // adjust path
import { useMemo, useState } from "react";

export default function VotersPage() {
  const { voters, updateVoter } = useVoters();

  const [search, setSearch] = useState("");
  const [partyFilter, setPartyFilter] = useState("All");

  const toggleVote = (id: number, voted: number | undefined) => {
    updateVoter(id, { voted: voted ? 0 : 1 });
  };

  // Unique parties for dropdown
  const parties = useMemo(() => {
    const unique = new Set<string>();
    voters.forEach((v) => v.party && unique.add(v.party));
    return ["All", ...Array.from(unique)];
  }, [voters]);

  // Filtered voters (search + party)
  const filteredVoters = useMemo(() => {
    return voters.filter((v) => {
      const query = search.toLowerCase();
      const matchesSearch =
        v.name.toLowerCase().includes(query) ||
        v.voter_id.toLowerCase().includes(query) ||
        v.mobile?.toLowerCase().includes(query);

      const matchesParty =
        partyFilter === "All" ? true : v.party === partyFilter;

      return matchesSearch && matchesParty;
    });
  }, [voters, search, partyFilter]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
      {/* ===== Main Content ===== */}
      <main className="flex-grow container  px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Voters
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage voter information and track voting status.
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, voter ID, or mobile number"
                  className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg pl-4 pr-4 py-3 text-base focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Party Filter */}
            <div className="relative">
              <select
                value={partyFilter}
                onChange={(e) => setPartyFilter(e.target.value)}
                className="w-full appearance-none bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg pl-4 pr-10 py-3 text-base focus:ring-primary focus:border-primary"
              >
                {parties.map((party) => (
                  <option key={party} value={party}>
                    {party}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Voter Cards */}
        <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-md p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVoters.length > 0 ? (
              filteredVoters.map((voter) => (
                <div
                  key={voter.id}
                  onClick={() => toggleVote(voter.id, voter.voted)}
                  className={`rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg border flex flex-col justify-between ${
                    voter.voted
                      ? "bg-green-50 dark:bg-green-900/20 border-green-300"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-300"
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {voter.name}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {voter.voter_id}</p>
                    {voter.mobile && (
                      <p className="text-sm text-gray-500">
                        Mobile: {voter.mobile}
                      </p>
                    )}
                    {voter.party && (
                      <p className="text-sm text-gray-400">Party: {voter.party}</p>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2 mt-4 pt-4 border-t ${
                      voter.voted
                        ? "border-green-200 dark:border-green-800/50"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {voter.voted ? (
                      <>
                        <CheckCircle className="text-green-400 text-xl" />
                        <p className="text-sm font-medium text-green-400">
                          Voted
                        </p>
                      </>
                    ) : (
                      <>
                        <MdWrongLocation className="text-gray-500 text-xl" />
                        <p className="text-sm text-gray-500 font-medium">
                          Not Voted
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No voters found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
