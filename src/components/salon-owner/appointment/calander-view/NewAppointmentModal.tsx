import { useState } from "react";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import {
  X,
  Notebook,
  Ticket,
  UserPlus,
  Search,
  ChevronDown,
  Clock,
  Check,
  Calendar,
} from "lucide-react";

const DUMMY_CLIENTS = [
  {
    id: "1",
    name: "Sofia Rossi",
    notes: "Allergic to certain dyes. Prefers cold water during hair wash.",
    giftCards: 1,
    giftCardDetails: {
      dateOfIssue: "02/09/2025",
      dateOfExpiration: "06/20/2026",
      amount: "€50",
      usageLimit: "1",
      eligibleServices: ["Haircut", "Blowdry"],
      receiverName: "Sofia Rossi",
      gifterName: "Marco Rossi",
      personalMessage: "Happy birthday my love!",
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    notes: "Prefers quiet appointments.",
    giftCards: 0,
    giftCardDetails: null,
  },
];

const DUMMY_SERVICES = [
  { id: "s1", name: "Haircut", duration: "30m", price: "€30" },
  { id: "s2", name: "Blowdry", duration: "30m", price: "€25" },
  { id: "s3", name: "Coloring", duration: "90m", price: "€80" },
  { id: "s4", name: "Haircut & Blowdry", duration: "60m", price: "€50" },
  { id: "s5", name: "Highlights", duration: "100m", price: "€120" },
];

function calcDuration(start: string, end: string): string {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const diff = toMin(end) - toMin(start);
  if (diff <= 0) return "—";
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ""}` : `${m}m`;
}

const statusOptions: AppStatus[] = ["Booked", "Confirmed"];

export default function NewAppointmentModal({
  memberId,
  startTime,
  endTime,
  date,
  teamMembers,
  onClose,
  onConfirm,
}: {
  memberId: string;
  startTime: string;
  endTime: string;
  date: Date;
  teamMembers: { id: string; name: string; avatar: string }[];
  onClose: () => void;
  onConfirm: (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">,
  ) => void;
}) {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [bookingOrder, setBookingOrder] = useState<
    Array<{ serviceId: string; employeeId: string }>
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<AppStatus>("Booked");

  const [showGiftDetails, setShowGiftDetails] = useState(false);
  const [showNoteDetails, setShowNoteDetails] = useState(false);

  const selectedClient = DUMMY_CLIENTS.find((c) => c.id === selectedClientId);

  // --- Total Duration Logic ---
  const totalDurationMins = selectedServiceIds.reduce((acc, id) => {
    const srv = DUMMY_SERVICES.find((s) => s.id === id);
    if (!srv) return acc;
    const mins = parseInt(srv.duration.replace("m", "")) || 0;
    return acc + mins;
  }, 0);

  const formattedTotalDuration =
    totalDurationMins > 0
      ? `${Math.floor(totalDurationMins / 60)}h ${totalDurationMins % 60}min`
      : "0 min";

  const handleServiceToggle = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds((prev) => prev.filter((sid) => sid !== id));
      setBookingOrder((prev) => prev.filter((item) => item.serviceId !== id));
    } else {
      setSelectedServiceIds((prev) => [...prev, id]);
      setBookingOrder((prev) => [
        ...prev,
        { serviceId: id, employeeId: memberId },
      ]);
    }
  };

  const updateServiceEmployee = (serviceId: string, empId: string) => {
    setBookingOrder((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId ? { ...item, employeeId: empId } : item,
      ),
    );
  };

  const isValid =
    (selectedClientId || (isAddingNewClient && newClientName)) &&
    selectedServiceIds.length > 0;

  const handleConfirm = () => {
    if (!isValid) return;
    const clientName = isAddingNewClient
      ? newClientName
      : selectedClient?.name || "";
    const mainService = DUMMY_SERVICES.find(
      (s) => s.id === bookingOrder[0]?.serviceId,
    );
    const mainEmployee = teamMembers.find(
      (m) => m.id === bookingOrder[0]?.employeeId,
    );

    onConfirm({
      clientName,
      service: mainService?.name || "",
      employeeId: mainEmployee?.id || memberId,
      employeeName: mainEmployee?.name || "",
      status: selectedStatus,
      duration: formattedTotalDuration,
      price: mainService?.price || "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#29343D]/60 backdrop-blur-sm p-4 font-manrope"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[12px] shadow-2xl w-full max-w-[620px] max-h-[92vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex-none px-8 py-6 flex items-start justify-between border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-[#29343D]">
              New Appointment
            </h2>
            <div className="flex items-center gap-2 mt-1 text-[14px] text-[#999]">
              <Calendar size={14} />
              <span>
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            <X size={24} color="#29343D" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Client Selection */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[13px] font-semibold text-[#999]">
                Client Name *
              </label>
              <button
                onClick={() => setIsAddingNewClient(!isAddingNewClient)}
                className="text-[13px] font-bold text-[#635BFF]"
              >
                {isAddingNewClient ? "Select existing" : "Add new client"}
              </button>
            </div>

            {!isAddingNewClient ? (
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                  size={18}
                />
                <select
                  value={selectedClientId}
                  onChange={(e) => {
                    setSelectedClientId(e.target.value);
                    setShowGiftDetails(false);
                  }}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] outline-none appearance-none cursor-pointer"
                >
                  <option value="">Search or select client...</option>
                  {DUMMY_CLIENTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                  size={18}
                />
              </div>
            ) : (
              <div className="relative">
                <UserPlus
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635BFF]"
                  size={18}
                />
                <input
                  autoFocus
                  placeholder="Enter full name..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                />
              </div>
            )}

            {selectedClient && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowNoteDetails(!showNoteDetails);
                    setShowGiftDetails(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-[4px] text-[13px] font-bold transition-all ${showNoteDetails ? "bg-[#635BFF]/5 border-[#635BFF] text-[#635BFF]" : "bg-white border-slate-200 text-[#29343D]"}`}
                >
                  <Notebook size={16} /> Client Notes
                </button>
                <button
                  onClick={() => {
                    setShowGiftDetails(!showGiftDetails);
                    setShowNoteDetails(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-[4px] text-[13px] font-bold transition-all ${showGiftDetails ? "bg-[#635BFF]/5 border-[#635BFF] text-[#635BFF]" : "bg-white border-slate-200 text-[#29343D]"}`}
                >
                  <Ticket size={16} /> Gift Card{" "}
                  {selectedClient.giftCards > 0 &&
                    `(${selectedClient.giftCards})`}
                </button>
              </div>
            )}

            {/* Redesigned White Gift View */}
            {showGiftDetails && selectedClient?.giftCardDetails && (
              <div className="mt-4 bg-white rounded-[12px] border border-slate-200 overflow-hidden shadow-sm animate-in slide-in-from-top-2">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-[13px] font-bold text-[#29343D]">
                    Gift Card Details
                  </span>
                  <button
                    onClick={() => setShowGiftDetails(false)}
                    className="text-[#999] hover:text-[#29343D]"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6 grid grid-cols-2 gap-y-5">
                  <div>
                    <p className="text-[11px] text-[#999] font-medium mb-0.5">
                      Balance
                    </p>
                    <p className="text-[20px] font-bold text-[#635BFF]">
                      {selectedClient.giftCardDetails.amount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#999] font-medium mb-0.5">
                      Expires
                    </p>
                    <p className="text-[14px] font-bold text-[#29343D]">
                      {selectedClient.giftCardDetails.dateOfExpiration}
                    </p>
                  </div>
                  <div className="col-span-2 border-t border-slate-50 pt-4">
                    <p className="text-[11px] text-[#999] font-medium mb-2 italic">
                      Personal Message
                    </p>
                    <p className="text-[13px] text-[#29343D] italic bg-slate-50 p-3 rounded-[4px]">
                      {selectedClient.giftCardDetails.personalMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Services */}
          <section>
            <label className="text-[13px] font-semibold text-[#999] mb-3 block">
              Services *
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) handleServiceToggle(e.target.value);
                  e.target.value = "";
                }}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-[4px] text-[15px] text-[#29343D] focus:border-[#635BFF] outline-none appearance-none cursor-pointer"
              >
                <option value="">+ Add a service...</option>
                {DUMMY_SERVICES.map((s) => (
                  <option
                    key={s.id}
                    value={s.id}
                    disabled={selectedServiceIds.includes(s.id)}
                  >
                    {s.name} ({s.duration})
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none"
                size={18}
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedServiceIds.map((id) => {
                const srv = DUMMY_SERVICES.find((s) => s.id === id);
                return (
                  <div
                    key={id}
                    className="flex items-center gap-2 bg-[#635BFF]/10 text-[#635BFF] px-3 py-1.5 rounded-[4px] text-[13px] font-bold"
                  >
                    {srv?.name} {srv?.duration}
                    <button
                      onClick={() => handleServiceToggle(id)}
                      className="cursor-pointer hover:text-[#29343D]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Booking Summary & Timeline */}
          {selectedServiceIds.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <label className="text-[13px] font-semibold text-[#999]">
                  Booking Order
                </label>
                <p className="text-[13px] font-bold text-[#29343D]">
                  Total duration:{" "}
                  <span className="text-[#635BFF]">
                    {formattedTotalDuration}
                  </span>
                </p>
              </div>

              <div className="bg-slate-50/50 p-6 rounded-[12px] border border-slate-100 relative">
                <div className="flex items-start justify-between relative px-4">
                  {bookingOrder.length > 1 && (
                    <div className="absolute top-[18px] left-[60px] right-[60px] h-[2px] bg-slate-200 z-0" />
                  )}
                  {bookingOrder.map((item, index) => {
                    const srv = DUMMY_SERVICES.find(
                      (s) => s.id === item.serviceId,
                    );
                    return (
                      <div
                        key={item.serviceId}
                        className="flex flex-col items-center text-center relative z-10 w-1/3"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#29343D] text-white flex items-center justify-center text-[14px] font-bold mb-3 border-4 border-white shadow-sm">
                          {index + 1}
                        </div>
                        <p className="text-[12px] font-bold text-[#29343D] leading-tight mb-2 truncate w-full px-1">
                          {srv?.name}
                        </p>
                        <select
                          value={item.employeeId}
                          onChange={(e) =>
                            updateServiceEmployee(
                              item.serviceId,
                              e.target.value,
                            )
                          }
                          className="text-[11px] font-bold text-[#999] bg-white border border-slate-200 rounded-[4px] px-2 py-1 outline-none cursor-pointer max-w-[100px]"
                        >
                          {teamMembers.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Status Selection */}
          <section className="pb-4">
            <label className="text-[13px] font-semibold text-[#999] mb-3 block">
              Status
            </label>
            <div className="flex gap-4">
              {statusOptions.map((status) => {
                const isSelected = selectedStatus === status;
                const color = status === "Booked" ? "#635BFF" : "#10B981";
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`flex-1 flex items-center gap-3 p-3 rounded-[4px] border text-[14px] font-bold transition-all ${isSelected ? `border-[${color}] bg-slate-50` : "border-slate-200 text-[#999]"}`}
                    style={{
                      borderColor: isSelected ? color : undefined,
                      color: isSelected ? "#29343D" : undefined,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {status}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Fixed Footer */}
        <div className="flex-none p-8 border-t border-slate-100 flex gap-4 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-[12px] text-[15px] font-bold bg-[#F8FAFC] text-[#29343D] hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="flex-[2] py-4 rounded-[12px] bg-[#635BFF] text-white text-[15px] font-bold hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-[#635BFF]/20 cursor-pointer"
          >
            Create Appointment
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
