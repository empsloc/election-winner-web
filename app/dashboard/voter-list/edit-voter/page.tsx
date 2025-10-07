"use client";

import React, { useEffect, useState } from "react";
import { MdEmail, MdCall, MdFlag, MdBadge } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useVoters, Voter } from "@/context/VotersContext";

const InputField = ({ label, value, onChange, placeholder }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const DropdownField = ({ label, value, onChange, items }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select {label}</option>
      {items.map((item: string, idx: number) => (
        <option key={idx} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

type Props = { voter: Voter | null };

export default function EditVoterPage({ voter }: any) {
  const { updateVoter } = useVoters();
  const [open, setOpen] = useState(false);

  // State initialization
  const [name, setName] = useState("");
  const [voterNumber, setVoterNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [caste, setCaste] = useState("");
  const [party, setParty] = useState("");
  const [vip, setVip] = useState(false);
  const [dead, setDead] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const [migAddress, setMigAddress] = useState("");
  const [migContact, setMigContact] = useState("");
  const [migEmail, setMigEmail] = useState("");
  const [migDistrict, setMigDistrict] = useState("");
  const [migComment, setMigComment] = useState("");
  const [migResponsible, setMigResponsible] = useState("");
  const [migRespNumber, setMigRespNumber] = useState("");

  // Fill state when voter changes
  useEffect(() => {
    if (voter) {
      setName(voter.name || "");
      setVoterNumber(voter.voter_id || voter.serial || "");
      setMobile(voter.mobile || "");
      setEmail(voter.email || "");
      setBusiness(voter.business || "");
      setCaste(voter.caste || "");
      setParty(voter.party || "");
      setVip(!!voter.VIP);
      setDead(!!voter.dead);
      setMigrated(!!voter.migrated);
      setMigAddress(voter.migrate_address || "");
      setMigContact(voter.migrate_contact || "");
      setMigEmail(voter.migrate_email || "");
      setMigDistrict(voter.migrate_district || "");
      setMigComment(voter.comment || "");
      setMigResponsible(voter.migrate_resp_person || "");
      setMigRespNumber(voter.migrate_resp_person_number || "");
    }
  }, [voter]);

  const handleSaveChanges = () => {
    if (!voter) return;
    updateVoter(voter.id, {
      name,
      voter_id: voterNumber,
      mobile,
      email,
      business,
      caste,
      party,
      VIP: vip,
      dead,
      migrated,
      migrate_address: migAddress,
      migrate_contact: migContact,
      migrate_email: migEmail,
      migrate_district: migDistrict,
      comment: migComment,
      migrate_resp_person: migResponsible,
      migrate_resp_person_number: migRespNumber,
      updated:1
    });
    setOpen(false); // Close dialog after saving
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} key={voter?.voter_id}>
      <DialogTrigger asChild>
        <div
          className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-black/10 dark:border-white/10 flex flex-col cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-black/90 dark:text-white/90">{voter?.name}</div>
                <div className="text-sm text-black/60 dark:text-white/60">Voter ID: {voter?.voter_id}</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {voter?.email && (
                <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                  <MdEmail className="text-black/50 dark:text-white/50" size={18} />
                  <span>{voter.email}</span>
                </div>
              )}
              {voter?.mobile && (
                <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                  <MdCall className="text-black/50 dark:text-white/50" size={18} />
                  <span>{voter?.mobile}</span>
                </div>
              )}
              {voter?.party && (
                <div className="flex items-center gap-2 text-black/80 dark:text-white/80">
                  <MdFlag className="text-black/50 dark:text-white/50" size={18} />
                  <span>{voter.party}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
                <MdBadge className="text-black/50 dark:text-white/50" size={18} />
                <span>Caste: {voter?.caste || "-"} | Business: {voter?.business || "-"}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="text-sm text-black/60 dark:text-white/60">Center: {voter?.center || "-"}</div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl overflow-scroll scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Edit Voter</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll h-96 scrollbar-hide">
          <div className="bg-white p-6 rounded-2xl mb-6 shadow">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-500 mt-1">Voter No: {voterNumber}</p>
          </div>

          <InputField label="Mobile" value={mobile} onChange={setMobile} />
          <InputField label="Email" value={email} onChange={setEmail} />
          <DropdownField
            label="Business"
            value={business}
            onChange={setBusiness}
            items={["Shopkeeper", "Farmer", "Teacher", "Engineer", "Other"]}
          />
          <DropdownField
            label="Caste"
            value={caste}
            onChange={setCaste}
            items={["General", "OBC", "SC", "ST", "Other"]}
          />
          <DropdownField
            label="Party"
            value={party}
            onChange={setParty}
            items={["BJP", "Congress", "NCP", "Shiv Sena", "Other"]}
          />

          <div className="bg-white p-6 rounded-2xl shadow mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">VIP</span>
              <input type="checkbox" checked={vip} onChange={() => setVip(!vip)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Dead</span>
              <input type="checkbox" checked={dead} onChange={() => setDead(!dead)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Migrated</span>
              <input type="checkbox" checked={migrated} onChange={() => setMigrated(!migrated)} />
            </div>
          </div>

          {migrated && (
            <div className="mt-6 bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Migration Details</h3>
              <InputField label="Address" value={migAddress} onChange={setMigAddress} />
              <InputField label="Contact" value={migContact} onChange={setMigContact} />
              <InputField label="Email" value={migEmail} onChange={setMigEmail} />
              <InputField label="District" value={migDistrict} onChange={setMigDistrict} />
              <InputField label="Comment" value={migComment} onChange={setMigComment} />
              <InputField label="Responsible Person" value={migResponsible} onChange={setMigResponsible} />
              <InputField label="Responsible Person's Number" value={migRespNumber} onChange={setMigRespNumber} />
            </div>
          )}

        </div>
          <button
            onClick={handleSaveChanges}
            className="mt-4 w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold text-sm shadow-sm hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
      </DialogContent>
    </Dialog>
  );
}
