import PageHeaderWithButton from '../../common-component/PageHeaderWithButton'
import { Download, Plus } from 'lucide-react'
import ServiceCategoryTable from './ServiceCategoryTable'
import AddServiceCategoryMoal from './AddServiceCategoryMoal'
import { useState } from 'react'

export default function ServiceCategoryContent() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div>
            <PageHeaderWithButton
                title="Services"
                buttons={[
                    {
                        label: "Export Data",
                        icon: <Download size={15} strokeWidth={2.5} />,
                        onClick: () => console.log("Export clicked"),
                        variant: "secondary",
                    },
                    {
                        label: "Add Category",
                        icon: <Plus size={15} strokeWidth={2.5} />,
                        onClick: () => setIsModalOpen(true),
                        variant: "primary",
                    },
                ]}
            />
            <ServiceCategoryTable />
            <AddServiceCategoryMoal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={(data) => {
                    console.log("New Category:", data)
                    setIsModalOpen(false)
                }}
            />
        </div>
    )
}
