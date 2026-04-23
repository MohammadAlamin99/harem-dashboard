"use client";

export default function WaiverPreviewCard() {
    const sections = [
        {
            title: "What is Lorem Ipsum?",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            title: "What is Lorem Ipsum?",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            title: "What is Lorem Ipsum?",
            content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ];

    return (
        <div className="font-manrope border border-[#E0E6EB] bg-white rounded-2xl overflow-hidden">
            {/* Main Container */}
            <div className="bg-white h-[600px] flex flex-col">

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                    {/* Waiver Title */}
                    <h1 className="text-[#29343D] text-xl font-bold mb-8">
                        Waiver Name
                    </h1>

                    {/* Waiver Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-[#29343D] text-sm font-bold mb-2">
                                    {section.title}
                                </h2>
                                <p className="text-[#A3B1BB] text-sm leading-[1.6] text-justify">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}