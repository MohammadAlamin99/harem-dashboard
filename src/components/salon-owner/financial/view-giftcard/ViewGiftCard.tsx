import { ChevronLeft } from "lucide-react";
import ViewGiftCardGallary from "../../clients/gift-card/view-gift-card/ViewGiftCardGallary";
import GiftCardUsageTable from "./GiftCardUsageTable";
import SendByEmailModal from "./SendByEmailModalProps";
import { useState } from "react";

export default function ViewGiftCard() {
  const services = ["Haircut", "Haircut", "Haircut", "Haircut"];
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="font-manrope">
      {/* TOP HEADER */}
      <div className="bg-white rounded-xl px-6 py-4 mb-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-sm text-[#29343D]">
          <button className="cursor-pointer hover:opacity-70 transition-opacity">
            <ChevronLeft size={16} className="text-[#635BFF]" />
          </button>
          <span className="text-base font-bold font-manrope text-[#29343D]">
            View Gift Card
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#e1e0ff] transition-colors cursor-pointer"
          >
            Send by Email
          </button>
          <div className="flex items-center gap-2 text-sm text-[#98A4AE]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.3735 1.45703H5.46016C6.2085 1.45703 6.8335 1.45703 7.3285 1.5237C7.85183 1.5937 8.32433 1.7487 8.7035 2.12786C9.0835 2.50786 9.2385 2.98036 9.3085 3.50286C9.37516 3.9987 9.37516 4.6237 9.37516 5.37203V14.6254C9.37516 15.3745 9.37516 15.9987 9.3085 16.4937C9.2385 17.017 9.0835 17.4895 8.7035 17.8687C8.32433 18.2487 7.85183 18.4037 7.3285 18.4737C6.8335 18.5404 6.2085 18.5404 5.46016 18.5404H5.3735C4.62516 18.5404 4.00016 18.5404 3.50516 18.4737C2.98183 18.4037 2.50933 18.2487 2.13016 17.8687C1.75016 17.4895 1.59516 17.017 1.52516 16.4937C1.4585 15.9987 1.4585 15.3745 1.4585 14.6254V5.37203C1.4585 4.6237 1.4585 3.9987 1.52516 3.5037C1.59516 2.98036 1.75016 2.50786 2.12933 2.1287C2.50933 1.7487 2.98183 1.5937 3.50433 1.5237C4.00016 1.45703 4.62516 1.45703 5.3735 1.45703ZM3.671 2.76286C3.28683 2.81453 3.12183 2.9037 3.0135 3.01286C2.90516 3.12203 2.816 3.28536 2.7635 3.66953C2.71016 4.07203 2.7085 4.61203 2.7085 5.41536V14.582C2.7085 15.3854 2.71016 15.9254 2.76433 16.3279C2.816 16.712 2.90516 16.877 3.01433 16.9854C3.1235 17.0937 3.28683 17.1829 3.671 17.2354C4.0735 17.2887 4.6135 17.2904 5.41683 17.2904C6.22016 17.2904 6.76016 17.2887 7.16266 17.2345C7.54683 17.1829 7.71183 17.0937 7.82016 16.9845C7.9285 16.8754 8.01766 16.712 8.07016 16.3279C8.1235 15.9254 8.12516 15.3854 8.12516 14.582V5.41536C8.12516 4.61203 8.1235 4.07203 8.06933 3.66953C8.01766 3.28536 7.9285 3.12036 7.81933 3.01203C7.71016 2.9037 7.54683 2.81453 7.16266 2.76203C6.76016 2.70953 6.22016 2.70703 5.41683 2.70703C4.6135 2.70703 4.0735 2.7087 3.671 2.76286ZM14.5402 8.95703H14.6268C15.376 8.95703 16.0002 8.95703 16.4952 9.0237C17.0185 9.0937 17.491 9.2487 17.8702 9.6287C18.2502 10.0079 18.4052 10.4804 18.4752 11.0037C18.5418 11.4987 18.5418 12.1237 18.5418 12.872V14.6254C18.5418 15.3745 18.5418 15.9987 18.4752 16.4937C18.4052 17.017 18.2502 17.4895 17.8702 17.8687C17.491 18.2487 17.0185 18.4037 16.4952 18.4737C16.0002 18.5404 15.376 18.5404 14.6268 18.5404H14.5402C13.7918 18.5404 13.1668 18.5404 12.6718 18.4737C12.1485 18.4037 11.676 18.2487 11.2968 17.8687C10.9168 17.4895 10.7618 17.017 10.6918 16.4937C10.6252 15.9987 10.6252 15.3745 10.6252 14.6254V12.872C10.6252 12.1229 10.6252 11.4987 10.6918 11.0037C10.7618 10.4804 10.9168 10.0079 11.2968 9.6287C11.676 9.2487 12.1485 9.0937 12.6718 9.0237C13.1668 8.95703 13.791 8.95703 14.5402 8.95703ZM12.8377 10.262C12.4535 10.3145 12.2885 10.4037 12.1802 10.512C12.0718 10.6204 11.9827 10.7854 11.9302 11.1704C11.8768 11.572 11.8752 12.112 11.8752 12.9154V14.582C11.8752 15.3854 11.8768 15.9254 11.9302 16.3279C11.9827 16.712 12.0718 16.877 12.1802 16.9854C12.2885 17.0937 12.4535 17.1829 12.8385 17.2354C13.2402 17.2887 13.7802 17.2904 14.5835 17.2904C15.3868 17.2904 15.9268 17.2887 16.3293 17.2345C16.7135 17.1829 16.8785 17.0937 16.9868 16.9845C17.0952 16.8754 17.1843 16.712 17.2368 16.3279C17.2902 15.9254 17.2918 15.3854 17.2918 14.582V12.9154C17.2918 12.112 17.2902 11.572 17.236 11.1695C17.1843 10.7854 17.0952 10.6204 16.986 10.512C16.8768 10.4037 16.7135 10.3145 16.3293 10.262C15.9268 10.2087 15.3868 10.207 14.5835 10.207C13.7802 10.207 13.2402 10.2087 12.8377 10.262ZM13.7293 1.45703C13.3585 1.45703 13.0493 1.45703 12.796 1.4737C12.537 1.48413 12.2816 1.53764 12.0402 1.63203C11.762 1.74711 11.5093 1.91584 11.2964 2.1286C11.0835 2.34137 10.9146 2.59398 10.7993 2.87203C10.6993 3.1137 10.6602 3.3637 10.6427 3.62786C10.6252 3.8812 10.6252 4.19036 10.6252 4.5612V4.60286C10.6252 4.9737 10.6252 5.28286 10.6418 5.5362C10.6602 5.80036 10.7002 6.05036 10.8002 6.29203C10.9152 6.57016 11.084 6.82289 11.2967 7.03579C11.5095 7.2487 11.7621 7.4176 12.0402 7.53287C12.2818 7.63286 12.5318 7.67203 12.796 7.68953C13.0493 7.70703 13.3585 7.70703 13.7293 7.70703H15.4377C15.8085 7.70703 16.1177 7.70703 16.371 7.69036C16.63 7.67993 16.8854 7.62642 17.1268 7.53203C17.405 7.41696 17.6577 7.24822 17.8706 7.03546C18.0835 6.8227 18.2524 6.57008 18.3677 6.29203C18.4677 6.05036 18.5068 5.80036 18.5243 5.5362C18.5418 5.28286 18.5418 4.9737 18.5418 4.60286V4.5612C18.5418 4.19036 18.5418 3.8812 18.5252 3.62786C18.5147 3.36887 18.4612 3.11343 18.3668 2.87203C18.2518 2.59391 18.083 2.34117 17.8703 2.12827C17.6575 1.91537 17.4049 1.74646 17.1268 1.6312C16.8852 1.5312 16.6352 1.49203 16.371 1.47453C16.1177 1.45703 15.8085 1.45703 15.4377 1.45703H13.7293ZM12.5185 2.7862C12.5827 2.75953 12.6802 2.73536 12.881 2.7212C13.0868 2.70703 13.3535 2.70703 13.7502 2.70703H15.4168C15.8135 2.70703 16.0802 2.70703 16.286 2.7212C16.4868 2.73536 16.5843 2.75953 16.6485 2.7862C16.9043 2.89203 17.1068 3.09453 17.2127 3.35036C17.2393 3.41453 17.2635 3.51203 17.2777 3.71286C17.2918 3.9187 17.2918 4.18536 17.2918 4.58203C17.2918 4.9787 17.2918 5.24536 17.2777 5.4512C17.2635 5.65203 17.2393 5.74953 17.2127 5.8137C17.1603 5.9402 17.0835 6.05513 16.9867 6.15194C16.8899 6.24874 16.775 6.32551 16.6485 6.37786C16.5843 6.40453 16.4868 6.4287 16.286 6.44286C16.0802 6.45703 15.8135 6.45703 15.4168 6.45703H13.7502C13.3535 6.45703 13.0868 6.45703 12.881 6.44286C12.6802 6.4287 12.5827 6.40453 12.5185 6.37786C12.392 6.32551 12.2771 6.24874 12.1803 6.15194C12.0835 6.05513 12.0067 5.9402 11.9543 5.8137C11.9277 5.74953 11.9035 5.65203 11.8893 5.4512C11.8757 5.16169 11.871 4.87183 11.8752 4.58203C11.8752 4.18536 11.8752 3.9187 11.8893 3.71286C11.9035 3.51203 11.9277 3.41453 11.9543 3.35036C12.0602 3.09453 12.2627 2.89203 12.5185 2.7862Z"
                fill="#98A4AE"
              />
            </svg>
            <span className="text-[#29343D]">/</span>
            <span className="bg-[#F0EEFF] text-[#635BFF] px-3 py-1 rounded-md font-bold text-xs">
              Sales
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        {/* LEFT COLUMN: GIFT CARD DETAILS */}
        <div className="bg-white rounded-xl p:[15px] md:p-[30px] shadow-sm">
          <h2 className="text-xl font-bold text-[#29343D] mb-10">
            Gift Card Details
          </h2>

          <div className="grid grid-cols-2 gap-y-10 mb-10">
            {/* Client & Amount */}
            <div>
              <p className="text-xs font-normal text-[#999]">Client</p>
              <p className="text-base font-bold text-[#29343D]">
                Maria Rodriguez
              </p>
            </div>
            <div>
              <p className="text-xs font-normal text-[#999]">Ammount</p>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-[#29343D]">
                  € 200
                </span>
                <span className="border border-[#FF6692] text-[#FF6692] text-[12px] font-medium px-2.5 rounded-full leading-5">
                  Hidden
                </span>
              </div>
            </div>

            {/* Salon & Website */}
            <div>
              <p className="text-xs font-normal text-[#999]">
                Salon Name
              </p>
              <p className="text-base font-bold text-[#29343D]">
                CDJ HAREM ACCONCIATURE
              </p>
            </div>
            <div>
              <p className="text-xs font-normal text-[#999]">Website</p>
              <p className="text-base font-bold text-[#29343D]">
                www.degradejoellemassafra.it
              </p>
            </div>

            {/* Address (Full Row) */}
            <div className="col-span-2">
              <p className="text-xs font-normal text-[#999]">Address</p>
              <p className="text-base font-bold text-[#29343D]">
                Via Redipuglia 44/A - MASSAFRA (TA)
              </p>
            </div>

            {/* Dates */}
            <div>
              <p className="text-xs font-normal text-[#999]">
                Date of Issue
              </p>
              <p className="text-base font-bold text-[#29343D]">02/09/2025</p>
            </div>
            <div>
              <p className="text-xs font-normal text-[#999]">
                Date of Expiration
              </p>
              <p className="text-base font-bold text-[#29343D]">02/20/2025</p>
            </div>

            {/* Usage Limit */}
            <div>
              <p className="text-xs font-normal text-[#999]">
                Usage Limit
              </p>
              <p className="text-base font-bold text-[#29343D]">1</p>
            </div>
          </div>

          {/* Eligible Services */}
          <div className="mb-10">
            <p className="text-xs font-medium text-[#98A4AE] mb-3">
              Eligible Services
            </p>
            <div className="flex flex-wrap gap-2">
              {services.map((s, i) => (
                <span
                  key={i}
                  className="bg-[#DDDBFF] text-[#635BFF] px-2.5 py-1 rounded-full font-bold text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Receiver & Gifter */}
          <div className="grid grid-cols-2 gap-y-10 mb-10">
            <div>
              <p className="text-xs font-normal text-[#999]">
                Receiver Name
              </p>
              <p className="text-base font-bold text-[#29343D]">
                Receiver Name
              </p>
            </div>
            <div>
              <p className="text-xs font-normal text-[#999]">
                Gifter Name
              </p>
              <p className="text-base font-bold text-[#29343D]">Gifter Name</p>
            </div>
          </div>

          {/* Long Description Address */}
          <div>
            <p className="text-xs font-normal text-[#999]">Address</p>
            <p className="text-sm font-bold text-[#29343D] leading-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        {/* PREVIEW */}
        <ViewGiftCardGallary />
      </div>

      {/* table */}
      <div className="bg-white rounded-xl mt-6">
        <h1 className="font-manrope font-semibold text-lg text-[#29343D] px-[15px] md:px-[30px] pt-[15px] md:pt-[30px] mb-[-24px]">
          Usage History
        </h1>
        <GiftCardUsageTable />
      </div>

      {showModal && (
        <SendByEmailModal
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
