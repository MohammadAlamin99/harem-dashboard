"use client";
const loyalCustomers = [
    {
        id: 1,
        name: "Sofa Biachi",
        lastVisit: "November 27, 2024",
        appointments: 25,
        totalSpent: "1,700",
    },
    {
        id: 2,
        name: "Guy Hawkins",
        lastVisit: "October 04, 2024",
        appointments: 24,
        totalSpent: "1,500",
    },
    {
        id: 3,
        name: "Cameron Williamson",
        lastVisit: "December 20, 2024",
        appointments: 20,
        totalSpent: "1,200",
    },
];

const LoyalCustomers = () => {
    return (
        <div className="w-full bg-white p-8 rounded-[16px] border border-[#E0E6EB] font-manrope">
            <h3 className="text-[18px] font-bold text-[#29343D] mb-8">Most Loyal Customers</h3>

            <div className="flex flex-col gap-4">
                {loyalCustomers.map((customer) => (
                    <div
                        key={customer.id}
                        className="flex items-center justify-between p-6 bg-white border border-[#E0E6EB] rounded-[16px] transition-all"
                    >
                        {/* Left Section: Rank and Info */}
                        <div className="flex items-center gap-4">
                            {/* Rank Badge */}
                            <div className="w-8 h-8 flex items-center justify-center bg-[#635BFF] text-white text-[14px] font-bold rounded-[8px]">
                                {customer.id}
                            </div>

                            {/* Customer Details */}
                            <div>
                                <p className="text-[15px] font-bold text-[#29343D]">{customer.name}</p>
                                <p className="text-[12px] font-medium text-[#98A4AE] mt-0.5">
                                    Last Visit: {customer.lastVisit}
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Stats */}
                        <div className="flex gap-3 text-right">
                            {/* Appointments Stat */}
                            <div>
                                <p className="text-[20px] font-bold text-[#29343D]">{customer.appointments}</p>
                                <p className="text-[12px] font-medium text-[#98A4AE] uppercase tracking-tight">Appoiments</p>
                            </div>

                            {/* Total Spent Stat */}
                            <div>
                                <p className="text-[20px] font-bold text-[#36C76C]">€ {customer.totalSpent}</p>
                                <p className="text-[12px] font-medium text-[#98A4AE] uppercase tracking-tight">Total Spent</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoyalCustomers;