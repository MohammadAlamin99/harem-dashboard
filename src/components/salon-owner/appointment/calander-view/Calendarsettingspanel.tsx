"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Clock, CalendarDays, ChevronDown, ChevronUp, X } from "lucide-react";

interface CalendarSettingsPanelProps {
    startHour: number;
    endHour: number;
    slotDuration: number;
    slotHeight: number;
    onStartHourChange: (h: number) => void;
    onEndHourChange: (h: number) => void;
    onSlotDurationChange: (min: number) => void;
    onSlotHeightChange: (px: number) => void;
}

const SLOT_DURATION_OPTIONS = [5, 10, 15, 30, 60];

function formatHour(h: number) {
    if (h === 0) return "00:00";
    if (h < 10) return `0${h}:00`;
    return `${h}:00`;
}

const valueBoxStyle: React.CSSProperties = {
    flex: 1,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E0E6EB",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    color: "#29343D",
    background: "white",
};

const sectionLabelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    color: "#98A4AE",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8,
};

function StepButton({
    children,
    onClick,
    disabled,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E0E6EB",
                borderRadius: 8,
                background: "white",
                color: "#29343D",
                fontSize: 18,
                fontWeight: 700,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1,
                flexShrink: 0,
            }}
            onMouseEnter={(e) => {
                if (!disabled)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#F4F6FA";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "white";
            }}
        >
            {children}
        </button>
    );
}

