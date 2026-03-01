// "use client";
// import React, { useState } from "react";
// import { X, Menu, ChevronDown } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import IDashboard from "@/app/account-protal/svg/IDashboard";
// import ISales from "@/app/account-protal/svg/ISales";
// import ITex from "@/app/account-protal/svg/ITex";
// import IDocument from "@/app/account-protal/svg/IDocument";
// import IBudget from "@/app/account-protal/svg/IBudget";
// import IHome from "@/app/account-protal/svg/IHome";
// import IOverview from "@/app/account-protal/svg/IOverview";
// import IOwnerDoc from "@/app/account-protal/svg/IOwnerDoc";
// import IContracts from "@/app/account-protal/svg/IContracts";
// import IEmployee from "@/app/account-protal/svg/IEmployee";
// import IExpense from "@/app/account-protal/svg/IExpense";
// import IUpload from "@/app/account-protal/svg/IUpload";
// import IPending from "@/app/account-protal/svg/IPending";
// import IHistory from "@/app/account-protal/svg/IHistory";
// import IIncome from "@/app/account-protal/svg/IIncome";
// import IPayments from "@/app/account-protal/svg/IPayments";
// import IReceipts from "@/app/account-protal/svg/IReceipts";
// import ISalons from "@/app/account-protal/svg/ISalons";
// import IPendingInvite from "@/app/account-protal/svg/IPendingInvite";
// import IRequest from "@/app/account-protal/svg/IRequest";
// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface NavItemData {
//   label: string;
//   icon?: React.ReactElement;
//   children?: NavSubItem[];
// }

// interface NavSubItem {
//   label: string;
//   isActive?: boolean;
//   icon: React.ReactElement;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);
//   const [activeItem, setActiveItem] = useState<string>("Dashboard");

//   const toggleExpand = (label: string, children?: NavSubItem[]) => {
//     if (expandedItem === label) {
//       setExpandedItem(null);
//     } else {
//       setExpandedItem(label);
//       if (children && children.length > 0) {
//         setActiveItem(children[0].label);
//       }
//     }
//   };

//   const navItems: NavItemData[] = [
//     {
//       label: "Dashboard",
//       icon: <IDashboard width={20} height={20} fill="white" />,
//     },
//     {
//       label: "Salaries",
//       icon: <ISales color="#98A4AE" />,
//       children: [
//         { label: "Overview", icon: <IOverview color="#635BFF" /> },
//         { label: "New Upload", icon: <IUpload color="#635BFF" /> },
//         { label: "Pending & Declined", icon: <IPending color="#635BFF" /> },
//         { label: "History", icon: <IHistory color="#635BFF" /> },
//       ],
//     },
//     {
//       label: "Taxes & Compliance",
//       icon: <ITex color="#98A4AE" />,
//       children: [
//         { label: "Overview", icon: <IOverview color="#635BFF" /> },
//         { label: "Pending & Declined", icon: <IPending color="#635BFF" /> },
//         { label: "History", icon: <IHistory color="#635BFF" /> },
//       ],
//     },
//     {
//       label: "Documents",
//       icon: <IDocument color="#98A4AE" />,
//       children: [
//         { label: "Overview", icon: <IOverview color="#635BFF" /> },
//         { label: "New Upload", icon: <IUpload color="#635BFF" /> },
//         { label: "Employee Notes", icon: <IEmployee color="#635BFF" /> },
//         { label: "Contracts", icon: <IContracts color="#635BFF" /> },
//         { label: "Owner Documents", icon: <IOwnerDoc color="#635BFF" /> },
//       ],
//     },
//     {
//       label: "Budgeting & Finances",
//       icon: <IBudget color="#98A4AE" />,
//       children: [
//         { label: "Overview", icon: <IOverview color="#635BFF" /> },
//         { label: "Expense Management", icon: <IExpense color="#635BFF" /> },
//         { label: "Income & Revenue", icon: <IIncome color="#635BFF" /> },
//         { label: "Payments", icon: <IPayments color="#635BFF" /> },
//         { label: "Receipts", icon: <IReceipts color="#635BFF" /> },
//       ],
//     },
//     {
//       label: "Salons & Invitations",
//       icon: <IHome color="#98A4AE" />,
//       children: [
//         { label: "My Salons", icon: <ISalons color="#635BFF" /> },
//         { label: "Pending Invitations", icon: <IPendingInvite color="#635BFF" /> },
//         { label: "Request Access", icon: <IRequest color="#635BFF" /> },

