"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  ChevronDown,
  Trash2,
  MoreVertical,
  ClipboardList,
  CreditCard,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceRow {
  id: string;
  name: string;
  date: string;
  price: number;
  startTime: string;
  duration: string;
  employee: string;
  employeeAvatar: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_SERVICES: ServiceRow[] = [
  {
    id: "sr1",
    name: "Haircut",
    date: "02/08/2025",
    price: 170,
    startTime: "11:00",
    duration: "15 min",
    employee: "Maria Rodriguez",
    employeeAvatar: "/images/avator.png",
  },
];

const SERVICE_OPTIONS = [
  "Haircut",
  "Makeup",
  "Hair Color",
  "Facial",
  "Massage",
  "Manicure",
  "Pedicure",
];

const PAYMENT_METHODS = [
  {
    key: "cash",
    label: "Cash",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect
          x="3"
          y="9"
          width="24"
          height="14"
          rx="3"
          stroke="#635BFF"
          strokeWidth="1.8"
        />
        <circle cx="15" cy="16" r="3.5" stroke="#635BFF" strokeWidth="1.8" />
        <circle cx="7.5" cy="16" r="1.2" fill="#635BFF" />
        <circle cx="22.5" cy="16" r="1.2" fill="#635BFF" />
      </svg>
    ),
  },
  {
    key: "giftcard",
    label: "Gift Card",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect
          x="3"
          y="11"
          width="24"
          height="14"
          rx="2.5"
          stroke="#635BFF"
          strokeWidth="1.8"
        />
        <path d="M3 17h24" stroke="#635BFF" strokeWidth="1.8" />
        <path d="M15 11V25" stroke="#635BFF" strokeWidth="1.8" />
        <path
          d="M15 11c0 0-3.5-5 0-5s3.5 5 0 5z"
          stroke="#635BFF"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "card",
    label: "Card Terminal",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect
          x="3"
          y="7"
          width="24"
          height="16"
          rx="3"
          stroke="#635BFF"
          strokeWidth="1.8"
        />
        <path d="M3 13h24" stroke="#635BFF" strokeWidth="2" />
        <rect
          x="6"
          y="17"
          width="6"
          height="3"
          rx="1"
          fill="#635BFF"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    key: "qr",
    label: "QR Code",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect
          x="3"
          y="3"
          width="10"
          height="10"
          rx="2"
          stroke="#635BFF"
          strokeWidth="1.8"
        />
        <rect
          x="17"
          y="3"
          width="10"
          height="10"
          rx="2"
          stroke="#635BFF"
          strokeWidth="1.8"
        />
        <rect
          x="3"
          y="17"
          width="10"
          height="10"
          rx="2"
          stroke="#635BFF"
          strokeWidth="1.8"
        />
        <rect x="5.5" y="5.5" width="5" height="5" rx="1" fill="#635BFF" />
        <rect x="19.5" y="5.5" width="5" height="5" rx="1" fill="#635BFF" />
        <rect x="5.5" y="19.5" width="5" height="5" rx="1" fill="#635BFF" />
        <rect x="17" y="17" width="4" height="4" rx="0.5" fill="#635BFF" />
        <rect x="23" y="17" width="4" height="4" rx="0.5" fill="#635BFF" />
        <rect x="17" y="23" width="4" height="4" rx="0.5" fill="#635BFF" />
        <rect x="23" y="23" width="4" height="4" rx="0.5" fill="#635BFF" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MODAL: Add Service
// ─────────────────────────────────────────────────────────────────────────────

function AddServiceModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [selected, setSelected] = useState(SERVICE_OPTIONS[0]);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[520px] px-7 py-6 font-manrope">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-[#1A1A2E]">Add Service</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] cursor-pointer transition-colors"
          >
            <X size={16} className="text-[#526B7A]" />
          </button>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
            Service <span className="text-red-400">*</span>
          </label>
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setDropOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[10px] hover:border-[#635BFF] transition-colors cursor-pointer"
            >
              <span className="text-sm text-[#29343D]">{selected}</span>
              <ChevronDown
                size={16}
                className={`text-[#98A4AE] transition-transform ${dropOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-[10px] shadow-lg z-10 py-1 overflow-hidden">
                {SERVICE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setDropOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-manrope cursor-pointer transition-colors ${
                      selected === opt
                        ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                        : "text-[#29343D] hover:bg-[#F4F6FA]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              onSave(selected);
              onClose();
            }}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[10px] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL: Add a Note
// ─────────────────────────────────────────────────────────────────────────────

function AddNoteModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
}) {
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[520px] px-7 py-6 font-manrope">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#1A1A2E]">Add a Note</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] cursor-pointer transition-colors"
          >
            <X size={16} className="text-[#526B7A]" />
          </button>
        </div>
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder="Write a note..."
          className="w-full border border-[#E0E6EB] rounded-[10px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] resize-none transition-colors mb-5"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#E0E6EB] text-sm font-semibold text-[#526B7A] rounded-[10px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(draft.trim());
              onClose();
            }}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[10px] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL: Request Upfront Payment
// ─────────────────────────────────────────────────────────────────────────────

function RequestUpfrontPaymentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [payMethod, setPayMethod] = useState<string | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[500px] px-7 py-6 font-manrope">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#1A1A2E]">
            Request upfront payment
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] cursor-pointer transition-colors"
          >
            <X size={16} className="text-[#526B7A]" />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
            Ammount <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter ammount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-[#E0E6EB] rounded-[10px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-3">
            Payment Methods <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.key}
                onClick={() => setPayMethod(m.key)}
                className={`flex flex-col items-center justify-center gap-3 py-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  payMethod === m.key
                    ? "border-[#635BFF] bg-[#F0EEFF]"
                    : "border-[#E8ECF0] hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#EEEEFF] flex items-center justify-center">
                  {m.icon}
                </div>
                <span className="text-sm font-semibold text-[#1A1A2E]">
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[10px] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — fully self-contained, zero props needed
// ─────────────────────────────────────────────────────────────────────────────

export default function ReviewAppointmentTable() {
  const [services, setServices] = useState<ServiceRow[]>(INITIAL_SERVICES);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [upfrontOpen, setUpfrontOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [note, setNote] = useState("");

  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function handleAddService(name: string) {
    setServices((prev) => [
      ...prev,
      {
        id: `sr${Date.now()}`,
        name,
        date: "02/08/2025",
        price: 170,
        startTime: "11:00",
        duration: "15 min",
        employee: "Maria Rodriguez",
        employeeAvatar: "/images/avator.png",
      },
    ]);
  }

  const totalTime = services.reduce((acc, s) => acc + parseInt(s.duration), 0);
  const totalPrice = services.reduce((acc, s) => acc + s.price, 0);
  const cols = "1.4fr 1.4fr 0.9fr 1fr 1fr 2.2fr 44px";

  return (
    <>
      <AddServiceModal
        open={addServiceOpen}
        onClose={() => setAddServiceOpen(false)}
        onSave={handleAddService}
      />
      <AddNoteModal
        open={addNoteOpen}
        onClose={() => setAddNoteOpen(false)}
        onSave={(n) => setNote(n)}
      />
      <RequestUpfrontPaymentModal
        open={upfrontOpen}
        onClose={() => setUpfrontOpen(false)}
      />

      <div className="flex flex-col font-manrope">
        {/* ── Table card ── */}
        <div className="bg-white rounded-2xl border border-[#EBEBEB] px-8 py-7">
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">
            Review Appointment
          </h2>

          {/* Saved note display */}
          {note && (
            <div className="mb-5 px-4 py-3 bg-[#F8F8FF] border border-[#E0DEFF] rounded-[10px] flex items-start gap-2">
              <ClipboardList
                size={15}
                className="text-[#635BFF] mt-0.5 shrink-0"
              />
              <p className="text-sm text-[#29343D]">{note}</p>
            </div>
          )}

          {/* Header */}
          <div
            className="grid pb-4 border-b border-[#F0F2F5]"
            style={{ gridTemplateColumns: cols }}
          >
            {[
              "Service",
              "Date",
              "Price",
              "Start Time",
              "Duration",
              "Employee",
              "",
            ].map((h, i) => (
              <p key={i} className="text-sm font-semibold text-[#1A1A2E]">
                {h}
              </p>
            ))}
          </div>

          {/* Rows */}
          {services.map((svc) => (
            <div
              key={svc.id}
              className="grid items-center py-5 border-b border-[#F0F2F5]"
              style={{ gridTemplateColumns: cols }}
            >
              <p className="text-sm text-[#29343D]">{svc.name}</p>
              <p className="text-sm text-[#29343D]">{svc.date}</p>
              <p className="text-sm text-[#29343D]">€ {svc.price}</p>
              <p className="text-sm text-[#29343D]">{svc.startTime}</p>
              <p className="text-sm text-[#29343D]">{svc.duration}</p>

              {/* Employee chip */}
              <div className="flex items-center gap-2.5 px-2.5 py-2 border border-[#E8ECF0] rounded-[12px] bg-white w-fit">
                <div className="relative w-8 h-8 rounded-[8px] overflow-hidden shrink-0 bg-[#F5E8FF]">
                  <Image
                    src={svc.employeeAvatar}
                    alt={svc.employee}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-[#1A1A2E] whitespace-nowrap">
                  {svc.employee}
                </span>
                <ChevronDown size={15} className="text-[#98A4AE] shrink-0" />
              </div>

              {/* Delete */}
              <button
                onClick={() =>
                  setServices((prev) => prev.filter((s) => s.id !== svc.id))
                }
                className="w-9 h-9 flex items-center justify-center border border-[#FFE0E0] rounded-[10px] hover:bg-[#FFF4F4] transition-colors cursor-pointer"
              >
                <Trash2 size={15} className="text-[#FF6B6B]" />
              </button>
            </div>
          ))}

          {/* Add Service + Total Time */}
          <div
            className="grid items-center pt-5"
            style={{ gridTemplateColumns: cols }}
          >
            <button
              onClick={() => setAddServiceOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#EEEEFF] hover:bg-[#E0DEFF] text-[#635BFF] text-sm font-semibold rounded-[10px] transition-colors cursor-pointer w-fit"
            >
              <Plus size={14} strokeWidth={2.5} />
              Add Service
            </button>
            <div />
            <div />
            <div className="col-span-2 flex items-center gap-3">
              <span className="text-sm font-semibold text-[#29343D]">
                Total Time
              </span>
              <span
                className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ color: "#3DD9B3", background: "#F0FBF8" }}
              >
                {totalTime} min
              </span>
            </div>
          </div>
        </div>

        {/* ── Total bar ── */}
        <div className="mt-4 bg-white rounded-2xl border border-[#EBEBEB] px-8 py-5 flex items-center justify-between">
          <span className="text-base font-bold text-[#1A1A2E]">Total</span>
          <span className="text-base font-bold text-[#1A1A2E]">
            € {totalPrice}
          </span>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-5 flex items-center justify-between">
          <button className="px-6 py-2.5 border border-[#E0E6EB] bg-white hover:bg-[#F4F6FA] text-sm font-semibold text-[#29343D] rounded-[10px] transition-colors cursor-pointer">
            Back
          </button>

          <div className="flex items-center gap-3">
            {/* ··· */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className="w-10 h-10 flex items-center justify-center border border-[#E0E6EB] bg-white rounded-[10px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
              >
                <MoreVertical size={17} className="text-[#526B7A]" />
              </button>

              {moreOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-white border border-[#E8ECF0] rounded-[14px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] z-30 py-2 w-60 overflow-hidden">
                  <button
                    onClick={() => {
                      setAddNoteOpen(true);
                      setMoreOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    <ClipboardList
                      size={16}
                      className="text-[#635BFF] shrink-0"
                    />
                    Add a Note
                  </button>
                  <button
                    onClick={() => {
                      setUpfrontOpen(true);
                      setMoreOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    <CreditCard size={16} className="text-[#635BFF] shrink-0" />
                    Request upfront payment
                  </button>
                </div>
              )}
            </div>

            <button className="px-6 py-2.5 bg-[#EEEEFF] hover:bg-[#E0DEFF] text-[#635BFF] text-sm font-semibold rounded-[10px] transition-colors cursor-pointer">
              Checkout
            </button>

            <button className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[10px] transition-colors cursor-pointer shadow-[0_2px_10px_rgba(99,91,255,0.35)]">
              Save and Leave
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
