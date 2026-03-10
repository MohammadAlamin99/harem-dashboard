// "use client";
// import { ChevronDown, EllipsisVertical } from "lucide-react";
// import Image from "next/image";
// import PageHeader from "../../common-component/PageHeader";
// import CashIcon from "../../dashboard/checkout/CashIcon";
// import GiftCardIcon from "../../dashboard/checkout/GiftCardIcon";
// import CardIcon from "../../dashboard/checkout/CardIcon";
// import QRIcon from "../../dashboard/checkout/QRIcon";

// interface ServiceRow {
//   name: string;
//   price: number;
//   date?: string;
//   startTime?: string;
//   duration?: string;
//   employee?: string;
// }

// const paymentMethods = [
//   { id: "cash", label: "Cash", icon: <CashIcon /> },
//   { id: "gift", label: "Gift Card", icon: <GiftCardIcon /> },
//   { id: "card", label: "Card Terminal", icon: <CardIcon /> },
//   { id: "qr", label: "QR Code", icon: <QRIcon /> },
// ];

// const defaultServices: ServiceRow[] = [
//   {
//     name: "Haircut",
//     date: "02/08/2025",
//     price: 170,
//     startTime: "11:00",
//     duration: "15 min",
//     employee: "Maria Rodriguez",
//   },
// ];

// interface CheckoutPageProps {
//   onBack?: () => void;
//   onSave?: () => void;
// }

// export default function AppointmentCheckoutContent({
//   onBack,
//   onSave,
// }: CheckoutPageProps) {
//   const total = defaultServices.reduce((sum, s) => sum + s.price, 0);

//   return (
//     <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col">
//       {/* Top Bar */}
//       <PageHeader
//         title="Checkout"
//         onBack={() => console.log("Go Back")}
//         breadcrumb={[{ label: "Dashboard", active: true }]}
//       />

//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto mt-6 space-y-4">
//         {/* Payment Methods */}
//         <div className="bg-white rounded-xl p-[30px] border border-[#E0E6EB]">
//           <h3 className="text-sm font-semibold text-[#29343D] mb-2">
//             Payment Methods
//           </h3>
//           <p className="text-xs font-manrope text-[#98A4AE] mb-4">
//             Select one or more methods.
//           </p>
//           <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
//             {paymentMethods.map((method) => (
//               <button
//                 key={method.id}
//                 className="flex flex-col items-center justify-center py-6 rounded-xl border transition-all cursor-pointer border-[#EFF4FA]"
//               >
//                 <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center mb-3">
//                   {method.icon}
//                 </div>
//                 <span className="text-sm font-medium text-[#29343D]">
//                   {method.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Services — always shows the table */}
//         <div className="bg-white rounded-xl p-[30px] border border-[#EFF4FA]">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="text-sm font-semibold text-[#29343D]">Services</h3>
//           </div>

//           {/* Service table — always visible */}
//           <div className="rounded-xl mb-4 overflow-hidden">
//             {/* Header */}
//             <div className="grid grid-cols-6 px-4 py-2.5 border-b border-[#EFF4FA]">
//               {[
//                 "Service",
//                 "Date",
//                 "Price",
//                 "Start Time",
//                 "Duration",
//                 "Employee",
//               ].map((h) => (
//                 <span
//                   key={h}
//                   className="text-sm font-manrope text-[#29343D] font-semibold"
//                 >
//                   {h}
//                 </span>
//               ))}
//             </div>

