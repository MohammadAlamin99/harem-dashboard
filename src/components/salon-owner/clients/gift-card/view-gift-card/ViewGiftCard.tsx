
import ViewGiftCardDetails from "./ViewGiftCardDetails";
import ViewGiftCardGallary from "./ViewGiftCardGallary";

export default function ViewGiftCard() {
    return (
        <>
            <div className="min-h-screen bg-[#F4F6FA] font-manrope mt-[24px]">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* FORM */}
                    <ViewGiftCardDetails />
                    {/* PREVIEW */}
                    <ViewGiftCardGallary />
                </div>
            </div>
        </>
    )
}
