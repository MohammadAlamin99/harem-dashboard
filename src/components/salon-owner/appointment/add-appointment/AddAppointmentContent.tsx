"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MoreVertical, ChevronDown, X, Percent, Lightbulb } from "lucide-react";
import PageHeader from "../../common-component/PageHeader";
import AddAppointTabs from "./AddAppointTabs";
import AddAppontClinetSection from "./AddAppontClinetSection";
import RescheduleAppointmentContent from "../reschedule/RescheduleAppointmentContent";
import BasicInformation from "../view-appointment/BasicInformation";
import RepeatingModal from "../view-appointment/Repeatingmodal";
import ReviewAppointmentTable from "./Reviewappointmenttable ";
import ApppointNote from "../view-appointment/ApppointNote";
import Frequency from "./Frequency";

type Step = "details" | "review" | "payment";

interface ServiceRow {
  id: string;
  name: string;
  date: string;
  price: string;
  startTime: string;
  duration: string;
  employee: string;
  employeeAvatar: string;
}

const DISCOUNT_TYPES = ["Percentage", "Fixed Amount"];

const TIP_OPTIONS = [
  { label: "No Tip", pct: 0, amount: null },
  { label: "10%", pct: 10, amount: "€ 13,20" },
  { label: "18%", pct: 18, amount: "€ 23,76" },
  { label: "25%", pct: 25, amount: "€ 33" },
  { label: "35%", pct: 35, amount: "€ 46,20" },
  { label: "45%", pct: 45, amount: "€ 59,40" },
  { label: "Custom Tip", pct: -1, amount: null },
];

