import Image from "next/image";
import Giftcarddetailsform from "./Giftcarddetailsform";
import AddGiftGallery from "./AddGiftGallery";

export default function AddGiftCardDetails() {


    return (
        <div className="min-h-screen bg-[#F4F6FA] font-manrope mt-[24px]">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT: FORM */}
                <Giftcarddetailsform />

                {/* RIGHT: PREVIEW */}
                <AddGiftGallery/>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end mt-5">
                <button className="bg-[#635BFF] text-white px-4 py-2.5 rounded-lg cursor-pointer">
                    Save
                </button>
            </div>
        </div>
    );
}