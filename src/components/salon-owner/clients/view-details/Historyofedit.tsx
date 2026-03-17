"use client";

import { useState, useMemo } from "react";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
type ActionType = "Update" | "Creation" | "Deletion" | string;

export interface EditHistoryRow {
  id: string;
  dateTime: string;
  fieldChanged: string;
  previousValue: string;
  newValue: string;
  editedBy: string;
  action: ActionType;
}

export interface HistoryOfEditProps {
  title?: string;
  rows?: EditHistoryRow[];
  defaultItemsPerPage?: number;
  itemsPerPageOptions?: number[];
  className?: string;
}

/* ══════════════════════════════════════════════════════════════
   ACTION BADGE
══════════════════════════════════════════════════════════════ */
const ACTION_STYLES: Record<string, string> = {
  Update: "bg-[#EBFAF0] text-[#36C76C] border border-[#36C76C]/20",
  Creation: "bg-[#EEEEF8] text-[#6366f1] border border-[#6366f1]/20",
  Deletion: "bg-[#FFF0F0] text-[#F87171] border border-[#F87171]/20",
};

const ActionBadge = ({ action }: { action: ActionType }) => (
  <span
    className={[
      "inline-flex items-center justify-center px-3 py-1 rounded-full text-[11.5px] font-semibold font-manrope whitespace-nowrap",
      ACTION_STYLES[action] ??
        "bg-gray-100 text-gray-500 border border-gray-200",
    ].join(" ")}
  >
    {action}
  </span>
);

/* ══════════════════════════════════════════════════════════════
   PAGINATION ICONS
══════════════════════════════════════════════════════════════ */
const FirstIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="11 17 6 12 11 7" />
    <line x1="6" y1="12" x2="6" y2="12" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
);
const PrevIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const NextIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const LastIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   CHEVRON DOWN (select arrow)
══════════════════════════════════════════════════════════════ */
const ChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════════════════════════════ */
const DEFAULT_ROWS: EditHistoryRow[] = [
  {
    id: "1",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Phone",
    previousValue: "+39 336 789 012",
    newValue: "+39 336 789 012",
    editedBy: "Virgie Sutton",
    action: "Update",
  },
  {
    id: "2",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Address",
    previousValue: "Independence Street 567",
    newValue: "Independence Street 567",
    editedBy: "Virgie Sutton",
    action: "Update",
  },
  {
    id: "3",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Email",
    previousValue: "anna@bellavista.com",
    newValue: "anna@gmail.com",
    editedBy: "Lola Ortega",
    action: "Update",
  },
  {
    id: "4",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Email",
    previousValue: "anna@gmail.com",
    newValue: "anna@bellavista.com",
    editedBy: "Lola Ortega",
    action: "Update",
  },
  {
    id: "5",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Profile Created",
    previousValue: "-",
    newValue: "-",
    editedBy: "Lois Gregory",
    action: "Creation",
  },
  {
    id: "6",
    dateTime: "4 Aug 2025 10:00 AM",
    fieldChanged: "Name",
    previousValue: "Anna",
    newValue: "Anna Maria",
    editedBy: "Lola Ortega",
    action: "Update",
  },
  {
    id: "7",
    dateTime: "4 Aug 2025 10:00 AM",
    fieldChanged: "Phone",
    previousValue: "+39 336 000 000",
    newValue: "+39 336 789 012",
    editedBy: "Virgie Sutton",
    action: "Update",
  },
  {
    id: "8",
    dateTime: "3 Aug 2025 08:30 AM",
    fieldChanged: "Address",
    previousValue: "Via Roma 1",
    newValue: "Independence Street 567",
    editedBy: "Lois Gregory",
    action: "Update",
  },
  {
    id: "9",
    dateTime: "3 Aug 2025 08:30 AM",
    fieldChanged: "Email",
    previousValue: "-",
    newValue: "anna@bellavista.com",
    editedBy: "Lois Gregory",
    action: "Creation",
  },
  {
    id: "10",
    dateTime: "2 Aug 2025 07:15 AM",
    fieldChanged: "Profile Deleted",
    previousValue: "Active",
    newValue: "-",
    editedBy: "Virgie Sutton",
    action: "Deletion",
  },
];

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function HistoryOfEdit({
  title = "History of edit",
  rows = DEFAULT_ROWS,
  defaultItemsPerPage = 5,
  itemsPerPageOptions = [5, 10, 20],
  className = "",
}: HistoryOfEditProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultItemsPerPage);

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));

  const visibleRows = useMemo(() => {
    const start = (page - 1) * perPage;
    return rows.slice(start, start + perPage);
  }, [rows, page, perPage]);

  const rangeLabel = `${(page - 1) * perPage + 1}-${Math.min(page * perPage, rows.length)} of ${rows.length}`;

  const handlePerPage = (v: number) => {
    setPerPage(v);
    setPage(1);
  };

  /* ── column config ── */
  const COLS = [
    { key: "dateTime", label: "Date / Time", width: "w-[170px]" },
    { key: "fieldChanged", label: "Field Changed", width: "w-[150px]" },
    { key: "previousValue", label: "Previous Value", width: "flex-1" },
    { key: "newValue", label: "New Value", width: "flex-1" },
    { key: "editedBy", label: "Edited By", width: "w-[160px]" },
    { key: "action", label: "Action", width: "w-[120px]" },
  ];

  return (
    <div
      className={[
        "font-manrope w-full bg-white rounded-2xl border border-[#E8EBF0] shadow-sm p-6",
        className,
      ].join(" ")}
    >
      {/* Title */}
      <h2 className="text-[22px] font-semibold text-[#29343D] mb-5 tracking-tight">
        {title}
      </h2>

      {/* Table wrapper */}
      <div className="w-full border border-[#E8EBF0] rounded-2xl overflow-hidden">
        {/* ── Header ── */}
        <div className="flex bg-[#F3F5FB] border-b border-[#E8EBF0]">
          {COLS.map((col) => (
            <div
              key={col.key}
              className={[
                col.width,
                "px-5 py-4 text-[13px] font-semibold text-[#29343D] font-manrope",
                col.key === "action" ? "text-right" : "",
              ].join(" ")}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* ── Rows ── */}
        {visibleRows.map((row, i) => (
          <div
            key={row.id}
            className={[
              "flex items-center",
              i < visibleRows.length - 1 ? "border-b border-[#F0F2F8]" : "",
            ].join(" ")}
          >
            {/* Date / Time */}
            <div className="w-[170px] px-5 py-5 text-[13px] text-[#29343D] font-manrope font-medium">
              {row.dateTime}
            </div>
            {/* Field Changed */}
            <div className="w-[150px] px-5 py-5 text-[13px] text-[#29343D] font-manrope">
              {row.fieldChanged}
            </div>
            {/* Previous Value */}
            <div className="flex-1 px-5 py-5 text-[13px] text-[#29343D] font-manrope truncate">
              {row.previousValue}
            </div>
            {/* New Value */}
            <div className="flex-1 px-5 py-5 text-[13px] text-[#29343D] font-manrope truncate">
              {row.newValue}
            </div>
            {/* Edited By */}
            <div className="w-[160px] px-5 py-5 text-[13px] text-[#29343D] font-manrope">
              {row.editedBy}
            </div>
            {/* Action */}
            <div className="w-[120px] px-5 py-5 flex justify-end">
              <ActionBadge action={row.action} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-end gap-4 mt-5">
        {/* Items per page */}
        <div className="flex items-center gap-2.5">
          <span className="text-[12.5px] text-[#98A4AE] font-manrope whitespace-nowrap">
            Items per page:
          </span>
          <div className="relative flex items-center">
            <select
              value={perPage}
              onChange={(e) => handlePerPage(Number(e.target.value))}
              className="appearance-none bg-white border border-[#E8EBF0] rounded-lg
                         text-[13px] font-semibold text-[#29343D] font-manrope
                         pl-3 pr-7 py-1.5 cursor-pointer focus:outline-none
                         hover:border-indigo-300 transition-colors"
            >
              {itemsPerPageOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="absolute right-2 pointer-events-none">
              <ChevronDown />
            </span>
          </div>
        </div>

        {/* Range label */}
        <span className="text-[12.5px] text-[#29343D] font-manrope font-medium whitespace-nowrap">
          {rangeLabel}
        </span>

        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          {[
            {
              icon: <FirstIcon />,
              action: () => setPage(1),
              disabled: page === 1,
            },
            {
              icon: <PrevIcon />,
              action: () => setPage((p) => p - 1),
              disabled: page === 1,
            },
            {
              icon: <NextIcon />,
              action: () => setPage((p) => p + 1),
              disabled: page === totalPages,
            },
            {
              icon: <LastIcon />,
              action: () => setPage(totalPages),
              disabled: page === totalPages,
            },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              disabled={btn.disabled}
              className={[
                "w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-150",
                btn.disabled
                  ? "text-[#C5CBD8] cursor-not-allowed"
                  : "text-[#29343D] hover:bg-[#EEEEF8] hover:text-indigo-600",
              ].join(" ")}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
