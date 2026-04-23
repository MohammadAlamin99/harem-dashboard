import IDashboard from "@/app/account-protal/svg/IDashboard";
import PageHeader from "../../common-component/PageHeader";
import WaiverPreviewCard from "./WaiverPreviewCard";
import WaiverFieldsManager from "../add-waivers/WaiverFieldsManager";

export default function ViewWaiverContent() {
    return (
        <>
            <PageHeader
                title="View Waiver"
                onBack={() => { }}
                HomeIcon={
                    <IDashboard color="#98A4AE" size="17" />
                }
                breadcrumb={[
                    { label: "Waiver Templates", active: true }
                ]}
            />

            <div className="mt-6">
                <WaiverPreviewCard />
            </div>
            <WaiverFieldsManager />


        </>
    )
}
