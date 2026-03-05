import ICalaender from "@/app/account-protal/svg/ICalaender";
import IDashboard from "@/app/account-protal/svg/IDashboard";
// import IOverview from "@/app/account-protal/svg/IOverview";
// import ISales from "@/app/account-protal/svg/ISales";
// import IUpload from "@/app/account-protal/svg/IUpload";

export const salonOwnerNavigation = [
  {
    label: "Dashboard",
    href: "/salon-owner/dashboard",
    matchUrls: ["/salon-owner/dashboard", "/salon-owner/dashboard/checkout"],
    icon: IDashboard,
  },

  // {
  //   label: "Salaries",
  //   icon: ISales,
  //   children: [
  //     {
  //       label: "Overview",
  //       href: "/admin/salaries/overview",
  //       icon: IOverview,
  //     },
  //     {
  //       label: "Upload",
  //       href: "/admin/salaries/upload",
  //       icon: IUpload,
  //     },
  //   ],
  // },
  {
    label: "Appointments",
    href: "/salon-owner/appointment",
    icon: ICalaender,
  },
];
