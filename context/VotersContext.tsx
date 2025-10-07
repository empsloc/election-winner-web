"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
export type Voter = {
    id: number;
    name: string;
    email?: string;
    serial: string;
    voter_id: string;
    mobile?: string;
    updated?: number;
    voted?: number;
    party?: string;
    business?: string;
    caste?: string;
    VIP?: boolean; // ✅ convert to boolean
    dead?: boolean; // ✅ convert to boolean
    migrated?: boolean; // ✅ convert to boolean
    migrate_address?: string;
    migrate_contact?: string;
    migrate_email?: string;
    migrate_district?: string;
    comment?: string;
    migrate_resp_person?: string;
    migrate_resp_person_number?: string;
    center?:string;
  };

type VoterContextType = {
  voters: Voter[];
  addVoter: (voter: Voter) => void;
  updateVoter: (id: number, updatedVoter: Partial<Voter>) => void;
  removeVoter: (id: number) => void;
};

const VoterContext = createContext<VoterContextType | undefined>(undefined);

export const VoterProvider = ({ children }: { children: ReactNode }) => {
  const [voters, setVoters] = useState<Voter[]>([]);

  // Load voters from localStorage on mount
  useEffect(() => {
    const storedVoters = localStorage.getItem("voters");
    if (storedVoters) {
      setVoters(JSON.parse(storedVoters));
    }
  }, []);

  // Save voters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("voters", JSON.stringify(voters));
  }, [voters]);

  const addVoter = (voter: Voter) => {
    setVoters((prev) => [...prev, voter]);
  };

  const updateVoter = (id: number, updatedVoter: Partial<Voter>) => {
    setVoters((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updatedVoter } : v))
    );
  };

  const removeVoter = (id: number) => {
    setVoters((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <VoterContext.Provider value={{ voters, addVoter, updateVoter, removeVoter }}>
      {children}
    </VoterContext.Provider>
  );
};

// Custom hook for easy access
export const useVoters = () => {
  const context = useContext(VoterContext);
  if (!context) throw new Error("useVoters must be used within a VoterProvider");
  return context;
};
