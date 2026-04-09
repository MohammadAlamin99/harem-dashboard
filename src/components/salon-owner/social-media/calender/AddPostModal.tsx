"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronDown,
  Bold,
  Italic,
  Smile,
  Hash,
  MapPin,
  Upload,
} from "lucide-react";
import ImageIcon from "./ImageIcon";
import SchedulePost from "./SchedulePostModal";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPostModal({ isOpen, onClose }: AddPostModalProps) {
  const [view, setView] = useState<"post" | "schedule">("post");
  const [activeTab, setActiveTab] = useState("Post");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
      setIsMediaDropdownOpen(false);
    }
  };

  if (view === "post") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope px-6">
        <div className="bg-white rounded-[12px] w-full max-w-[720px] shadow-2xl overflow-hidden">
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
              <div className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-xl cursor-pointer hover:border-[#6366F1] transition-colors group">
                <div className="flex items-center gap-3">
                  <Image
                    width={48}
                    height={48}
                    src="/images/avator.png"
                    className="w-10 h-10 rounded-xl bg-gray-100"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#29343D]">
                      Maria Rodriguez •{" "}
                      <span className="text-[14px] font-bold text-[#29343D]">
                        @mariarodriguez
                      </span>
                    </span>
                    <div className="flex items-center gap-2 text-[12px] text-[#94A3B8]">
                      Social Media :
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9.70194 7.55501C8.36261 7.55501 7.27764 8.64035 7.27764 9.97926C7.27764 11.3185 8.36303 12.4035 9.70194 12.4035C11.0412 12.4035 12.1262 11.3182 12.1262 9.97926C12.1262 8.63998 11.0409 7.55501 9.70194 7.55501ZM9.70194 5.93884C11.9325 5.93884 13.7423 7.74659 13.7423 9.97926C13.7423 12.2099 11.9345 14.0196 9.70194 14.0196C7.47121 14.0196 5.6615 12.2119 5.6615 9.97926C5.6615 7.74859 7.46928 5.93884 9.70194 5.93884ZM14.9544 5.73613C14.9544 6.2938 14.5013 6.74623 13.9444 6.74623C13.3867 6.74623 12.9342 6.29307 12.9342 5.73613C12.9342 5.17916 13.3873 4.72672 13.9444 4.72672C14.5005 4.72601 14.9544 5.17916 14.9544 5.73613ZM9.70194 3.5146C7.70231 3.5146 7.37643 3.51989 6.44637 3.5613C5.81275 3.59105 5.388 3.67627 4.99336 3.82948C4.64265 3.9655 4.38967 4.12792 4.12012 4.39747C3.84953 4.66805 3.6874 4.92036 3.55194 5.27123C3.39837 5.66678 3.31317 6.09083 3.28397 6.72362C3.24215 7.61574 3.23726 7.92756 3.23726 9.97926C3.23726 11.9788 3.24255 12.3047 3.28395 13.2346C3.31372 13.868 3.39905 14.2934 3.55189 14.6871C3.68826 15.0383 3.85101 15.2919 4.11926 15.5602C4.39091 15.8314 4.64397 15.9941 4.99151 16.1282C5.39096 16.2827 5.81544 16.368 6.44625 16.3972C7.33843 16.439 7.65025 16.4439 9.70194 16.4439C11.7015 16.4439 12.0274 16.4385 12.9573 16.3972C13.5893 16.3675 14.015 16.2819 14.4098 16.1292C14.76 15.9932 15.0144 15.8299 15.2829 15.5619C15.5545 15.2898 15.7169 15.0373 15.8512 14.689C16.0052 14.291 16.0907 13.8659 16.1199 13.2349C16.1616 12.3427 16.1665 12.0309 16.1665 9.97926C16.1665 7.97968 16.1612 7.65374 16.1199 6.7238C16.0901 6.09162 16.0045 5.6653 15.8516 5.2707C15.716 4.92096 15.553 4.6672 15.2836 4.39747C15.0126 4.12644 14.761 3.96464 14.4099 3.82928C14.0147 3.67584 13.5899 3.59052 12.9575 3.56131C12.0654 3.51949 11.7536 3.5146 9.70194 3.5146ZM9.70194 1.89844C11.8972 1.89844 12.1713 1.90652 13.0332 1.94692C13.8931 1.98666 14.4797 2.12268 14.9949 2.32268C15.5275 2.52807 15.9773 2.8055 16.4264 3.25466C16.8749 3.70383 17.1524 4.155 17.3585 4.68632C17.5578 5.2008 17.6938 5.788 17.7342 6.64792C17.7726 7.50986 17.7827 7.78398 17.7827 9.97926C17.7827 12.1745 17.7747 12.4486 17.7342 13.3105C17.6945 14.1705 17.5578 14.757 17.3585 15.2722C17.1531 15.8048 16.8749 16.2547 16.4264 16.7039C15.9773 17.1523 15.5255 17.4297 14.9949 17.6358C14.4797 17.8351 13.8931 17.9711 13.0332 18.0116C12.1713 18.0499 11.8972 18.06 9.70194 18.06C7.50661 18.06 7.23255 18.052 6.37061 18.0116C5.51065 17.9718 4.9248 17.8351 4.40897 17.6358C3.87698 17.4304 3.42648 17.1523 2.97732 16.7039C2.52817 16.2547 2.2514 15.8028 2.04534 15.2722C1.84534 14.757 1.70998 14.1705 1.66958 13.3105C1.6312 12.4486 1.62109 12.1745 1.62109 9.97926C1.62109 7.78398 1.62917 7.50986 1.66958 6.64792C1.70931 5.78732 1.84534 5.20147 2.04534 4.68632C2.25072 4.15433 2.52817 3.70383 2.97732 3.25466C3.42648 2.8055 3.87766 2.52874 4.40897 2.32268C4.92412 2.12268 5.50998 1.98732 6.37061 1.94692C7.23255 1.90853 7.50661 1.89844 9.70194 1.89844Z" fill="#635BFF" />
                      </svg>
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
            <div className="flex gap-2.5 border-b border-[#E2E8F0]">
              {["Post", "Reel", "Story"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer px-4 py-3.5 text-[14px] font-semibold relative transition-colors ${activeTab === tab ? "text-[#6366F1]" : "text-[#94A3B8]"}`}
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
              <label className="text-[14px] font-semibold text-[#29343D] mb-2 block">
                Description
              </label>
              <div className="border border-[#E2E8F0] rounded-[4px] p-4 min-h-[180px] flex justify-between flex-col relative focus-within:border-[#6366F1] transition-colors">
                <textarea
                  className="w-full text-[14px] outline-none resize-none placeholder:text-[#94A3B8]"
                  placeholder="Write your description here..."
                />

                {/* Image Preview inside the description area */}
                {uploadedImage && (
                  <div className="relative w-24 h-24 mt-4 mb-2">
                    <Image
                      width={96}
                      height={96}
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
                <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-[#0A2540] text-[14px] font-medium cursor-pointer">
                  <MapPin size={16} />  Location
                </button>

                {/* Media Button with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMediaDropdownOpen(!isMediaDropdownOpen)}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-2.5 border font-medium rounded-lg text-[14px] transition-all ${isMediaDropdownOpen ? "border-[#6366F1] text-[#6366F1] bg-indigo-50" : "border-[#E2E8F0] text-[#0A2540]"}`}
                  >
                    <ImageIcon /> Media
                  </button>

                  {isMediaDropdownOpen && (
                    <div className="absolute bottom-full mb-2 left-0 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
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

              <div className="flex gap-4">
                <button className="cursor-pointer px-6 py-2.5 border border-[#6366F1] text-[#6366F1] rounded-lg text-[14px] font-bold hover:bg-indigo-50">
                  Draft
                </button>
                <button className="cursor-pointer px-6 py-2.5 bg-[#DDDBFF] text-[#6366F1] rounded-lg text-[14px] font-bold hover:bg-[#D1DBFF]">
                  Publish
                </button>
                <button
                  onClick={() => setView("schedule")}
                  className="cursor-pointer px-4 py-2.5 bg-[#6366F1] text-white rounded-lg text-[14px] font-bold hover:bg-[#4F46E5] transition-all"
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
    <SchedulePost setView={setView} onClose={handleClose} />
  );
}