//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}
//       <aside
//         className={`fixed z-50 lg:static top-0 left-0 h-full w-75 bg-white transform transition-transform duration-300
//                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-4 px-4 headerLogo">
//           <button className="mt-1">
//             <Menu width={24} height={24} color="#29343D" />
//           </button>
//           <Link href="/account-protal/dashboard" className="flex-1">
//             <Image
//               src={"/images/logo.svg"}
//               width={135}
//               height={40}
//               alt="logo"
//             />
//           </Link>
//           <button className="lg:hidden" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-3 lg:p-4 mt-2 lg:mt-3 space-y-1 lg:space-y-3">
//           <h4 className="text-[#98A4AE] text-xs ml-4 font-manrope uppercase tracking-wide mb-3 lg:mb-4">
//             Main
//           </h4>

//           {navItems.map((item) => (
//             <div key={item.label}>
//               {item.children && item.children.length > 0 ? (
//                 /* Parent with children - all in one container */
//                 <div
//                   className={`${expandedItem === item.label ? "bg-[#F1F2FE] rounded-lg" : ""}`}
//                 >
//                   {/* Parent item with children */}
//                   <button
//                     onClick={() => toggleExpand(item.label, item.children)}
//                     className={`w-full flex items-center justify-between font-manrope gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition text-[15px] ${expandedItem === item.label
//                       ? "bg-transparent text-[#635BFF] font-semibold"
//                       : "text-[#29343D] hover:bg-[#F3F4F7] font-normal"
//                       }`}
//                   >
//                     <div className="flex items-center gap-2.5">
//                       {expandedItem === item.label ? (
//                         <div className="text-[#29343D]">
//                           {/* Change icon color when active */}
//                           {React.cloneElement(item?.icon, { color: "#635BFF" })}
//                         </div>
//                       ) : (
//                         item.icon
//                       )}
//                       <span
//                         className={
//                           expandedItem === item.label ? "font-semibold" : "font-normal"
//                         }
//                       >
//                         {item.label}
//                       </span>
//                     </div>
//                     <ChevronDown
//                       size={24}
//                       className={`transition-transform color-[#29343D] ${expandedItem === item.label ? "rotate-180" : ""
//                         } ${expandedItem === item.label ? "text-[#635BFF]" : ""}`}
//                     />
//                   </button>

//                   {/* Sub-items inside the same container */}
//                   {expandedItem === item.label && (
//                     <div className="space-y-2 px-2 pb-2">
//                       {item.children.map((subItem) => (
//                         <button
//                           key={subItem.label}
//                           onClick={() => setActiveItem(subItem.label)}
//                           className={`w-full flex items-center gap-2.5 px-3 py-2.5 font-manrope rounded-lg cursor-pointer transition text-[15px] font-normal ${activeItem === subItem.label
//                             ? "bg-[#635BFF] text-white shadow-[0_8px_20px_-8px_rgba(77,91,236,0.23)] font-semibold"
//                             : "text-[#635BFF] bg-[#DDDBFF]"
//                             }`}
//                         >
//                           {/* Sub-item icon and text color when active */}
//                           {activeItem === subItem.label
//                             ? React.cloneElement(subItem.icon, { color: "white" })
//                             : subItem.icon}
//                           <span
//                             className={activeItem === subItem.label ? "text-white" : ""}
//                           >
//                             {subItem.label}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 /* Item without children - Dashboard */
//                 <button
//                   onClick={() => setActiveItem(item.label)}
//                   className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition ${activeItem === item.label
//                     ? "bg-[#635BFF] text-white shadow-[0_8px_20px_-8px_rgba(77,91,236,0.23)] font-semibold"
//                     : "text-[#29343D] hover:bg-[#F3F4F7] font-normal"
//                     }`}
//                 >
//                   {/* Parent Icon active state */}
//                   {activeItem === item.label ? (
//                     <IDashboard width={20} height={20} fill="white" />
//                   ) : (
//                     <IDashboard width={20} height={20} fill="#98A4AE" />
//                   )}
//                   <span className="text-sm font-manrope">{item.label}</span>
//                 </button>
//               )}
//             </div>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
"use client";

