import React, { useState } from "react";
import { useVoters } from "@/context/VotersContext";

export default function VoterSummary() {
  const { voters } = useVoters(); // Get all voters from context
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of voters per page

  const totalVoters = voters.length;
  const updatedVoters = voters.filter((v) => v.updated).length; // Assuming your voter object has an `updated` boolean
  const unUpdatedVoters = totalVoters - updatedVoters;

  const totalPages = Math.ceil(totalVoters / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalVoters);

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      {/* Pagination */}
      <div className="p-4 sm:p-6  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-background-dark rounded-xl shadow-sm border border-black/10 dark:border-white/10">
        <div className="text-sm text-black/60 dark:text-white/60">
          <span className="font-medium text-black/90 dark:text-white/90">
            {startIndex}-{endIndex}
          </span>{" "}
          of{" "}
          <span className="font-medium text-black/90 dark:text-white/90">
            {totalVoters}
          </span>{" "}
          voters
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-lg bg-background-light dark:bg-white/5 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm font-medium disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className="px-3 py-1.5 rounded-lg bg-background-light dark:bg-white/5 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm font-medium"
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* Summary & Save Changes */}
      <div className="fixed md:relative bottom-0 left-0 w-full bg-white dark:bg-background-dark rounded-t-xl shadow-sm border-t border-black/10 dark:border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-50">
  <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-8 gap-y-4 text-center sm:text-left">
    <div className="flex flex-col">
      <div className="text-sm text-black/60 dark:text-white/60">Total Voters</div>
      <div className="text-2xl font-bold text-black/90 dark:text-white/90">{totalVoters}</div>
    </div>
    <div>
      <div className="text-sm text-black/60 dark:text-white/60">Updated</div>
      <div className="text-2xl font-bold text-green-500">{updatedVoters}</div>
    </div>
    <div>
      <div className="text-sm text-black/60 dark:text-white/60">Un-updated</div>
      <div className="text-2xl font-bold text-yellow-500">{unUpdatedVoters}</div>
    </div>
  </div>
  <button className="hidden md:block w-full md:w-auto px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary/90 transition-colors mt-4 sm:mt-0">
    Save Changes
  </button>
</div>

    </>
  );
}