export default function CalendarSettingsPanel({
    startHour,
    endHour,
    slotDuration,
    slotHeight,
    onStartHourChange,
    onEndHourChange,
    onSlotDurationChange,
    onSlotHeightChange,
}: CalendarSettingsPanelProps) {
    const [open, setOpen] = useState(false);
    const [timeRangeOpen, setTimeRangeOpen] = useState(false);
    const [slotOpen, setSlotOpen] = useState(false);
    const [panelStyle, setPanelStyle] = useState<{ top: number; right: number }>({
        top: 0,
        right: 0,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Recalculate panel position whenever it opens, page scrolls, or window resizes
    useEffect(() => {
        if (!open || !buttonRef.current) return;

        const updatePosition = () => {
            if (!buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            setPanelStyle({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
            });
        };

        updatePosition(); // set immediately on open

        window.addEventListener("scroll", updatePosition, true); // true = capture all scroll events
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const visibleHours = endHour - startHour;

    // Slider: value 1–10 maps to px 40–120
    const sliderValue = Math.round(((slotHeight - 40) / 80) * 9) + 1;
    const handleSliderChange = (val: number) => {
        const px = Math.round(40 + ((val - 1) / 9) * 80);
        onSlotHeightChange(px);
    };

    const previewRowHeight = Math.max(24, (slotHeight / 60) * slotDuration);

    const panel = (
        <div
            ref={panelRef}
            style={{
                position: "fixed",
                top: panelStyle.top,
                right: panelStyle.right,
                zIndex: 9999,
                width: 340,
                backgroundColor: "white",
                border: "1px solid #E0E6EB",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                maxHeight: "calc(100vh - 80px)",
                overflowY: "auto",
                fontFamily: "var(--font-manrope, sans-serif)",
            }}
        >
            {/* Sticky header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderBottom: "1px solid #E0E6EB",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                }}
            >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#29343D", margin: 0 }}>
                    Calendar settings
                </h3>
                <button
                    onClick={() => setOpen(false)}
                    style={{
                        padding: 4,
                        borderRadius: "50%",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#98A4AE",
                        display: "flex",
                        alignItems: "center",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "#F4F6FA")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                    }
                >
                    <X size={16} />
                </button>
            </div>

            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>

                {/* ── Section 1: Visible time range ─────────────────────────────── */}
                <div style={{ border: "1px solid #E0E6EB", borderRadius: 10, overflow: "hidden" }}>
                    <button
                        onClick={() => setTimeRangeOpen((p) => !p)}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            background: "#F8FAFC",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor = "#F0F2F5")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor = "#F8FAFC")
                        }
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#29343D" }}>
                            <Clock size={14} color="#635BFF" />
                            Visible time range
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#526B7A", background: "white", border: "1px solid #E0E6EB", padding: "2px 8px", borderRadius: 6 }}>
                                {formatHour(startHour)} – {formatHour(endHour)}
                            </span>
                            {timeRangeOpen ? <ChevronUp size={14} color="#98A4AE" /> : <ChevronDown size={14} color="#98A4AE" />}
                        </span>
                    </button>

                    {timeRangeOpen && (
                        <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>

                            {/* Start time */}
                            <div>
                                <p style={sectionLabelStyle}>Start time</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <StepButton onClick={() => onStartHourChange(Math.max(0, startHour - 1))}>–</StepButton>
                                    <div style={valueBoxStyle}>{formatHour(startHour)}</div>
                                    <StepButton onClick={() => onStartHourChange(Math.min(endHour - 1, startHour + 1))}>+</StepButton>
                                </div>
                            </div>

                            {/* End time */}
                            <div>
                                <p style={sectionLabelStyle}>End time</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <StepButton onClick={() => onEndHourChange(Math.max(startHour + 1, endHour - 1))}>–</StepButton>
                                    <div style={valueBoxStyle}>{formatHour(endHour)}</div>
                                    <StepButton onClick={() => onEndHourChange(Math.min(24, endHour + 1))}>+</StepButton>
                                </div>
                            </div>

                            {/* Summary */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F8FAFC", border: "1px solid #E0E6EB", borderRadius: 8, padding: "8px 12px" }}>
                                <Clock size={13} color="#98A4AE" />
                                <span style={{ fontSize: 12, color: "#526B7A", fontWeight: 600 }}>
                                    {visibleHours}h visible · {formatHour(startHour)} to {formatHour(endHour)}
                                </span>
                            </div>

                            {/* Mini preview */}
                            <div>
                                <p style={sectionLabelStyle}>Preview</p>
                                <div style={{ border: "1px solid #E0E6EB", borderRadius: 8, overflow: "hidden" }}>
                                    <div style={{ background: "#F3F3FF", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#29343D", borderBottom: "1px solid #E0E6EB" }}>
                                        Mon
                                    </div>
                                    <div style={{ position: "relative", height: 80, background: "white" }}>
                                        {Array.from({ length: Math.min(visibleHours, 4) }).map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    position: "absolute",
                                                    left: 0, right: 0,
                                                    top: `${(i / Math.min(visibleHours, 4)) * 80}px`,
                                                    height: `${80 / Math.min(visibleHours, 4)}px`,
                                                    display: "flex",
                                                }}
                                            >
                                                <div style={{ width: 40, fontSize: 9, color: "#98A4AE", fontWeight: 600, borderRight: "1px solid #E0E6EB", borderBottom: "1px solid #E0E6EB", paddingLeft: 4, paddingTop: 2, flexShrink: 0 }}>
                                                    {formatHour(startHour + i)}
                                                </div>
                                                <div style={{ flex: 1, borderBottom: "1px solid #E0E6EB", position: "relative" }}>
                                                    {i === 1 && (
                                                        <div style={{ position: "absolute", inset: "2px 4px", background: "#EEF2FF", borderLeft: "2px solid #635BFF", borderRadius: "0 3px 3px 0", display: "flex", alignItems: "center", paddingLeft: 6 }}>
                                                            <span style={{ fontSize: 9, fontWeight: 700, color: "#635BFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                                Team meeting
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* ── Section 2: Slot duration & height ─────────────────────────── */}
                <div style={{ border: "1px solid #E0E6EB", borderRadius: 10, overflow: "hidden" }}>
                    <button
                        onClick={() => setSlotOpen((p) => !p)}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            background: "#F8FAFC",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor = "#F0F2F5")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor = "#F8FAFC")
                        }
                    >
                        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#29343D" }}>
                            <CalendarDays size={14} color="#635BFF" />
                            Slot duration & height
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#526B7A", background: "white", border: "1px solid #E0E6EB", padding: "2px 8px", borderRadius: 6 }}>
                                {slotDuration} min
                            </span>
                            {slotOpen ? <ChevronUp size={14} color="#98A4AE" /> : <ChevronDown size={14} color="#98A4AE" />}
                        </span>
                    </button>

                    {slotOpen && (
                        <div style={{ padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>

                            {/* Duration stepper */}
                            <div>
                                <p style={sectionLabelStyle}>Slot duration</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <StepButton
                                        onClick={() => {
                                            const idx = SLOT_DURATION_OPTIONS.indexOf(slotDuration);
                                            if (idx > 0) onSlotDurationChange(SLOT_DURATION_OPTIONS[idx - 1]);
                                        }}
                                        disabled={SLOT_DURATION_OPTIONS.indexOf(slotDuration) === 0}
                                    >–</StepButton>
                                    <div style={valueBoxStyle}>{slotDuration} min</div>
                                    <StepButton
                                        onClick={() => {
                                            const idx = SLOT_DURATION_OPTIONS.indexOf(slotDuration);
                                            if (idx < SLOT_DURATION_OPTIONS.length - 1)
                                                onSlotDurationChange(SLOT_DURATION_OPTIONS[idx + 1]);
                                        }}
                                        disabled={SLOT_DURATION_OPTIONS.indexOf(slotDuration) === SLOT_DURATION_OPTIONS.length - 1}
                                    >+</StepButton>
                                </div>
                            </div>

                            {/* Height slider */}
                            <div>
                                <p style={sectionLabelStyle}>Slot height in calendar view</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <input
                                        type="range"
                                        min={1} max={10} step={1}
                                        value={sliderValue}
                                        onChange={(e) => handleSliderChange(Number(e.target.value))}
                                        style={{
                                            flex: 1,
                                            height: 6,
                                            borderRadius: 999,
                                            appearance: "none" as const,
                                            cursor: "pointer",
                                            accentColor: "#635BFF",
                                            background: `linear-gradient(to right, #635BFF 0%, #635BFF ${((sliderValue - 1) / 9) * 100}%, #E0E6EB ${((sliderValue - 1) / 9) * 100}%, #E0E6EB 100%)`,
                                        }}
                                    />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#29343D", minWidth: 16, textAlign: "right" }}>
                                        {sliderValue}
                                    </span>
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <p style={sectionLabelStyle}>Preview</p>
                                <div style={{ border: "1px solid #E0E6EB", borderRadius: 8, overflow: "hidden" }}>
                                    {[0, 1].map((rowIdx) => {
                                        const rowMinutes = rowIdx * slotDuration;
                                        const rowH = Math.floor(rowMinutes / 60);
                                        const rowM = rowMinutes % 60;
                                        const timeLabel = `${String(9 + rowH).padStart(2, "0")}:${String(rowM).padStart(2, "0")}`;
                                        return (
                                            <div
                                                key={rowIdx}
                                                style={{
                                                    display: "flex",
                                                    height: previewRowHeight,
                                                    borderBottom: rowIdx === 0 ? "1px solid #E0E6EB" : "none",
                                                }}
                                            >
                                                <div style={{ width: 40, fontSize: 9, color: "#98A4AE", fontWeight: 600, borderRight: "1px solid #E0E6EB", display: "flex", alignItems: "flex-start", paddingTop: 2, paddingLeft: 4, flexShrink: 0 }}>
                                                    {timeLabel}
                                                </div>
                                                <div style={{ flex: 1, position: "relative" }}>
                                                    {rowIdx === 0 && (
                                                        <div style={{ position: "absolute", top: 2, bottom: 2, left: 4, right: 4, background: "#EEF2FF", borderLeft: "2px solid #635BFF", borderRadius: "0 3px 3px 0", display: "flex", alignItems: "center", paddingLeft: 6 }}>
                                                            <span style={{ fontSize: 9, fontWeight: 700, color: "#635BFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                                Team meeting
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="font-manrope">
            {/* Trigger button */}
            <button
                ref={buttonRef}
                onClick={() => setOpen((p) => !p)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[8px] border text-[13px] font-semibold transition-colors cursor-pointer
          ${open
                        ? "bg-[#DDDBFF] border-[#635BFF] text-[#635BFF]"
                        : "bg-white border-[#E0E6EB] text-[#526B7A] hover:border-[#635BFF] hover:text-[#635BFF]"
                    }`}
            >
                <CalendarDays size={15} />
                Calendar settings
            </button>

            {/* Render via portal — directly into document.body so nothing clips it */}
            {open && typeof document !== "undefined"
                ? createPortal(panel, document.body)
                : null}
        </div>
    );
}