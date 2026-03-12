// "use client";
// import { useState } from "react";
// import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
// import Sidebar from "@/components/accountProtal/Sidebar";
// import Topbar from "@/components/accountProtal/Topbar";
// import RescheduleAppointmentContent from "./RescheduleAppointmentContent";

// export const RescheduleAppointmentLayout = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <div className="flex h-screen rounded-3xl">
//       {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
//        */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         navigation={salonOwnerNavigation}
//         logoHref="/salon-owner/dashboard"
//       />

//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Topbar onMenuClick={() => setSidebarOpen(true)} />

//         <main className="flex-1 overflow-y-auto p-6 bg-[#F4F7FB] rounded-[20px]">
//           <RescheduleAppointmentContent />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default RescheduleAppointmentLayout;
"use client";
import { useState } from "react";
import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
import Sidebar from "@/components/accountProtal/Sidebar";
import Topbar from "@/components/accountProtal/Topbar";
import RescheduleAppointmentContent from "./RescheduleAppointmentContent";

export const RescheduleAppointmentLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    // h-screen locks the whole layout to viewport height — nothing overflows
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={salonOwnerNavigation}
        logoHref="/salon-owner/dashboard"
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        {/*
          - overflow-hidden: no page scroll
          - p-6:             your existing padding
          - flex flex-col:   lets RescheduleAppointmentContent stretch via h-full
        */}
        <main className="flex-1 overflow-hidden p-6 bg-[#F4F7FB] rounded-[20px] flex flex-col">
          <RescheduleAppointmentContent />
        </main>
      </div>
    </div>
  );
};

export default RescheduleAppointmentLayout;
