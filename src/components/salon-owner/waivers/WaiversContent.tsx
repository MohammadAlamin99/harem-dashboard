import { Plus } from "lucide-react";
import PageHeaderWithButton from "../common-component/PageHeaderWithButton";
import WaiverTemplateTable from "./WaiverTemplateTable";

export default function WaiversContent() {
    return (
        <div>

            <PageHeaderWithButton
                title="Waivers"
                buttons={[
                    {
                        label: "Add Waiver",
                        href: "/salon-owner/waivers/add-waiver",
                        variant: "primary",
                        icon: <Plus size={16} />
                    }
                ]}

            />
            <div className="mt-6">
                <WaiverTemplateTable />
            </div>
        </div>
    )
}
