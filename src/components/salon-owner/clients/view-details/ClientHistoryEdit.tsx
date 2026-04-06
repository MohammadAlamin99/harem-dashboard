"use client";

import { useState, useMemo, useRef } from "react";
import PaginationClient from "../PaginationClient";
import { EditHistoryRow } from "@/@types/salon-owner/EditHistoryRow.type";
type ActionType = "Update" | "Creation" | "Deletion" | string;

export interface HistoryOfEditProps {
  title?: string;
  rows?: EditHistoryRow[];
  defaultItemsPerPage?: number;
  itemsPerPageOptions?: number[];
  className?: string;
}

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

const COLS: { key: string; label: string; width: string }[] = [
  { key: "dateTime", label: "Date / Time", width: "w-[170px]" },
  { key: "fieldChanged", label: "Field Changed", width: "w-[150px]" },
  { key: "previousValue", label: "Previous Value", width: "flex-1" },
  { key: "newValue", label: "New Value", width: "flex-1" },
  { key: "editedBy", label: "Edited By", width: "w-[180px]" },
  { key: "action", label: "Action", width: "w-[160px]" },
];

const B = "border-[#D1D9E0]";

export default function ClientHistoryOfEdit({
  title = "History of edit",
  rows = DEFAULT_ROWS,
  defaultItemsPerPage = 5,
  itemsPerPageOptions = [5, 10, 20],
  className = "",
}: HistoryOfEditProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultItemsPerPage);
  const ippRef = useRef<HTMLDivElement | null>(null);
  const [ippOpen, setIppOpen] = useState(false);
  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const start = (page - 1) * perPage;

  const visibleRows = useMemo(() => {
    const start = (page - 1) * perPage;
    return rows.slice(start, start + perPage);
  }, [rows, page, perPage]);

  return (
    <div
      className={[
        "font-manrope w-full bg-white rounded-xl border border-[#E8EBF0] p-[15px] lg:p-[30px]",
        className,
      ].join(" ")}
    >
      {/* Title */}
      <h2 className="text-[22px] font-semibold text-[#29343D] mb-5 tracking-tight font-manrope">
        {title}
      </h2>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <div
          className={`w-full border ${B} rounded-[12px_12px_0_0] overflow-hidden min-w-[1200px]`}
        >
          {/* Header */}
          <div className={`flex bg-[#F3F3FF] border-b ${B}`}>
            {COLS.map((col, idx) => (
              <div
                key={col.key}
                className={[
                  col.width,
                  "px-[14px] py-[30px] text-[16px] font-bold text-[#29343D] font-manrope",
                  idx !== 0 ? `border-l ${B}` : "",
                ].join(" ")}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {visibleRows.map((row, i) => (
            <div
              key={row.id}
              className={[
                "flex",
                i < visibleRows.length - 1 ? `border-b ${B}` : "",
              ].join(" ")}
            >
              <div className="w-[170px] px-[14px] py-[30px] text-sm text-[#29343D] font-normal font-manrope">
                {row.dateTime}
              </div>
              <div
                className={`w-[150px] px-[14px] py-[30px] text-sm text-[#29343D] font-manrope border-l border-[#E0E6EB]`}
              >
                {row.fieldChanged}
              </div>
              <div
                className={`flex-1 px-[14px] py-[30px] text-sm text-[#29343D] font-manrope truncate border-l border-[#E0E6EB]`}
              >
                {row.previousValue}
              </div>
              <div
                className={`flex-1 px-[14px] py-[30px] text-sm text-[#29343D] font-manrope truncate border-l border-[#E0E6EB]`}
              >
                {row.newValue}
              </div>
              <div
                className={`w-[180px] px-[14px] py-[30px] text-sm text-[#29343D] font-manrope border-l border-[#E0E6EB]`}
              >
                {row.editedBy}
              </div>
              <div
                className={`w-[160px] px-[14px] py-[30px] flex justify-start border-l border-[#E0E6EB]`}
              >
                <ActionBadge action={row.action} />
              </div>
            </div>
          ))}

        </div>
        {/* Pagination */}
        <div className="w-full min-w-[1200px]">
          <PaginationClient
            ippRef={ippRef}
            setIppOpen={setIppOpen}
            itemsPerPage={perPage}
            ippOpen={ippOpen}
            ITEMS_PER_PAGE_OPTIONS={itemsPerPageOptions}
            setItemsPerPage={(n) => {
              setPerPage(n);
              setPage(1);
            }}
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={totalPages}
            start={start}
            filtered={rows}
            margin={false}
          />
        </div>
      </div>


    </div>
  );
}