//             {/* Rows */}
//             {defaultServices.map((s, i) => (
//               <div
//                 key={i}
//                 className="grid grid-cols-6 items-center px-4 py-5 border-b border-[#EFF4FA] last:border-0"
//               >
//                 <span className="text-sm font-semibold font-manrope text-[#29343D]">
//                   {s.name}
//                 </span>
//                 <span className="text-sm font-manrope font-normal text-[#29343D]">
//                   {s.date ?? "—"}
//                 </span>
//                 <span className="text-sm font-manrope font-normal text-[#29343D]">
//                   € {s.price}
//                 </span>
//                 <span className="text-sm font-manrope font-normal text-[#29343D]">
//                   {s.startTime ?? "—"}
//                 </span>
//                 <span className="text-sm font-manrope font-normal text-[#29343D]">
//                   {s.duration ?? "—"}
//                 </span>
//                 {/* employee */}
//                 <div className="flex items-center gap-2.5 px-2.5 py-1.5 bg-[#F4F6FA] rounded-[10px] w-fit">
//                   <Image
//                     src="/images/avator.png"
//                     alt={s.employee ?? "Employee"}
//                     width={48}
//                     height={48}
//                     className="rounded-[8px] object-cover flex-shrink-0"
//                   />
//                   <span className="text-sm flex items-center gap-4 font-semibold font-manrope text-[#29343D] truncate">
//                     {s.employee ?? "—"}
//                     <ChevronDown strokeWidth={1.5} size={20} color="#29343D" />
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="border border-[#EFF4FA] rounded-xl p-4">
//             <p className="text-sm font-semibold text-[#29343D] mb-3">
//               Order Summary
//             </p>
//             <div className="space-y-2.5">
//               <div className="flex justify-between text-sm text-[#526B7A]">
//                 <span>Tax</span>
//                 <span>0</span>
//               </div>
//               <div className="flex justify-between text-sm text-[#526B7A]">
//                 <span>Discount</span>
//                 <span>0</span>
//               </div>
//               <div className="flex justify-between text-sm font-bold text-[#29343D] pt-2.5">
//                 <span>Total</span>
//                 <span>€ {total}</span>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-white py-4 flex items-center justify-between mt-2">
//             <button
//               onClick={onBack}
//               className="px-5 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm font-medium text-[#29343D] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer"
//             >
//               Back
//             </button>
//             <div className="flex items-center gap-3">
//               <button className="w-10 h-10 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer">
//                 <EllipsisVertical size={18} className="text-[#29343D]" />
//               </button>
//               <button
//                 onClick={onSave}
//                 className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold rounded-[8px] cursor-pointer"
//               >
//                 Save and Leave
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  ChevronDown,
  EllipsisVertical,
  X,
  Check,
  Loader2,
  Printer,
  Plus,
} from "lucide-react";
import PageHeader from "../../common-component/PageHeader";
import Image from "next/image";
// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceRow {
  name: string;
  price: number;
  date?: string;
  startTime?: string;
  duration?: string;
  employee?: string;
}

interface CheckoutPageProps {
  onBack?: () => void;
  onSave?: () => void;
}

type PaymentMethodId = "cash" | "card" | "online" | "gift";

type ActiveModal =
  | null
  | "cash"
  | "card"
  | "online"
  | "gift"
  | "divide"
  | "online-combo";

interface IconProps {
  white?: boolean;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  title?: string;
}

interface PrintReceiptModalProps {
  open: boolean;
  onClose: () => void;
  twoOptions?: boolean;
}

interface DividePaymentModalProps {
  open: boolean;
  onClose: () => void;
  methodA: PaymentMethodId;
  methodB: PaymentMethodId;
}

interface GiftCardItem {
  id: string;
  name: string;
  code: string;
  bg: string;
  type: "colored" | "vip";
}

interface GiftCardVisualProps {
  card: GiftCardItem;
  selected: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_SERVICES: ServiceRow[] = [
  {
    name: "Haircut",
    date: "02/08/2025",
    price: 170,
    startTime: "11:00",
    duration: "15 min",
    employee: "Maria Rodriguez",
  },
];

const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  Icon: React.FC<IconProps>;
}[] = [
  { id: "cash", label: "Cash", Icon: CashIcon },
  { id: "card", label: "Card Terminal", Icon: CardIcon },
  { id: "online", label: "Online Payment", Icon: OnlineIcon },
  { id: "gift", label: "Gift Card", Icon: GiftIcon },
];

