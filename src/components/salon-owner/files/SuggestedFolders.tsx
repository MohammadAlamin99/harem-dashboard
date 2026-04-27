
import FileCard from "./FileCard";
import SuggestedFiles from "./SuggestedFiles";

export default function SuggestedFolders() {
    return (
        <>
            <div className="bg-white rounded-xl mt-6 md:p-[30px] p-[15px]">
                <div className="flex items-center justify-between py-2.5 mb-4">
                    <h2 className="font-manrope text-base font-bold text-[#29343D]">Suggested Folders</h2>
                    <button className="font-manrope text-sm font-medium text-[#635BFF] border border-[#635BFF] px-4 py-2.5 rounded-lg cursor-pointer">
                        View More
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FileCard
                        title="Employees"
                        createdBy="Maria Rodriguez"
                    />
                    <FileCard
                        title="Accountant"
                        createdBy="Maria Rodriguez"
                    />
                    <FileCard
                        title="Name"
                        createdBy="Maria Rodriguez"
                    />
                    <FileCard
                        title="Name"
                        createdBy="Maria Rodriguez"
                    />
                </div>
            </div>

            {/* suggest files */}

            <SuggestedFiles />
        </>
    )
}
