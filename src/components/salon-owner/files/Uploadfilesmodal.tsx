"use client";

import { useState, useRef } from "react";
import { X, FileText, Image, Film, File, Trash2 } from "lucide-react";

interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
}

interface UploadFilesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (files: File[]) => void;
}

function getFileIcon(type: string) {
    if (type.startsWith("image/")) return <Image size={16} className="text-purple-500" />;
    if (type.startsWith("video/")) return <Film size={16} className="text-blue-500" />;
    if (type.includes("pdf") || type.includes("text")) return <FileText size={16} className="text-indigo-500" />;
    return <File size={16} className="text-gray-400" />;
}

function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadFilesModal({ isOpen, onClose, onSave }: UploadFilesModalProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const addFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;
        const entries: UploadedFile[] = Array.from(newFiles).map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            file,
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        }));
        setUploadedFiles((prev) => [...prev, ...entries]);
    };

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
    };

    const handleSave = () => {
        onSave?.(uploadedFiles.map((f) => f.file));
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-[540px] rounded-2xl bg-white shadow-2xl shadow-gray-200/60">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="font-manrope text-[16px] font-bold text-[#29343D]">Upload Files</h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full cursor-pointer"
                    >
                        <X size={18} color='#29343D' />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                    {/* Drop Zone */}
                    <div
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 py-10
              ${isDragging
                                ? "border-[#635BFF]"
                            : "border-[#635BFF]"
                            }`}
                    >
                        {/* Upload icon box */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEEEFF]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="#F1F2FE" />
                                <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" stroke="#DDDBFF" />
                                <path d="M39.9476 22.002V28.002M37 25.002L43 25" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M31.1041 43.6516L28.4964 39.2016L25.2748 33.7038C24.7958 32.8864 25.0921 31.8289 25.9085 31.3505C26.7259 30.8715 27.7555 31.152 28.2345 31.9695L30.5688 35.953M28.497 39.2026C27.8812 41.157 27.3503 43.4823 27.3853 43.9786C27.2896 45.84 27.7643 46.4376 29.7131 47.5053C30.9511 48.173 32.2183 48.7853 33.5109 49.3402C34.6227 49.7064 34.4901 49.7841 35.8746 49.9277C37.0906 50.0213 39.1297 49.3875 43.0897 46.5059C46.2057 43.9688 45.2743 40.4984 44.4187 39.0794L42.3507 35.5505C40.8455 32.4927 39.5422 33.0796 37.1468 34.095M32.0442 38.4685L30.5698 35.9524C30.594 34.7208 32.8266 33.9053 34.2222 35.3842M34.2222 35.3842L34.2401 35.4032L34.3058 35.4812C34.3614 35.5531 34.4125 35.629 34.4592 35.7087L35.0434 36.7056M34.2222 35.3842C34.2462 35.4175 34.2743 35.4502 34.3064 35.4822M34.2222 35.3842C33.384 34.2738 36.5751 32.7949 37.9278 34.8198L38.5955 35.9592M34.4592 30.0722L34.4592 26.6595C34.4592 24.4504 32.6684 22.6595 30.4592 22.6595L23.808 22.6595L17.1568 22.6595C14.9477 22.6595 13.1568 24.4504 13.1568 26.6595L13.1568 39.6516C13.1568 41.8607 14.9477 43.6516 17.1568 43.6516L24.437 43.6516" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M29.1617 17.6947C29.1616 15.8085 30.6906 14.2794 32.5767 14.2794L46.4327 14.2794C48.6419 14.2794 50.4327 16.0703 50.4327 18.2794L50.4327 32.2756C50.4327 34.172 48.8966 35.7101 47.0002 35.7124" stroke="#635BFF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        <p className="font-manrope text-sm font-medium text-[#635BFF]">
                            Drop here or click to browse
                        </p>
                    </div>

                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => addFiles(e.target.files)}
                    />

                    {/* File List */}
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4 flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1">
                            {uploadedFiles.map(({ id, file, preview }) => (
                                <div
                                    key={id}
                                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                                >
                                    {/* Thumbnail or icon */}
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt={file.name}
                                            className="h-9 w-9 rounded-lg object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200">
                                            {getFileIcon(file.type)}
                                        </div>
                                    )}

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="font-manrope text-sm font-semibold text-[#29343D] truncate">
                                            {file.name}
                                        </span>
                                        <span className="font-manrope text-xs text-[#98A4AE]">
                                            {formatSize(file.size)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => removeFile(id)}
                                        className="shrink-0 text-gray-300 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-10 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="font-manrope rounded-lg bg-[#635BFF] px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}