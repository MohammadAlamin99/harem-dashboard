"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  RotateCcw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = "Cash" | "Credit Card" | "Gift Card";
type Status = "Pending" | "Refunded" | "Paid";

interface Receipt {
  id: string;
  avatar: string;
  teamMember: string;
  service: string;
  scheduledDate: string;
  price: string;
  paymentMethod: PaymentMethod;
  status: Status;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const receipts: Receipt[] = [
  {
    id: "#000",
    avatar: "/images/avator.png",
    teamMember: "Maria Rodriguez",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    paymentMethod: "Cash",
    status: "Pending",
  },
  {
    id: "#000",
    avatar: "/images/avator.png",
    teamMember: "Maria Rodriguez",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    paymentMethod: "Cash",
    status: "Refunded",
  },
  {
    id: "#000",
    avatar: "/images/avator.png",
    teamMember: "Maria Rodriguez",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    paymentMethod: "Gift Card",
    status: "Refunded",
  },
  {
    id: "#000",
    avatar: "/images/avator.png",
    teamMember: "Maria Rodriguez",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    paymentMethod: "Credit Card",
    status: "Paid",
  },
  {
    id: "#000",
    avatar: "/images/avator.png",
    teamMember: "Maria Rodriguez",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    paymentMethod: "Credit Card",
    status: "Pending",
  },
];

// ─── Style Maps ───────────────────────────────────────────────────────────────

const statusStyles: Record<Status, string> = {
  Pending: "bg-[#FFF9E5] text-[#FFD648]",
  Refunded: "bg-[#FFEBF1] text-[#FF6692]",
  Paid: "bg-[#E8F8EF] text-[#36C76C]",
};

const paymentStyles: Record<PaymentMethod, string> = {
  Cash: "border border-[#16CDC7] text-[#16CDC7]",
  "Credit Card": "border border-[#635BFF] text-[#635BFF]",
  "Gift Card": "text-[#29343D]",
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReceiptsList() {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [showPerPageDrop, setShowPerPageDrop] = useState<boolean>(false);

  const totalItems = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const rangeStart = (page - 1) * itemsPerPage + 1;
  const rangeEnd = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="bg-white rounded-2xl border border-[#E0E6EB] p-[15px] md:p-[30px] font-manrope">
      {/* Title */}
      <h2 className="text-[#29343D] font-semibold text-lg font-manrope mb-5">
        Receipts list
      </h2>

      {/* ── Table ── */}
      <div className="overflow-x-auto border border-[#E0E6EB] rounded-xl">
        <table className="w-full text-sm font-manrope">
          <thead>
            <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
              {[
                "ID",
                "Team Member",
                "Service",
                "Scheduled Date",
                "Price",
                "Payment Method",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left text-[#29343D] font-semibold py-7 px-[14px] whitespace-nowrap border-l border-[#E0E6EB] first:border-l-0"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {receipts.map((r, i) => (
              <tr
                key={i}
                className="border-b border-[#F4F6FA] hover:bg-[#FAFBFF] transition-colors"
              >
                {/* ID */}
                <td className="py-7 px-[14px] text-[#635BFF] font-medium border-l border-[#E0E6EB] first:border-l-0">
                  {r.id}
                </td>

                {/* Team Member */}
                <td className="py-7 px-[14px] border-l border-[#E0E6EB]">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={r.avatar}
                      alt={r.teamMember}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <span className="text-[#29343D] font-medium whitespace-nowrap">
                      {r.teamMember}
                    </span>
                  </div>
                </td>

                {/* Service */}
                <td className="py-4 px-3 text-[#29343D] border-l border-[#E0E6EB]">
                  {r.service}
                </td>

                {/* Scheduled Date */}
                <td className="py-7 px-[14px] text-[#526B7A] whitespace-nowrap border-l border-[#E0E6EB]">
                  {r.scheduledDate}
                </td>

                {/* Price */}
                <td className="py-7 px-[14px] text-[#29343D] font-medium border-l border-[#E0E6EB]">
                  {r.price}
                </td>

                {/* Payment Method */}
                <td className="py-7 px-[14px] border-l border-[#E0E6EB]">
                  {r.paymentMethod === "Gift Card" ? (
                    <span className="text-[#29343D] text-sm">
                      {r.paymentMethod}
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${paymentStyles[r.paymentMethod]}`}
                    >
                      {r.paymentMethod}
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="py-4 px-3 border-l border-[#E0E6EB]">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-3 border-l border-[#E0E6EB]">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-[#EBEAFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#F4F6FA] flex items-center justify-center text-[#526B7A] hover:bg-[#E0E6EB] transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-end gap-4 mt-5">
        {/* Items per page */}
        <div className="flex items-center gap-2 text-sm text-[#526B7A]">
          <span className="whitespace-nowrap">Items per page:</span>
          <div className="relative">
            <button
              onClick={() => setShowPerPageDrop((p) => !p)}
              className="flex items-center gap-1 border border-[#E0E6EB] rounded-lg px-2.5 py-1 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
            >
              {itemsPerPage}
              <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
            </button>
            {showPerPageDrop && (
              <div className="absolute bottom-full mb-1 right-0 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[60px]">
                {ITEMS_PER_PAGE_OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setItemsPerPage(o);
                      setPage(1);
                      setShowPerPageDrop(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-[#F4F6FA] transition-colors
                      ${itemsPerPage === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Range label */}
        <span className="text-sm text-[#526B7A]">
          {rangeStart}-{rangeEnd} of {totalItems}
        </span>

        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#526B7A] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors"
          >
            <ChevronFirst className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#526B7A] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#526B7A] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#526B7A] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors"
          >
            <ChevronLast className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
