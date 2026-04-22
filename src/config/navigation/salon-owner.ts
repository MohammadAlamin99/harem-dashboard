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
import { Activity, BarChart3, BookOpen, CalendarDays, ChartSpline, Globe, UserCheck, Users, Folder, Settings, LifeBuoy, ShieldCheck } from "lucide-react";
import IDollar from "@/components/salon-owner/appointment/add-appointment/IDollar";
import FinancialIcon from "@/app/account-protal/svg/FinancialIcon";
import IReceipts from "@/app/account-protal/svg/IReceipts";
import GiftCardIconNav from "@/app/account-protal/svg/GiftCardIconNav";
import MediaIcon from "@/app/account-protal/svg/MediaIcon";
import IFile from "@/components/salon-owner/clients/view-details/IFile";

export interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ color?: string }>;
  children?: NavItem[];
  matchUrls?: string[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const salonOwnerNavigation: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/salon-owner/dashboard", icon: IDashboard },
      { label: "Appointments", href: "/salon-owner/appointment", icon: ICalaender },
      { label: "Clients", href: "/salon-owner/clients", icon: IUser },
      {
        label: "Team",
        icon: TeamIcon,
        children: [
          { label: "Members", href: "/salon-owner/team/member", icon: MermbersIcon },
          { label: "Salaries", href: "/salon-owner/team/salaries", icon: ISales },
          { label: "Scheduled Shifts", href: "/salon-owner/team/scheduled-shift", icon: ShiftIcon },
          { label: "Worked Shifts", href: "/salon-owner/team/worked-shift", matchUrls: ["/salon-owner/team/worked-shift/view-worked-shift/"], icon: WorkShift },
        ],
      },
      {
        label: "Services",
        icon: BookOpen,
        children: [
          { label: "Services", href: "/salon-owner/service/services", icon: MermbersIcon },
          { label: "Categories", href: "/salon-owner/service/service-category", icon: CategoryIcon },
          { label: "Bundles", href: "/salon-owner/service/bundle", matchUrls: ["/salon-owner/service/bundle", "/salon-owner/service/bundle/add-bundle"], icon: BundlesIcon },
        ],
      },
      {
        label: "Inventory",
        icon: InventoryIcon,
        children: [
          { label: "Stock in/Stock out", href: "/salon-owner/inventory/stock", icon: StockIcon },
          { label: "Products", href: "/salon-owner/inventory/add-product", matchUrls: ["/salon-owner/inventory/add-product/import-product", "/salon-owner/inventory/add-product/view-product/"], icon: ProductIcon },
          { label: "Categories", href: "/salon-owner/inventory/product-category", matchUrls: ["/salon-owner/inventory/product-category/view-category/"], icon: CategoryIcon },
        ],
      },
      {
        label: "Financial",
        icon: FinancialIcon,
        children: [
          { label: "Payments", href: "/salon-owner/financial/list", matchUrls: ["/salon-owner/financial/list/import-receipts", "/salon-owner/financial/list/view-payment/", "/salon-owner/financial/list/view-receipts/", "/salon-owner/financial/list/set-automation"], icon: IDollar },
          { label: "Receipts", href: "#", icon: IReceipts },
          { label: "Gifts Cards", href: "/salon-owner/financial/gift-card", matchUrls: ["/salon-owner/financial/gift-card/add", "/salon-owner/financial/gift-card/create", "/salon-owner/financial/gift-card/view-giftcard/"], icon: GiftCardIconNav },
        ],
      },
      {
        label: "Social Media",
        icon: Globe,
        children: [
          { label: "Calendar", href: "/salon-owner/social-media/calendar", icon: CalendarDays },
          { label: "Media", href: "/salon-owner/social-media/media", icon: MediaIcon },
          { label: "Analytics", href: "/salon-owner/social-media/analytics", icon: ChartSpline },
        ],
      },
      {
        label: "Statistics",
        icon: BarChart3,
        children: [
          { label: "Performance Dashboard", href: "/salon-owner/statistics/performance-dashboard", icon: Activity },
          { label: "Employee Status", href: "/salon-owner/statistics/employee-performance", icon: UserCheck },
          { label: "Client Status", href: "/salon-owner/statistics/client-status", icon: Users },
        ]
      },
    ]
  },
  {
    title: "Others",
    items: [
      { label: "Waivers", href: "/salon-owner/waivers", icon: IFile },
      { label: "Files", href: "/salon-owner/files", icon: Folder },
      { label: "Roles", href: "/salon-owner/roles", icon: ShieldCheck },
      { label: "Support", href: "/salon-owner/support", icon: LifeBuoy },
      { label: "Settings", href: "/salon-owner/settings", icon: Settings },
    ]
  },
];