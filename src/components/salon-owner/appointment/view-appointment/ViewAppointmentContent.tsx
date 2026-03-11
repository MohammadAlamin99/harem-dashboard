"use client";
import { useRef, useState } from "react";
import ViewServiceAppoint from "./ViewServiceAppoint";
import ApppointNote from "./ApppointNote";
import AppointmentAcvitvity from "./AppointmentAcvitvity";
import { ActivityItem } from "@/@types/salon-owner/ActivityItem.type";
import BasicInformation from "./BasicInformation";
import AppointViewNav from "./AppointViewNav";

type AppStatus = "Booked" | "Confirmed" | "Arrived" | "Started" | "No-show";

const activities: ActivityItem[] = [
  {
    label: "Appointement Created",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#98A4AE]",
  },
  {
    label: "Appointment Confirmed",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#16CDC7]",
  },
  {
    label: "Appointment Started",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#98A4AE]",
  },
  {
    label: "Receipt Printed",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#16CDC7]",
  },
  {
    label: "Paid",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#36C76C]",
  },
];

export default function ViewAppointmentContent() {
  const [status, setStatus] = useState<AppStatus>("Booked");
  const [noteEditing, setNoteEditing] = useState<boolean>(false);
  const [noteDraft, setNoteDraft] = useState<string>("");
  const [savedNote, setSavedNote] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function saveNote(): void {
    setSavedNote(noteDraft);
    setNoteEditing(false);
  }

  function openNoteEditor(): void {
    setNoteDraft(savedNote);
    setNoteEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 60);
  }
  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/* page header and breadcrumb */}
      <AppointViewNav />
      <div className="mx-auto py-5 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Basic Informations */}
          <BasicInformation status={status} setStatus={setStatus} />
          {/* Appointment Activity */}
          <AppointmentAcvitvity activities={activities} />
        </div>

        {/* Note Section */}
        <ApppointNote
          openNoteEditor={openNoteEditor}
          savedNote={savedNote}
          noteEditing={noteEditing}
          textareaRef={textareaRef}
          saveNote={saveNote}
          setNoteDraft={setNoteDraft}
          noteDraft={noteDraft}
        />

        {/* ── Services ── */}
        <ViewServiceAppoint openNoteEditor={openNoteEditor} />
      </div>
    </div>
  );
}
