import { useState } from "react";
import { AppStatus, CalAppointment } from "@/@types/salon-owner/CalAppointment.type";
import { X } from "lucide-react";

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

const statusOptions: AppStatus[] = ["Booked", "Confirmed", "Arrived", "Started", "Completed", "Canceled"];

const statusColorMap: Record<AppStatus, { bg: string; dot: string }> = {
    Booked: { bg: "bg-[#F3F0FF]", dot: "bg-[#635BFF]" },
    Confirmed: { bg: "bg-[#E6FFFE]", dot: "bg-[#16CDC7]" },
    Arrived: { bg: "bg-[#FFFBEA]", dot: "bg-[#E6B800]" },
    Started: { bg: "bg-[#FFF0F3]", dot: "bg-[#FF6692]" },
    Completed: { bg: "bg-[#EDFBF3]", dot: "bg-[#36C76C]" },
    Canceled: { bg: "bg-[#FFF0F3]", dot: "bg-[#FF6692]" },
};

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
        data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">
    ) => void;
}) {
    const [clientName, setClientName] = useState("");
    const [service, setService] = useState("");
    const [selectedMemberId, setSelectedMemberId] = useState(memberId);
    const [selectedStatus, setSelectedStatus] = useState<AppStatus>("Booked");

    const selectedMember = teamMembers.find((m) => m.id === selectedMemberId);
    const isValid = clientName.trim().length > 0 && service.trim().length > 0;

    const handleConfirm = () => {
        if (!isValid) return;
        onConfirm({
            clientName: clientName.trim(),
            service: service.trim(),
            employeeId: selectedMemberId,
            employeeName: selectedMember?.name ?? "",
            status: selectedStatus,
            duration: calcDuration(startTime, endTime),
            price: "",
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && isValid) handleConfirm();
        if (e.key === "Escape") onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
            onKeyDown={handleKeyDown}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-[446px] p-6 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-bold font-manrope text-[#29343D]">
                            New Appointment
                        </h2>
                        <p className="text-[11px] font-manrope text-[#98A4AE] mt-0.5">
                            {date.toLocaleDateString("en-GB", {
                                weekday: "long",
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full hover:text-[#29343D] transition-all text-lg leading-none font-light"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Time badge */}
                {/* <div className="flex items-center gap-3 bg-[#F3F3FF] rounded-xl px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-[#7B7BFF]/15 flex items-center justify-center shrink-0">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#7B7BFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold font-manrope text-[#7B7BFF]">
                            {startTime} – {endTime}
                        </p>
                        <p className="text-[11px] font-manrope text-[#98A4AE]">
                            Duration: {calcDuration(startTime, endTime)}
                        </p>
                    </div>
                </div> */}

                {/* Client name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold font-manrope text-[#29343D] uppercase tracking-wide">
                        Client Name *
                    </label>
                    <input
                        autoFocus
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Sarah Johnson"
                        className="border border-[#E0E6EB] rounded-[4px] px-3.5 py-2.5 text-sm font-manrope text-[#29343D] focus:outline-none focus:border-[#7B7BFF] focus:ring-2 focus:ring-[#7B7BFF]/10 transition-all placeholder:text-[#C5CDD4]"
                    />
                </div>

                {/* Service */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold font-manrope text-[#29343D] uppercase tracking-wide">
                        Service *
                    </label>
                    <input
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="e.g. Haircut & Blowdry"
                        className="border border-[#E0E6EB] rounded-[4px] px-3.5 py-2.5 text-sm font-manrope text-[#29343D] focus:outline-none focus:border-[#7B7BFF] focus:ring-2 focus:ring-[#7B7BFF]/10 transition-all placeholder:text-[#C5CDD4]"
                    />
                </div>

                {/* Employee picker */}
                {/* <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-semibold font-manrope text-[#98A4AE] uppercase tracking-wide">
                        Assigned To
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {teamMembers.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setSelectedMemberId(m.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-manrope font-semibold transition-all ${selectedMemberId === m.id
                                    ? "border-[#7B7BFF] bg-[#F3F3FF] text-[#7B7BFF] shadow-sm"
                                    : "border-[#E0E6EB] text-[#29343D] hover:border-[#7B7BFF] hover:bg-[#F9F9FF]"
                                    }`}
                            >
                                <Image
                                    src={m.avatar}
                                    alt={m.name}
                                    width={20}
                                    height={20}
                                    className="rounded-full object-cover"
                                />
                                {m.name}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* Status/Color selector */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-semibold font-manrope text-[#98A4AE] uppercase tracking-wide">
                        Status
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {statusOptions.map((status) => {
                            const colors = statusColorMap[status];
                            return (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-[4px] border text-xs font-manrope font-semibold transition-all ${selectedStatus === status
                                        ? `${colors.bg} border-[#7B7BFF] shadow-sm`
                                        : "border-[#E0E6EB] bg-white hover:border-[#7B7BFF]"
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                    {status}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#F0F0F0] -mx-6" />

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-lg cursor-pointer bg-[#F6F7F9] text-sm font-manrope font-semibold text-[#29343D] hover:bg-[#F8F9FA] hover:border-[#C5CDD4] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!isValid}
                        className="flex-1 py-2.5 rounded-lg bg-[#635BFF] text-white text-sm font-manrope font-semibold hover:bg-[#6B6BEF] active:bg-[#5B5BDF] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                        Create Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}
