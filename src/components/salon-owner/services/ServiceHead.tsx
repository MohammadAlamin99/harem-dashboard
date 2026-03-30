import { useState } from "react"
import { Download, Plus } from "lucide-react"
import PageHeaderWithButton from "../common-component/PageHeaderWithButton"
import HeaderFilter from "../common-component/HeaderFilter";

export default function ServiceHead({ handleOptionClick }: { handleOptionClick: (option: string) => void }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    return (
        <div className="font-manrope">
            <div className="bg-white rounded-[8px]">

                {/* Top Row */}
                <PageHeaderWithButton title="Services"
                    buttons={[
                        {
                            label: "Import Services",
                            href: "/salon-owner/team/member/import",
                            variant: "outline",
                        },
                        {
                            label: "Export Data",
                            icon: <Download size={15} strokeWidth={2.5} />,
                            variant: "secondary",
                        },
                        {
                            label: "Add Service",
                            icon: <Plus size={15} strokeWidth={2.5} />,
                            href: "/salon-owner/service/services/add-service",
                            variant: "primary",
                        },
                    ]}
                />

                {/* Filter Row */}
                <HeaderFilter
                    title="Categories"
                    categories={[
                        { label: "All", value: "all" },
                        { label: "Category 1", value: "category-1" },
                        { label: "Category 2", value: "category-2" },
                        { label: "Category 3", value: "category-3" },
                        { label: "Category 4", value: "category-4" },
                    ]}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                    showFilterIcon={true}
                />
            </div>

        </div>
    )
}