import { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import Uploadfilesmodal from './Uploadfilesmodal';
import Createfoldermodal from './Createfoldermodal';

const FileHeader = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    return (
        <div className="font-manrope w-full">
            {/* Top Breadcrumb/Title Bar */}
            <div className="w-full bg-white rounded-xl px-6 py-4">
                <h1 className="text-[#29343D] font-bold text-base">Files</h1>
            </div>

            {/* Action Buttons Container */}
            <div className="flex gap-4 mt-6">
                {/* Upload Button */}
                <button onClick={() => setIsUploadModalOpen(true)} className="flex flex-col justify-between items-start w-[160px] cursor-pointer
                 bg-[#635BFF] hover:bg-[#5558e6] text-white p-5 rounded-xl transition-all duration-200">
                    <Upload size={22} strokeWidth={2.5} />
                    <span className="font-bold text-lg leading-tight">Upload</span>
                </button>
                {isUploadModalOpen && (
                    <Uploadfilesmodal
                        isOpen={isUploadModalOpen}
                        onClose={() => setIsUploadModalOpen(false)}
                    />
                )}

                {
                    isCreateFolderModalOpen && (
                        <Createfoldermodal
                            isOpen={isCreateFolderModalOpen}
                            onClose={() => setIsCreateFolderModalOpen(false)}
                        />
                    )
                }



                {/* Create Folder Button */}
                <button onClick={() => setIsCreateFolderModalOpen(true)} className="cursor-pointer flex flex-col gap-4 justify-between items-start w-[160px] bg-[#DDDBFF] hover:bg-[#d1daff] text-[#6366f1] p-5 rounded-xl transition-all duration-200">
                    <Plus size={24} strokeWidth={2.5} color="#635BFF" />
                    <span className="font-bold text-lg leading-tight text-[#635BFF]">Create Folder</span>
                </button>
            </div>
        </div>
    );
};

export default FileHeader;