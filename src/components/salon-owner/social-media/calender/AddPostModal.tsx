"use client";

import { useState, useRef } from "react";
import {
  X,
  ChevronDown,
  Instagram,
  Bold,
  Italic,
  Smile,
  Hash,
  MapPin,
  Image as ImageIcon,
  Calendar,
  Clock,
  MousePointer2,
  Upload,
} from "lucide-react";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPostModal({ isOpen, onClose }: AddPostModalProps) {
  const [view, setView] = useState<"post" | "schedule">("post");
  const [activeTab, setActiveTab] = useState("Post");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // States for the new Media Dropdown
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setView("post");
    setUploadedImage(null);
    setIsMediaDropdownOpen(false);
    onClose();
  };

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setIsMediaDropdownOpen(false); // Close dropdown after selection
    }
  };

  if (view === "post") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope px-4">
        <div className="bg-white rounded-[24px] w-full max-w-[720px] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-4">
            <h2 className="text-[#29343D] text-xl font-bold">Add Post</h2>
            <button
              onClick={handleClose}
              className="text-[#29343D] hover:opacity-70 transition-opacity"
            >
              <X size={22} />
            </button>
          </div>

          <div className="px-8 pb-8 flex flex-col gap-5">
            {/* Account Selector */}
            <div>
              <label className="text-[13px] font-semibold text-[#29343D] mb-2 block">
                Accounts
              </label>
              <div className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-2xl cursor-pointer hover:border-[#6366F1] transition-colors group">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                    className="w-10 h-10 rounded-xl bg-gray-100"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#29343D]">
                      Maria Rodriguez •{" "}
                      <span className="font-normal text-[#64748B]">
                        @mariarodriguez
                      </span>
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                      Social Media:{" "}
                      <Instagram size={12} className="text-[#6366F1]" />
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className="text-[#6366F1] group-hover:translate-y-0.5 transition-transform"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E2E8F0]">
              {["Post", "Reel", "Story"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-[14px] font-semibold relative transition-colors ${activeTab === tab ? "text-[#6366F1]" : "text-[#94A3B8]"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6366F1]" />
                  )}
                </button>
              ))}
            </div>

            {/* Description Area */}
            <div>
              <label className="text-[13px] font-semibold text-[#29343D] mb-2 block">
                Description
              </label>
              <div className="border border-[#E2E8F0] rounded-xl p-4 min-h-[180px] flex flex-col relative focus-within:border-[#6366F1] transition-colors">
                <textarea
                  className="w-full text-[14px] outline-none resize-none placeholder:text-[#94A3B8]"
                  placeholder="Write your description here..."
                />

                {/* Image Preview inside the description area */}
                {uploadedImage && (
                  <div className="relative w-24 h-24 mt-4 mb-2">
                    <img
                      src={uploadedImage}
                      className="w-full h-full object-cover rounded-xl border border-gray-100 shadow-sm"
                      alt="Preview"
                    />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute -top-2 -right-2 bg-[#FFEDED] text-[#FF4D4F] rounded-full p-1 shadow-sm hover:bg-[#FFD9D9] transition-colors"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-2">
                  {[Bold, Italic, Smile, Hash].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 flex items-center justify-center border border-[#F1F5F9] rounded-lg text-[#64748B] hover:bg-gray-50"
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hidden Native File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2 relative">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-xl text-[#64748B] text-[13px] hover:bg-gray-50">
                  <MapPin size={16} /> Location
                </button>

                {/* Media Button with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMediaDropdownOpen(!isMediaDropdownOpen)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[13px] transition-all ${isMediaDropdownOpen ? "border-[#6366F1] text-[#6366F1] bg-indigo-50" : "border-[#E2E8F0] text-[#64748B] hover:bg-gray-50"}`}
                  >
                    <ImageIcon size={16} /> Media
                  </button>

                  {isMediaDropdownOpen && (
                    <div className="absolute bottom-full mb-2 left-0 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl overflow-hidden z-[60] animate-in fade-in slide-in-from-bottom-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#29343D] hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={16} className="text-[#6366F1]" />
                        Update Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2.5 border border-[#6366F1] text-[#6366F1] rounded-xl text-[14px] font-bold hover:bg-indigo-50">
                  Draft
                </button>
                <button className="px-6 py-2.5 bg-[#E0E7FF] text-[#6366F1] rounded-xl text-[14px] font-bold hover:bg-[#D1DBFF]">
                  Publish
                </button>
                <button
                  onClick={() => setView("schedule")}
                  className="px-8 py-2.5 bg-[#6366F1] text-white rounded-xl text-[14px] font-bold shadow-lg shadow-indigo-100 hover:bg-[#4F46E5] transition-all"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SCHEDULE VIEW ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope px-4">
      <div className="bg-white rounded-[24px] w-full max-w-[580px] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <h2 className="text-[#29343D] text-lg font-bold">Schedule Post</h2>
          <button onClick={handleClose} className="text-[#29343D]">
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#29343D]">
                Date *
              </label>
              <div className="relative group">
                <input
                  type="date"
                  className="w-full p-3.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#6366F1] text-[14px] appearance-none"
                />
                <Calendar
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none group-focus-within:text-[#6366F1]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#29343D]">
                Time *
              </label>
              <div className="relative group">
                <input
                  type="time"
                  className="w-full p-3.5 border border-[#E2E8F0] rounded-xl outline-none focus:border-[#6366F1] text-[14px] appearance-none"
                />
                <Clock
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none group-focus-within:text-[#6366F1]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setView("post")}
              className="px-8 py-2.5 border border-[#E2E8F0] text-[#64748B] rounded-xl text-[14px] font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-8 py-2.5 bg-[#6366F1] text-white rounded-xl text-[14px] font-bold shadow-lg shadow-indigo-100 hover:bg-[#4F46E5]">
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