import React, { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<any>;
  children?: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  logoHref: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  navigation,
  logoHref,
}) => {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const activeParent = navigation.find((item) =>
      item.children?.some((child) => pathname.startsWith(child.href || "")),
    );
    if (activeParent) {
      setExpandedItem(activeParent.label);
    }
  }, [pathname, navigation]);

  const isActive = (href?: string) => pathname === href;

  const isChildActive = (item: NavItem) =>
    item.children?.some((child) => pathname.startsWith(child.href || ""));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-50 lg:static top-0 left-0 h-full w-75 max-[1400px]:w-[200px] max-[992px]:w-[50%] max-[768px]:w-[80%] bg-white transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* HEADER  */}
        <div className="flex items-center gap-4 px-4 headerLogo">
          <button className="mt-1 cursor-pointer">
            <Menu width={24} height={24} color="#29343D" />
          </button>

          <Link href={logoHref} className="flex-1 cursor-pointer">
            <Image
              src={"/images/logo.svg"}
              width={135}
              height={40}
              alt="logo"
            />
          </Link>

          <button className="lg:hidden cursor-pointer" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="p-3 lg:p-4 mt-2 lg:mt-3 space-y-1 lg:space-y-3">
          <h4 className="text-[#98A4AE] text-xs ml-4 font-manrope uppercase tracking-wide mb-3 lg:mb-4">
            Main
          </h4>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const childActive = isChildActive(item);
            const expanded = expandedItem === item.label;

            if (item.children && item.children.length > 0) {
              return (
                <div key={item.label}>
                  <div
                    className={`${expanded ? "bg-[#F1F2FE] rounded-lg" : ""}`}
                  >
                    <button
                      onClick={() =>
                        setExpandedItem(expanded ? null : item.label)
                      }
                      className={`w-full flex items-center justify-between font-manrope gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition text-[15px]
                      ${
                        expanded
                          ? "bg-transparent text-[#635BFF] font-semibold"
                          : "text-[#29343D] hover:bg-[#F3F4F7] font-normal"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon color={expanded ? "#635BFF" : "#98A4AE"} />
                        <span
                          className={expanded ? "font-semibold" : "font-normal"}
                        >
                          {item.label}
                        </span>
                      </div>

                      <ChevronDown
                        size={24}
                        className={`transition-transform ${
                          expanded ? "rotate-180 text-[#635BFF]" : ""
                        }`}
                      />
                    </button>

                    {expanded && (
                      <div className="space-y-2 px-2 pb-2">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          const childIsActive = isActive(child.href);

                          return (
                            <Link
                              key={child.label}
                              href={child.href || "#"}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 font-manrope rounded-lg cursor-pointer transition text-[15px] font-normal
                              ${
                                childIsActive
                                  ? "bg-[#635BFF] text-white shadow-[0_8px_20px_-8px_rgba(77,91,236,0.23)] font-semibold"
                                  : "text-[#635BFF] bg-[#DDDBFF]"
                              }`}
                            >
                              <ChildIcon
                                color={childIsActive ? "white" : "#635BFF"}
                              />
                              <span
                                className={childIsActive ? "text-white" : ""}
                              >
                                {child.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition
                ${
                  active
                    ? "bg-[#635BFF] text-white shadow-[0_8px_20px_-8px_rgba(77,91,236,0.23)] font-semibold"
                    : "text-[#29343D] hover:bg-[#F3F4F7] font-normal"
                }`}
              >
                <Icon color={active ? "white" : "#98A4AE"} />
                <span className="text-sm font-manrope">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