const PAYMENT_METHODS_DATA = [
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

function SendTipModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedTip, setSelectedTip] = useState(0);
  const [employee, setEmployee] = useState("Maria Rodriguez");
  const [empOpen, setEmpOpen] = useState(false);

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
      <div className="bg-white rounded-2xl shadow-xl w-[560px] px-7 py-6 font-manrope">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#29343D]">Send a Tip</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] cursor-pointer transition-colors"
          >
            <X size={16} className="text-[#526B7A]" />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-[#29343D] mb-2">
            Employee <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <button
              onClick={() => setEmpOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[10px] hover:border-[#635BFF] transition-colors cursor-pointer"
            >
              <span className="text-sm font-manrope text-[#29343D]">
                {employee}
              </span>
              <ChevronDown
                size={16}
                className={`text-[#98A4AE] transition-transform ${empOpen ? "rotate-180" : ""}`}
              />
            </button>
            {empOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-[10px] shadow-lg z-10 py-1">
                {["Maria Rodriguez", "John Smith", "Sarah Lee"].map((emp) => (
                  <button
                    key={emp}
                    onClick={() => {
                      setEmployee(emp);
                      setEmpOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-manrope cursor-pointer transition-colors ${
                      employee === emp
                        ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                        : "text-[#29343D] hover:bg-[#F4F6FA]"
                    }`}
                  >
                    {emp}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#29343D] mb-3">
            Ammount <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TIP_OPTIONS.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedTip(i)}
                className={`flex flex-col items-center justify-center py-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedTip === i
                    ? "border-[#635BFF] bg-[#F0EEFF]"
                    : "border-[#E8ECF0] bg-white hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                <span className="text-base font-bold font-manrope text-[#29343D]">
                  {opt.label}
                </span>
                {opt.amount && (
                  <span className="text-xs font-manrope text-[#98A4AE] mt-0.5">
                    {opt.amount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[10px] transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
function AddDiscountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [discountType, setDiscountType] = useState("Percentage");
  const [typeOpen, setTypeOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node))
        setTypeOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const totalAfter = amount ? `€ ${parseFloat(amount) || 0}` : "€ 0";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[560px] px-7 py-6 font-manrope">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-[#29343D]">
            Add Cart Discount
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] cursor-pointer transition-colors"
          >
            <X size={16} className="text-[#526B7A]" />
          </button>
        </div>
        <p className="text-xs font-manrope text-[#98A4AE] mb-6">
          Taxes will be recalculated after the discount has been applied.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-2">
              Type <span className="text-red-400">*</span>
            </label>
            <div ref={typeRef} className="relative">
              <button
                onClick={() => setTypeOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[10px] hover:border-[#635BFF] transition-colors cursor-pointer"
              >
                <span className="text-sm font-manrope text-[#29343D]">
                  {discountType}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#98A4AE] transition-transform ${typeOpen ? "rotate-180" : ""}`}
                />
              </button>
              {typeOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-[10px] shadow-lg z-10 py-1">
                  {DISCOUNT_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setDiscountType(t);
                        setTypeOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-manrope cursor-pointer transition-colors ${
                        discountType === t
                          ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                          : "text-[#29343D] hover:bg-[#F4F6FA]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-2">
              Ammount (%) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter percentage"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[10px] px-4 py-3 text-sm font-manrope text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold font-manrope text-[#635BFF]">
            Total After Discount: {totalAfter}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[10px] transition-colors cursor-pointer"
          >
            Add Discount
          </button>
        </div>
      </div>
    </div>
  );
}
const PAYMENT_SERVICES: ServiceRow[] = [
  {
    id: "sr1",
    name: "Haircut",
    date: "02/08/2025",
    price: "170",
    startTime: "11:00",
    duration: "15 min",
    employee: "Maria Rodriguez",
    employeeAvatar: "/images/avator.png",
  },
  {
    id: "sr2",
    name: "Makeup",
    date: "02/08/2025",
    price: "170",
    startTime: "11:15",
    duration: "45 min",
    employee: "Maria Rodriguez",
    employeeAvatar: "/images/avator.png",
  },
];

function PaymentTab({ onBack }: { onBack: () => void }) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [tipOpen, setTipOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const total = PAYMENT_SERVICES.reduce((a, s) => a + parseFloat(s.price), 0);

  return (
    <>
      <SendTipModal open={tipOpen} onClose={() => setTipOpen(false)} />
      <AddDiscountModal
        open={discountOpen}
        onClose={() => setDiscountOpen(false)}
      />

      <div className="flex flex-col gap-5">
        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] px-6 py-5">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-4">
            Payment Methods
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {PAYMENT_METHODS_DATA.map((method) => (
              <button
                key={method.key}
                onClick={() => setSelectedPayment(method.key)}
                className={`flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedPayment === method.key
                    ? "border-[#635BFF] bg-[#F0EEFF]"
                    : "border-[#E8ECF0] bg-white hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#EEEEFF] flex items-center justify-center">
                  {method.icon}
                </div>
                <span className="text-sm font-semibold font-manrope text-[#29343D]">
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Services table */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] px-6 py-5">
          <h2 className="text-base font-bold font-manrope text-[#29343D] mb-5">
            Services
          </h2>
          <div
            className="grid pb-3 border-b border-[#EEF2F8]"
            style={{ gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1fr 2fr" }}
          >
            {[
              "Service",
              "Date",
              "Price",
              "Start Time",
              "Duration",
              "Employee",
            ].map((h) => (
              <p
                key={h}
                className="text-sm font-semibold font-manrope text-[#29343D]"
              >
                {h}
              </p>
            ))}
          </div>
          {PAYMENT_SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="grid py-4 border-b border-[#EEF2F8] items-center"
              style={{ gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 1fr 2fr" }}
            >
              <p className="text-sm font-manrope text-[#29343D]">{svc.name}</p>
              <p className="text-sm font-manrope text-[#29343D]">{svc.date}</p>
              <p className="text-sm font-manrope text-[#29343D]">
                € {svc.price}
              </p>
              <p className="text-sm font-manrope text-[#29343D]">
                {svc.startTime}
              </p>
              <p className="text-sm font-manrope text-[#29343D]">
                {svc.duration}
              </p>
              <div className="flex items-center gap-2 px-2 py-1.5 border border-[#E8ECF0] rounded-[10px] bg-white w-fit">
                <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={svc.employeeAvatar}
                    alt={svc.employee}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold font-manrope text-[#29343D]">
                  {svc.employee}
                </span>
                <ChevronDown size={14} className="text-[#98A4AE] shrink-0" />
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="mt-4 border border-[#E8ECF0] rounded-2xl px-5 py-4">
            <p className="text-sm font-bold font-manrope text-[#29343D] mb-3">
              Order Summary
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-manrope text-[#526B7A]">Tax</span>
                <span className="text-sm font-manrope text-[#29343D]">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-manrope text-[#526B7A]">
                  Discount
                </span>
                <span className="text-sm font-manrope text-[#29343D]">0</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EEF2F8]">
                <span className="text-sm font-bold font-manrope text-[#29343D]">
                  Total
                </span>
                <span className="text-sm font-bold font-manrope text-[#29343D]">
                  € {total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-6 py-2.5 border border-[#E0E6EB] bg-white hover:bg-[#F4F6FA] text-sm font-semibold font-manrope text-[#29343D] rounded-[10px] transition-colors cursor-pointer"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className="w-9 h-9 flex items-center justify-center border border-[#E0E6EB] bg-white rounded-[10px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
              >
                <MoreVertical size={16} className="text-[#526B7A]" />
              </button>
              {moreOpen && (
                <div className="absolute bottom-full right-0 mb-2 bg-white border border-[#E0E6EB] rounded-[12px] shadow-lg z-20 py-1.5 w-44 overflow-hidden">
                  <button
                    onClick={() => {
                      setTipOpen(true);
                      setMoreOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    <Lightbulb size={15} className="text-[#635BFF]" />
                    Add a Tip
                  </button>
                  <button
                    onClick={() => {
                      setDiscountOpen(true);
                      setMoreOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    <Percent size={15} className="text-[#635BFF]" />
                    Add a Discount
                  </button>
                </div>
              )}
            </div>
            <button className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[10px] transition-colors cursor-pointer shadow-[0_2px_8px_rgba(99,91,255,0.3)]">
              Save and Leave
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AddAppointmentContent() {
  type AppStatus = "Booked" | "Confirmed" | "Arrived" | "Started" | "No-show";
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>("Booked");
  const [repeatingOpen, setRepeatingOpen] = useState<boolean>(false);
  const [noteEditing, setNoteEditing] = useState<boolean>(false);
  const [savedNote, setSavedNote] = useState<string>("");
  const [noteDraft, setNoteDraft] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onSelectClient = (id: string) => {
    setSelectedClient(id);
  };
  const openNoteEditor = () => {
    setNoteEditing(true);
    setNoteDraft(savedNote);
  };
  const closeNoteEditor = () => {
    setNoteEditing(false);
    setNoteDraft("");
  };
  const saveNote = () => {
    setSavedNote(noteDraft);
    closeNoteEditor();
  };
  const openRepeatingModal = () => {
    setRepeatingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col gap-5 pb-8">
      <PageHeader
        title="Add Appointment"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Appointments", active: true }]}
      />
      <AddAppointTabs currentStep={currentStep} onStepChange={setCurrentStep} />
      {currentStep === "details" && (
        <>
          <AddAppontClinetSection
            selectedClient={selectedClient}
            onSelectClient={onSelectClient}
          />
          <RescheduleAppointmentContent />
          <Frequency />
        </>
      )}
      {currentStep === "review" && (
        <>
          <BasicInformation
            status={status}
            setStatus={setStatus}
            onReschedule={() => setCurrentStep("details")}
            onSetRepeating={openRepeatingModal}
          />

          <RepeatingModal
            open={repeatingOpen}
            onClose={() => setRepeatingOpen(false)}
          />
          <ApppointNote
            openNoteEditor={openNoteEditor}
            closeNoteEditor={closeNoteEditor}
            savedNote={savedNote}
            noteEditing={noteEditing}
            textareaRef={textareaRef}
            saveNote={saveNote}
            setNoteDraft={setNoteDraft}
            noteDraft={noteDraft}
          />
          <ReviewAppointmentTable />
        </>
      )}

      {currentStep === "payment" && (
        <PaymentTab onBack={() => setCurrentStep("review")} />
      )}
    </div>
  );
}
