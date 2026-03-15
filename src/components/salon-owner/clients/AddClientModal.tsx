import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AddClientModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    telephone: "",
    email: "",
  });
  const [genderOpen, setGenderOpen] = useState(false);
  const genderRef = useRef<HTMLDivElement>(null);
  const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (genderRef.current && !genderRef.current.contains(e.target as Node))
        setGenderOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const field = (key: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[560px] px-8 py-7 font-manrope">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h3 className="text-lg font-bold text-[#29343D]">Add Client</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F4F6FA] cursor-pointer transition-colors"
          >
            <X size={18} className="text-[#29343D]" />
          </button>
        </div>

        {/* 2-column form grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-1.5">
              First Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={(e) => field("firstName", e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-1.5">
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter last name *"
              value={form.lastName}
              onChange={(e) => field("lastName", e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>

          {/* Date of birth */}
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-1.5">
              Date of birth
            </label>
            <input
              type="text"
              placeholder="Enter date of birth"
              value={form.dob}
              onChange={(e) => field("dob", e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-1.5">
              Gender
            </label>
            <div ref={genderRef} className="relative">
              <button
                onClick={() => setGenderOpen((o) => !o)}
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-[4px] text-sm transition-colors cursor-pointer bg-white ${
                  genderOpen
                    ? "border-[#635BFF]"
                    : "border-[#E0E6EB] hover:border-[#B0BAC5]"
                }`}
              >
                <span
                  className={form.gender ? "text-[#29343D]" : "text-[#C4CDD5]"}
                >
                  {form.gender || "Select gender"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#98A4AE] transition-transform duration-200 ${
                    genderOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {genderOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-[4px] shadow-lg z-10 py-1 overflow-hidden">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        field("gender", g);
                        setGenderOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        form.gender === g
                          ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                          : "text-[#29343D] hover:bg-[#F4F6FA]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Telephone */}
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-1.5">
              Telephone <span>*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter telephone"
              value={form.telephone}
              onChange={(e) => field("telephone", e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-semibold text-[#29343D] mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => field("email", e.target.value)}
              className="w-full border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none focus:border-[#635BFF] transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
