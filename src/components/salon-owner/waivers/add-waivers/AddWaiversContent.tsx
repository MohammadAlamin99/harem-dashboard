import IDashboard from "@/app/account-protal/svg/IDashboard";
import PageHeader from "../../common-component/PageHeader";
import WaiverBasicDetails from "./WaiverBasicDetails";
import WaiverFieldsManager from "./WaiverFieldsManager";

export default function AddWaiversContent() {
    return (
        <>
            <PageHeader
                title="Add Waiver"
                onBack={() => { }}
                HomeIcon={
                    <IDashboard color="#98A4AE" size="17" />
                }
                breadcrumb={[
                    { label: "Waiver Templates", active: true }
                ]}
            />

            <WaiverBasicDetails />
            <WaiverFieldsManager />
            <div className="flex justify-end pt-4">
                <button className="bg-[#635BFF] text-white px-4 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-[#4F46E5] transition-all">
                    Save Template
                </button>
            </div>
        </>
    )
}
