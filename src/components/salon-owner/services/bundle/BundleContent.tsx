import Link from 'next/link'
import PageHeaderWithButton from '../../common-component/PageHeaderWithButton'
import TableComponent from '../../common-component/Table'
import { Download, Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Bundle = {
    id: number
    name: string
    category: string
    relatedServices: number
}

const CATEGORY_STYLES: Record<string, string> = {
    "Category 1": "bg-[#DDDBFF] text-[#635BFF]",
    "Category 2": "bg-[#ECFDFD] text-[#16CDC7]",
    "Category 3": "bg-[#EBFAF0] text-[#36C76C]",
    "Category 4": "bg-[#FFF9E5] text-[#FFD648]",
    "Category 5": "bg-[#FFE5ED] text-[#FF6692]",
    "Category 6": "bg-[#F6F7F9] text-[#0A2540]",
}

const bundles: Bundle[] = [
    { id: 1, name: "Bundle 1", category: "Category 1", relatedServices: 1 },
    { id: 2, name: "Bundle 2", category: "Category 2", relatedServices: 1 },
    { id: 3, name: "Bundle 3", category: "Category 3", relatedServices: 1 },
    { id: 4, name: "Bundle 4", category: "Category 4", relatedServices: 1 },
    { id: 5, name: "Bundle 5", category: "Category 5", relatedServices: 1 },
    { id: 6, name: "Bundle 6", category: "Category 6", relatedServices: 1 },
    { id: 7, name: "Bundle 7", category: "Category 3", relatedServices: 1 },
    { id: 8, name: "Bundle 8", category: "Category 4", relatedServices: 1 },
    { id: 9, name: "Bundle 9", category: "Category 5", relatedServices: 1 },
    { id: 10, name: "Bundle 10", category: "Category 1", relatedServices: 1 },
]

const columns = [
    {
        key: "name",
        label: "Bundle Name",
    },
    {
        key: "category",
        label: "Category",
        render: (item: Bundle) => (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_STYLES[item.category]}`}>
                {item.category}
            </span>
        ),
    },
    {
        key: "relatedServices",
        label: "Related Services",
    },
    {
        key: "actions",
        label: "Actions",
        render: (item: Bundle) => (
            <div className="flex gap-2">
                <Link href={`/salon-owner/service/bundle/view-bundle/${item.id}`}>
                    <button
                        className="px-4 py-2.5 bg-[#EEEDFE] rounded-lg hover:bg-[#D9D7F1] transition-colors cursor-pointer"
                    >
                        <Eye size={15} className="text-[#635BFF]" />
                    </button>
                </Link>
                <button
                    className="px-4 py-2.5 bg-[#ECFDFD] rounded-lg hover:bg-[#D1F5F3] transition-colors cursor-pointer"
                >
                    <Pencil size={15} className="text-[#16CDC7]" />
                </button>
                <button
                    className="px-4 py-2.5 bg-[#FFE5ED] rounded-lg hover:bg-[#FADCE5] transition-colors cursor-pointer"
                >
                    <Trash2 size={15} className="text-[#FF6692]" />
                </button>
            </div>
        ),
    },
]

export default function BundleContent() {
    const router = useRouter()
    return (
        <div>
            <PageHeaderWithButton
                title="Bundles"
                buttons={[
                    {
                        label: "Export Data",
                        icon: <Download size={15} strokeWidth={2.5} />,
                        onClick: () => console.log("Export clicked"),
                        variant: "secondary",
                    },
                    {
                        label: "Add Bundle",
                        icon: <Plus size={15} strokeWidth={2.5} />,
                        onClick: () => router.push("/salon-owner/service/bundle/add-bundle"),
                        variant: "primary",
                    },
                ]}
            />
            <TableComponent
                data={bundles}
                columns={columns}
            />
        </div>
    )
}