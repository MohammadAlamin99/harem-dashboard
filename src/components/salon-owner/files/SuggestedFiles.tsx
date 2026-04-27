"use client";

import { useState } from 'react';
import { LayoutGrid, MoreVertical, TableOfContents } from 'lucide-react';
import File from './File';
import Image from 'next/image';

const FileListItem = ({ title, createdBy }: { title: string; createdBy: string }) => (
    <div className="w-full bg-white border border-[#E0E6EB] rounded-xl p-6 flex items-center justify-between hover:shadow-sm transition-all group">
        <div className="flex items-center gap-4">
            {/* File Icon */}
            <div className="relative w-10 h-12">
                <Image
                    src="/images/filepdf.png"
                    alt="file"
                    width={50}
                    height={50}
                />
            </div>
            <div className="font-manrope text-start">
                <h4 className="text-sm font-semibold text-[#29343D] leading-none mb-2">{title}</h4>
                <p className="text-[14px] text-[#98A4AE] font-medium">{createdBy}</p>
            </div>
        </div>
        <button className="text-[#29343D] hover:text-[#635BFF] transition-colors">
            <MoreVertical size={20} />
        </button>
    </div>
);

export default function SuggestedFiles() {
    // 1. Add state to handle switching
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const files = [
        { title: "August Salary", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "Sanction Letter", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "March Salary", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "Invoice 112", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "August Salary", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "Sanction Letter", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "March Salary", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
        { title: "Invoice 112", createdBy: "PDF • 20 MB • Created by Maria Rodriguez" },
    ];

    return (
        <div className="bg-white rounded-xl mt-6 md:p-[30px] p-[15px]">
            <div className="flex items-center justify-between py-2.5 mb-4">
                <h2 className="font-manrope text-base font-bold text-[#29343D]">Suggested Files</h2>

                {/* REPLACED "View More" with your toggle button design */}
                <div className="flex bg-[#F4F7FB] rounded-lg border border-[#E0E6EB] overflow-hidden">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`cursor-pointer px-4 py-2.5 transition-all border-r border-[#E0E6EB] ${viewMode === 'list' ? 'text-[#635BFF]' : 'bg-white text-[#29343D]'}`}
                    >
                        <TableOfContents size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`cursor-pointer px-4 py-2.5 transition-all ${viewMode === 'grid' ? 'text-[#635BFF]' : 'bg-white text-[#29343D]'}`}
                    >
                        <LayoutGrid size={20} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Conditional Rendering logic inside your original div */}
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' : 'flex flex-col gap-4'}`}>
                {files.map((file, index) => (
                    viewMode === 'grid' ? (
                        <File
                            key={index}
                            title={file.title}
                            createdBy={file.createdBy}
                        />
                    ) : (
                        <FileListItem
                            key={index}
                            title={file.title}
                            createdBy={file.createdBy}
                        />
                    )
                ))}
            </div>
        </div>
    );
}

