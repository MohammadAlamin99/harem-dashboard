import ICalaender from "@/app/account-protal/svg/ICalaender";
import IDashboard from "@/app/account-protal/svg/IDashboard";
import IUser from "@/app/account-protal/svg/IUser";
import TeamIcon from "@/app/account-protal/svg/TeamIcon";
import ISales from "@/app/account-protal/svg/ISales";
import MermbersIcon from "@/components/salon-owner/team/member/MermbersIcon";
import ShiftIcon from "@/app/account-protal/svg/ShiftIcon";
import WorkShift from "@/app/account-protal/svg/WorkShift";
import { BookOpen } from "lucide-react";
import CategoryIcon from "@/app/account-protal/svg/CategoryIcon";
import BundlesIcon from "@/app/account-protal/svg/BundlesIcon";

export const salonOwnerNavigation = [
  {
    label: "Dashboard",
    href: "/salon-owner/dashboard",
    matchUrls: ["/salon-owner/dashboard", "/salon-owner/dashboard/checkout"],
    icon: IDashboard,
  },

  {
    label: "Appointments",
    href: "/salon-owner/appointment",
    matchUrls: [
      "/salon-owner/appointment",
      "/salon-owner/appointment/settings",
      "/salon-owner/appointment/print-receipt",
      "/salon-owner/appointment/import-appointments",
      "/salon-owner/appointment/view-appointment",
      "/salon-owner/appointment/checkout",
      "/salon-owner/appointment/reschedule",
      "/salon-owner/appointment/add",
    ],
    icon: ICalaender,
  },
  {
    label: "Clients",
    href: "/salon-owner/clients",
    matchUrls: [
      "/salon-owner/clients",
      "/salon-owner/clients/import",
      "/salon-owner/clients/",
      "/salon-owner/clients/gift-card",
      "/salon-owner/clients/gift-card/add",
      "/salon-owner/clients/gift-card/view/"
    ],
    icon: IUser,
  },

  {
    label: "Team",
    icon: TeamIcon,
    children: [
      {
        label: "Members",
        href: "/salon-owner/team/member",
        matchUrls: [
          "/salon-owner/team/member",
          "/salon-owner/team/member/import",
        ],
        icon: MermbersIcon,
      },
      {
        label: "Salaries",
        href: "/salon-owner/team/salaries",
        matchUrls: [
          "/salon-owner/team/salaries"
        ],
        icon: ISales,
      },
      {
        label: "Scheduled Shifts",
        href: "/salon-owner/team/scheduled-shift",
        icon: ShiftIcon,
      },
      {
        label: "Worked Shifts",
        href: "#",
        icon: WorkShift,
      },
    ],
  },
  {
    label: "Services",
    icon: BookOpen,
    children: [
      {
        label: "Services",
        href: "/salon-owner/service/services",
        icon: MermbersIcon,
      },
      {
        label: "Categories",
        href: "/salon-owner/service/service-category",
        icon: CategoryIcon,
      },
      {
        label: "Bundles",
        href: "/salon-owner/team/scheduled-shift",
        icon: BundlesIcon,
      },
    ],
  },
];
