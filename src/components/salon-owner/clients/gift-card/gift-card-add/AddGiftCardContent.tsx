import IDashboard from "@/app/account-protal/svg/IDashboard";
import PageHeader from "@/components/salon-owner/common-component/PageHeader";
import AddGiftLogoCustomization from "./AddGiftLogoCustomization";
import AddGiftCardDetails from "./AddGiftCardDetails";



export default function AddGiftCardContent() {
    return (
        <>
            {/* ── Top Bar ── */}
            <PageHeader
                title="Add Gift Card"
                onBack={() => window.history.back()}
                HomeIcon={<IDashboard color="#98A4AE" size="15" />}
                breadcrumb={[
                    {
                        label: "Clients",
                        active: true,
                    },
                ]}
            />

            <div className="mt-[24px]">
                <AddGiftLogoCustomization />
            </div>
            <AddGiftCardDetails />
        </>
    )
}
