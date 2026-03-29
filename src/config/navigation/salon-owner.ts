import ICalaender from "@/app/account-protal/svg/ICalaender";
import IDashboard from "@/app/account-protal/svg/IDashboard";
import IUser from "@/app/account-protal/svg/IUser";
import TeamIcon from "@/app/account-protal/svg/TeamIcon";
import ISales from "@/app/account-protal/svg/ISales";
import MermbersIcon from "@/components/salon-owner/team/member/MermbersIcon";
import ShiftIcon from "@/app/account-protal/svg/ShiftIcon";
import WorkShift from "@/app/account-protal/svg/WorkShift";
import CategoryIcon from "@/app/account-protal/svg/CategoryIcon";
import BundlesIcon from "@/app/account-protal/svg/BundlesIcon";
import InventoryIcon from "@/app/account-protal/svg/InventoryIcon";
import ProductIcon from "@/app/account-protal/svg/ProductIcon";
import StockIcon from "@/app/account-protal/svg/StockIcon";
import { BookOpen } from "lucide-react";

export interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ color?: string }>;
  children?: NavItem[];
  matchUrls?: string[];
}

export const salonOwnerNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/salon-owner/dashboard",
    icon: IDashboard,
  },
  {
    label: "Appointments",
    href: "/salon-owner/appointment",
    icon: ICalaender,
  },
  {
    label: "Clients",
    href: "/salon-owner/clients",
    icon: IUser,
  },
  {
    label: "Team",
    icon: TeamIcon,
    children: [
      {
        label: "Members",
        href: "/salon-owner/team/member",
        icon: MermbersIcon,
      },
      {
        label: "Salaries",
        href: "/salon-owner/team/salaries",
        icon: ISales,
      },
      {
        label: "Scheduled Shifts",
        href: "/salon-owner/team/scheduled-shift",
        icon: ShiftIcon,
      },
      {
        label: "Worked Shifts",
        href: "/salon-owner/team/worked-shift",
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
        href: "/salon-owner/service/bundle",
        icon: BundlesIcon,
      },
    ],
  },
  {
    label: "Inventory",
    icon: InventoryIcon,
    children: [
      {
        label: "Stock in/Stock out",
        href: "/salon-owner/inventory/stock",
        icon: StockIcon,
      },
      {
        label: "Products",
        href: "/salon-owner/inventory/import-product",
        icon: ProductIcon,
      },
      {
        label: "Categories",
        href: "/salon-owner/inventory/product-category",
        icon: CategoryIcon,
      },
    ],
  },
];