import React from 'react'
import PageHeaderWithButton from '../../common-component/PageHeaderWithButton'
import { Download, Plus } from 'lucide-react'
import ServiceCategoryTable from '../service-category/ServiceCategoryTable'

export default function BundleContent() {
    return (
        <div>

            <PageHeaderWithButton
                title="Services"
                buttons={[
                    // {
                    //     label: "Import Services",
                    //     href: "/salon-owner/team/member/import",
                    //     variant: "outline",
                    // },
                    {
                        label: "Export Data",
                        icon: <Download size={15} strokeWidth={2.5} />,
                        onClick: () => console.log("Export clicked"),
                        variant: "secondary",
                    },
                    {
                        label: "Add Service",
                        icon: <Plus size={15} strokeWidth={2.5} />,
                        onClick: () => console.log("Add clicked"),
                        variant: "primary",
                    },
                ]}
            />
            <ServiceCategoryTable />
        </div>
    )
}