const MOCK_GIFT_CARDS: GiftCardItem[] = [
  {
    id: "gc1",
    name: "Name",
    code: "#code",
    bg: "linear-gradient(135deg,#6C5CE7 0%,#a29bfe 100%)",
    type: "colored",
  },
  {
    id: "gc2",
    name: "Name",
    code: "#code",
    bg: "linear-gradient(135deg,#d4a96a 0%,#f0ddb0 50%,#c8a04a 100%)",
    type: "vip",
  },
];

const METHOD_LABELS: Record<PaymentMethodId, string> = {
  cash: "Cash",
  card: "Card Terminal",
  gift: "Gift Card",
  online: "Online Payment",
};

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

function CashIcon({ white = false }: IconProps) {
  const c = white ? "#fff" : "#635BFF";
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect
        x="2"
        y="8"
        width="28"
        height="18"
        rx="3"
        stroke={c}
        strokeWidth="2"
      />
      <circle cx="16" cy="17" r="4" stroke={c} strokeWidth="2" />
      <path
        d="M6 12h2M24 12h2M6 22h2M24 22h2"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardIcon({ white = false }: IconProps) {
  const c = white ? "#fff" : "#635BFF";
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect
        x="2"
        y="7"
        width="28"
        height="18"
        rx="3"
        stroke={c}
        strokeWidth="2"
      />
      <path d="M2 13h28" stroke={c} strokeWidth="2" />
      <rect x="6" y="18" width="6" height="3" rx="1" fill={c} />
    </svg>
  );
}

