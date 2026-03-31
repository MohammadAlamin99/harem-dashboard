import PageHeaderWithButton from '../../common-component/PageHeaderWithButton'
import { Download, Plus } from 'lucide-react'
import ServiceCategoryTable from '../service-category/ServiceCategoryTable'
import { useRouter } from 'next/navigation'
export default function BundleContent() {
    const router = useRouter();
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
                        label: "Add Bundle",
                        icon: <Plus size={15} strokeWidth={2.5} />,
                        onClick: () => router.push("/salon-owner/service/bundle/add-bundle"),
                        variant: "primary",
                    },
                ]}
            />
            <ServiceCategoryTable />
        </div>
    )
}