function OnlineIcon({ white = false }: IconProps) {
  const c = white ? "#fff" : "#635BFF";
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke={c} strokeWidth="2" />
      <path
        d="M16 3c-4 5-4 21 0 26M16 3c4 5 4 21 0 26M3 16h26"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GiftIcon({ white = false }: IconProps) {
  const c = white ? "#fff" : "#635BFF";
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect
        x="4"
        y="14"
        width="24"
        height="14"
        rx="2"
        stroke={c}
        strokeWidth="2"
      />
      <path d="M2 10h28v4H2z" stroke={c} strokeWidth="2" />
      <path
        d="M16 10V28M16 10c0-3-2-6-4-6s-3 2-3 3 1 3 7 3zM16 10c0-3 2-6 4-6s3 2 3 3-1 3-7 3z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MethodIcon({ id, white }: { id: PaymentMethodId; white?: boolean }) {
  switch (id) {
    case "cash":
      return <CashIcon white={white} />;
    case "card":
      return <CardIcon white={white} />;
    case "online":
      return <OnlineIcon white={white} />;
    case "gift":
      return <GiftIcon white={white} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ILLUSTRATIONS
// ─────────────────────────────────────────────────────────────────────────────

function ReceiptIllustration() {
  return (
    <svg width="80" height="96" viewBox="0 0 80 96" fill="none">
      <rect
        x="8"
        y="4"
        width="64"
        height="76"
        rx="5"
        fill="#F4F6FA"
        stroke="#E0E6EB"
        strokeWidth="2"
      />
      <path
        d="M8 80l9-9 9 9 9-9 9 9 9-9 9 9"
        stroke="#E0E6EB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="18"
        y="18"
        width="36"
        height="5"
        rx="2.5"
        fill="#635BFF"
        opacity=".25"
      />
      <rect x="18" y="30" width="28" height="4" rx="2" fill="#C7C4FF" />
      <rect x="18" y="40" width="32" height="4" rx="2" fill="#C7C4FF" />
      <rect x="18" y="50" width="22" height="4" rx="2" fill="#C7C4FF" />
      <rect
        x="18"
        y="62"
        width="36"
        height="5"
        rx="2.5"
        fill="#635BFF"
        opacity=".45"
      />
    </svg>
  );
}

function TerminalIllustration() {
  return (
    <svg width="80" height="96" viewBox="0 0 80 96" fill="none">
      <rect
        x="12"
        y="6"
        width="56"
        height="72"
        rx="7"
        fill="#F4F6FA"
        stroke="#E0E6EB"
        strokeWidth="2"
      />
      <rect x="20" y="14" width="40" height="22" rx="4" fill="#DDDBFF" />
      <rect
        x="20"
        y="44"
        width="10"
        height="10"
        rx="2.5"
        fill="#635BFF"
        opacity=".35"
      />
      <rect
        x="35"
        y="44"
        width="10"
        height="10"
        rx="2.5"
        fill="#635BFF"
        opacity=".35"
      />
      <rect
        x="50"
        y="44"
        width="10"
        height="10"
        rx="2.5"
        fill="#635BFF"
        opacity=".35"
      />
      <rect
        x="20"
        y="58"
        width="10"
        height="10"
        rx="2.5"
        fill="#635BFF"
        opacity=".35"
      />
      <rect
        x="35"
        y="58"
        width="10"
        height="10"
        rx="2.5"
        fill="#635BFF"
        opacity=".35"
      />
      <rect
        x="50"
        y="58"
        width="10"
        height="10"
        rx="2.5"
        fill="#635BFF"
        opacity=".6"
      />
      <rect x="16" y="82" width="48" height="7" rx="3.5" fill="#E0E6EB" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL SHELL
// ─────────────────────────────────────────────────────────────────────────────

function Modal({
  open,
  onClose,
  children,
  width = "420px",
  title,
}: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(41,52,61,0.4)", backdropFilter: "blur(2px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl relative"
        style={{ width, maxWidth: "96vw", fontFamily: "'Manrope', sans-serif" }}
      >
        {title ? (
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            <p className="text-base font-bold text-[#29343D]">{title}</p>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] transition-colors"
            >
              <X size={16} color="#98A4AE" />
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] transition-colors z-10"
          >
            <X size={16} color="#98A4AE" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRINT RECEIPT MODAL  (Cash + Online-combo)
// ─────────────────────────────────────────────────────────────────────────────

function PrintReceiptModal({
  open,
  onClose,
  twoOptions = false,
}: PrintReceiptModalProps) {
  const [done, setDone] = useState<boolean>(false);

  function handleAction(): void {
    setDone(true);
    setTimeout(() => {
      setDone(false);
      onClose();
    }, 1600);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 flex flex-col items-center text-center">
        {done ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#DDDBFF] flex items-center justify-center mb-4">
              <Check size={28} color="#635BFF" strokeWidth={2.5} />
            </div>
            <p className="text-sm font-bold text-[#29343D]">Done!</p>
          </>
        ) : (
          <>
            <div className="mb-5">
              <ReceiptIllustration />
            </div>
            <p className="text-base font-bold text-[#29343D] mb-1">
              Print Receipt
            </p>

            {twoOptions ? (
              <>
                <p className="text-xs text-[#98A4AE] mb-6">
                  Online payment is part of this transaction. Choose what to
                  print now.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={handleAction}
                    className="flex-1 py-2.5 border border-[#E0E6EB] rounded-[8px] text-xs font-semibold text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    Entirely (Including what will be paid later)
                  </button>
                  <button
                    onClick={handleAction}
                    className="flex-1 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-xs font-semibold rounded-[8px] transition-colors cursor-pointer"
                  >
                    Print online payment part once received
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-[#98A4AE] mb-6">
                  Would you like to print a receipt?
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleAction}
                    className="flex-1 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm font-semibold text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                  >
                    No Print
                  </button>
                  <button
                    onClick={handleAction}
                    className="flex-1 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Printer size={14} /> Print Receipt
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD TERMINAL MODAL
// ─────────────────────────────────────────────────────────────────────────────

type CardState = "waiting" | "processing" | "success";

function CardTerminalModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState<CardState>("waiting");

  function simulate(): void {
    setState("processing");
    setTimeout(() => setState("success"), 2200);
  }

  function handleClose(): void {
    setState("waiting");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-8 flex flex-col items-center text-center min-h-[260px] justify-center">
        {state === "waiting" && (
          <>
            <div className="mb-5">
              <TerminalIllustration />
            </div>
            <p className="text-base font-bold text-[#29343D] mb-1">
              Waiting for payment processing…
            </p>
            <p className="text-xs text-[#98A4AE] mb-6">
              Please tap, insert, or swipe card on the terminal.
            </p>
            <button
              onClick={simulate}
              className="w-full py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              Simulate Card Tap
            </button>
          </>
        )}
        {state === "processing" && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#DDDBFF] flex items-center justify-center mb-5">
              <Loader2 size={28} color="#635BFF" className="animate-spin" />
            </div>
            <p className="text-base font-bold text-[#29343D] mb-1">
              Processing Payment…
            </p>
            <p className="text-xs text-[#98A4AE]">
              Please do not remove your card.
            </p>
          </>
        )}
        {state === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#DDDBFF] flex items-center justify-center mb-5">
              <Check size={28} color="#635BFF" strokeWidth={2.5} />
            </div>
            <p className="text-base font-bold text-[#29343D] mb-1">
              Payment Successful!
            </p>
            <p className="text-xs text-[#98A4AE] mb-6">
              € 170 charged successfully.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              Done
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ONLINE PAYMENT MODAL
// ─────────────────────────────────────────────────────────────────────────────

interface OnlineFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function OnlinePaymentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "print">("form");
  const [sendLink, setSendLink] = useState<boolean>(true);
  const [form, setForm] = useState<OnlineFormState>({
    firstName: "Maria",
    lastName: "Fernandez",
    email: "maria@example.com",
    phone: "+34 634 123 4567",
  });

  function handleClose(): void {
    onClose();
    setTimeout(() => setStep("form"), 300);
  }

  function updateField(key: keyof OnlineFormState, value: string): void {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const fields: { label: string; key: keyof OnlineFormState }[] = [
    { label: "First Name*", key: "firstName" },
    { label: "Last Name*", key: "lastName" },
    { label: "E-mail*", key: "email" },
    { label: "Phone*", key: "phone" },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={step === "form" ? "Online Payment" : undefined}
      width="460px"
    >
      {step === "form" ? (
        <div className="px-6 pb-6 pt-4">
          {/* Client row */}
          <div className="flex items-center gap-3 mb-5 p-3 bg-[#F4F6FA] rounded-xl">
            <div className="w-10 h-10 rounded-[8px] bg-[#DDDBFF] flex items-center justify-center text-[#635BFF] font-bold text-sm flex-shrink-0">
              MF
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#29343D]">
                Maria Fernandez
              </p>
              <p className="text-xs text-[#98A4AE]">Client</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-[#526B7A]">Send payment link</span>
              <div
                onClick={() => setSendLink((v) => !v)}
                className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                  sendLink ? "bg-[#635BFF]" : "bg-[#E0E6EB]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    sendLink ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {fields.map(({ label, key }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-[#526B7A] block mb-1">
                  {label}
                </label>
                <input
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E0E6EB] rounded-[8px] text-[#29343D] outline-none focus:border-[#635BFF] transition-colors bg-white"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep("print")}
            className="w-full py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            Send payment Email
          </button>
        </div>
      ) : (
        <div className="p-8 flex flex-col items-center text-center">
          <div className="mb-5">
            <ReceiptIllustration />
          </div>
          <p className="text-base font-bold text-[#29343D] mb-1">
            Print Receipt
          </p>
          <p className="text-xs text-[#98A4AE] mb-6">
            Payment link sent. Choose what to print.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 border border-[#E0E6EB] rounded-[8px] text-xs font-semibold text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              Entirely (Including what will be paid later)
            </button>
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-xs font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              Print online payment part once received
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GIFT CARD MODAL
// ─────────────────────────────────────────────────────────────────────────────

function GiftCardVisual({ card, selected }: GiftCardVisualProps) {
  return (
    <div
      className={`rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${
        selected ? "border-[#635BFF]" : "border-[#EFF4FA]"
      }`}
    >
      <div
        className="h-36 w-full flex flex-col justify-between p-3.5 relative"
        style={{ background: card.bg }}
      >
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-white/25 flex items-center justify-center">
            <span
              style={{
                fontSize: 9,
                color: card.type === "vip" ? "#7a5c1e" : "#fff",
              }}
            >
              M
            </span>
          </div>
          <span
            className="text-xs font-bold"
            style={{
              color:
                card.type === "vip"
                  ? "rgba(90,60,10,0.8)"
                  : "rgba(255,255,255,0.9)",
            }}
          >
            Your logo
          </span>
        </div>

        {card.type === "colored" ? (
          <div>
            <p className="text-2xl font-extrabold text-white drop-shadow">
              € 200
            </p>
            <p className="text-xs text-white/70">Gift Card</p>
          </div>
        ) : (
          <div className="self-end">
            <div className="w-12 h-12 rounded-full border-2 border-[#c8a04a] bg-[#f0ddb0]/80 flex items-center justify-center">
              <span className="text-xs font-bold text-[#7a5c1e]">VIP</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-3 py-2.5 bg-white">
        <p className="text-sm font-semibold text-[#29343D]">{card.name}</p>
        <p className="text-xs text-[#98A4AE]">{card.code}</p>
      </div>
    </div>
  );
}

function GiftCardModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [applied, setApplied] = useState<boolean>(false);

  function handleClose(): void {
    setSelectedCard(null);
    setShowCode(false);
    setCode("");
    setApplied(false);
    onClose();
  }

  function handleApply(): void {
    if (code.trim()) setApplied(true);
  }

  const canConfirm = selectedCard !== null || applied;

  return (
    <Modal open={open} onClose={handleClose} title="Gift Card" width="560px">
      <div className="px-6 pb-6 pt-4">
        <p className="text-xs text-[#98A4AE] mb-4">
          Select one or more Gifts Cards
        </p>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {MOCK_GIFT_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() =>
                setSelectedCard(selectedCard === card.id ? null : card.id)
              }
            >
              <GiftCardVisual card={card} selected={selectedCard === card.id} />
            </div>
          ))}
        </div>

        {/* Manual code input */}
        {showCode && (
          <div className="mb-4">
            <label className="text-xs font-semibold text-[#29343D] block mb-1.5">
              Insert Code Manually *
            </label>
            <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-[8px] px-3 py-2 focus-within:border-[#635BFF] transition-colors">
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setApplied(false);
                }}
                placeholder="Enter code"
                className="flex-1 text-sm text-[#29343D] outline-none bg-transparent"
              />
              {applied ? (
                <span className="text-xs font-semibold text-[#635BFF] flex items-center gap-1 whitespace-nowrap">
                  Applied <Check size={12} strokeWidth={2.5} />
                </span>
              ) : (
                <button
                  onClick={handleApply}
                  className="text-xs font-semibold text-[#635BFF] hover:text-[#4f49e0] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}

        {/* Total row — visible after code applied */}
        {applied && (
          <div className="flex justify-between items-center px-4 py-3 bg-[#F4F6FA] rounded-xl mb-4">
            <span className="text-sm font-semibold text-[#29343D]">Total</span>
            <span className="text-sm font-bold text-[#29343D]">€ 170</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setShowCode((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#635BFF] border border-[#DDDBFF] rounded-[8px] px-3 py-2 hover:bg-[#F4F3FF] transition-colors cursor-pointer"
          >
            <Plus size={13} strokeWidth={2.5} /> Insert Code Manually
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-semibold text-[#29343D] hover:bg-[#F4F6FA] rounded-[8px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={canConfirm ? handleClose : undefined}
              disabled={!canConfirm}
              className={`px-4 py-2 text-sm font-semibold rounded-[8px] transition-colors ${
                canConfirm
                  ? "bg-[#635BFF] hover:bg-[#4f49e0] text-white cursor-pointer"
                  : "bg-[#E0E6EB] text-[#98A4AE] cursor-not-allowed"
              }`}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIVIDE PAYMENT MODAL
// ─────────────────────────────────────────────────────────────────────────────

function DividePaymentModal({
  open,
  onClose,
  methodA,
  methodB,
}: DividePaymentModalProps) {
  const total = 170;
  const [amountA, setAmountA] = useState<number>(85);
  const amountB = total - amountA;

  return (
    <Modal open={open} onClose={onClose} title="Divide Payment" width="440px">
      <div className="px-6 pb-6 pt-4">
        {/* Total pill */}
        <div className="flex items-center justify-between p-3 bg-[#F4F6FA] rounded-xl mb-5">
          <span className="text-xs text-[#526B7A]">Total Amount</span>
          <span className="text-sm font-bold text-[#635BFF]">€ {total}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Method A — editable */}
          <div className="border border-[#EFF4FA] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#DDDBFF] flex items-center justify-center">
                <MethodIcon id={methodA} />
              </div>
              <span className="text-xs font-semibold text-[#29343D]">
                {METHOD_LABELS[methodA]}
              </span>
            </div>
            <div className="flex items-center gap-1 border-b border-[#E0E6EB] pb-0.5 focus-within:border-[#635BFF] transition-colors">
              <span className="text-xs text-[#98A4AE]">€</span>
              <input
                type="number"
                value={amountA}
                min={0}
                max={total}
                onChange={(e) =>
                  setAmountA(
                    Math.min(total, Math.max(0, Number(e.target.value))),
                  )
                }
                className="w-full text-sm font-bold text-[#29343D] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Method B — auto-calculated */}
          <div className="border border-[#EFF4FA] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#DDDBFF] flex items-center justify-center">
                <MethodIcon id={methodB} />
              </div>
              <span className="text-xs font-semibold text-[#29343D]">
                {METHOD_LABELS[methodB]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#98A4AE]">€</span>
              <span className="text-sm font-bold text-[#29343D]">
                {amountB}
              </span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-5 px-0.5">
          <input
            type="range"
            min={0}
            max={total}
            value={amountA}
            onChange={(e) => setAmountA(Number(e.target.value))}
            className="w-full accent-[#635BFF]"
          />
          <div className="flex justify-between text-xs text-[#98A4AE] mt-1">
            <span>€ 0</span>
            <span>€ {total}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm font-semibold text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          >
            None
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
          >
            Collect Payment
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function AppointmentCheckoutContent({
  onBack,
  onSave,
}: CheckoutPageProps) {
  const total = DEFAULT_SERVICES.reduce((sum, s) => sum + s.price, 0);

  const [selected, setSelected] = useState<PaymentMethodId[]>([]);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  function toggleMethod(id: PaymentMethodId): void {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleContinue(): void {
    const hasOnline = selected.includes("online");
    const others = selected.filter((x) => x !== "online") as PaymentMethodId[];

    if (hasOnline && others.length >= 1) {
      setActiveModal("online-combo");
      return;
    }
    if (selected.length >= 2) {
      setActiveModal("divide");
      return;
    }
    if (selected.includes("cash")) {
      setActiveModal("cash");
      return;
    }
    if (selected.includes("card")) {
      setActiveModal("card");
      return;
    }
    if (selected.includes("online")) {
      setActiveModal("online");
      return;
    }
    if (selected.includes("gift")) {
      setActiveModal("gift");
      return;
    }
  }

  const close = (): void => setActiveModal(null);

  const nonOnline = selected.filter((x) => x !== "online") as PaymentMethodId[];
  const divideA: PaymentMethodId = nonOnline[0] ?? "cash";
  const divideB: PaymentMethodId = nonOnline[1] ?? "card";

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col">
      {/* ── Top Bar (PageHeader shape) ── */}
      <PageHeader
        title="Checkout"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Appointments", active: true }]}
      />

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto mt-6 space-y-4 pb-6">
        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-[30px] border border-[#E0E6EB]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[#29343D]">
              Payment Methods
            </h3>
            <button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-colors ${
                selected.length > 0
                  ? "bg-[#635BFF] hover:bg-[#4f49e0] text-white cursor-pointer"
                  : "bg-[#E0E6EB] text-[#98A4AE] cursor-not-allowed"
              }`}
            >
              Continue Payment
            </button>
          </div>
          <p className="text-xs font-manrope text-[#98A4AE] mb-4">
            Select one or more methods.
          </p>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
            {PAYMENT_METHODS.map(({ id, label, Icon }) => {
              const isSelected = selected.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleMethod(id)}
                  className={`flex flex-col items-center justify-center py-6 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#635BFF] bg-[#F4F3FF]"
                      : "border-[#EFF4FA] bg-white hover:border-[#DDDBFF]"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      isSelected ? "bg-[#635BFF]" : "bg-[#DDDBFF]"
                    }`}
                  >
                    <Icon white={isSelected} />
                  </div>
                  <span className="text-sm font-medium text-[#29343D]">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl p-[30px] border border-[#EFF4FA]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-semibold text-[#29343D]">Services</h3>
          </div>
          <div className="rounded-xl mb-4 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-6 px-4 py-2.5 border-b border-[#EFF4FA]">
              {[
                "Service",
                "Date",
                "Price",
                "Start Time",
                "Duration",
                "Employee",
              ].map((h) => (
                <span
                  key={h}
                  className="text-sm font-manrope text-[#29343D] font-semibold"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {DEFAULT_SERVICES.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-6 items-center px-4 py-5 border-b border-[#EFF4FA] last:border-0"
              >
                <span className="text-sm font-semibold font-manrope text-[#29343D]">
                  {s.name}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  {s.date ?? "—"}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  € {s.price}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  {s.startTime ?? "—"}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  {s.duration ?? "—"}
                </span>
                {/* Employee chip */}
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 bg-[#F4F6FA] rounded-[10px] w-fit">
                  <Image
                    src="/images/avator.png"
                    alt={s.employee ?? "Employee"}
                    width={48}
                    height={48}
                    className="rounded-[8px] object-cover flex-shrink-0"
                  />
                  <span className="text-sm flex items-center gap-4 font-semibold font-manrope text-[#29343D] truncate">
                    {s.employee ?? "—"}
                    <ChevronDown strokeWidth={1.5} size={20} color="#29343D" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border border-[#EFF4FA] rounded-xl p-4">
            <p className="text-sm font-semibold text-[#29343D] mb-3">
              Order Summary
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm text-[#526B7A]">
                <span>Tax</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm text-[#526B7A]">
                <span>Discount</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#29343D] pt-2.5">
                <span>Total</span>
                <span>€ {total}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white py-4 flex items-center justify-between mt-2">
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm font-medium text-[#29343D] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer">
                <EllipsisVertical size={18} className="text-[#29343D]" />
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold rounded-[8px] cursor-pointer"
              >
                Save and Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      <PrintReceiptModal
        open={activeModal === "cash"}
        onClose={close}
        twoOptions={false}
      />
      <CardTerminalModal open={activeModal === "card"} onClose={close} />
      <OnlinePaymentModal open={activeModal === "online"} onClose={close} />
      <GiftCardModal open={activeModal === "gift"} onClose={close} />
      <DividePaymentModal
        open={activeModal === "divide"}
        onClose={close}
        methodA={divideA}
        methodB={divideB}
      />
      <PrintReceiptModal
        open={activeModal === "online-combo"}
        onClose={close}
        twoOptions={true}
      />
    </div>
  );
}
