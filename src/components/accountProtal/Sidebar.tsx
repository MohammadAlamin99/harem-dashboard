
"use client";
import React, { useState } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ color?: string; size?: number }>;
  children?: NavItem[];
  matchUrls?: string[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigation?: NavSection[];
  logoHref?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  navigation = [],
  logoHref = "/salon-owner/dashboard",
}) => {
  const pathname = usePathname();

  const getActiveParentLabel = () => {
    if (!navigation || !Array.isArray(navigation)) return null;

    for (const section of navigation) {
      if (!section.items) continue;

      const activeParent = section.items.find((item) =>
        item?.children?.some((child) => pathname.startsWith(child.href || ""))
      );
      if (activeParent) return activeParent.label;
    }
    return null;
  };

  const [expandedItem, setExpandedItem] = useState<string | null>(getActiveParentLabel());
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const activeParentLabel = getActiveParentLabel();
    if (activeParentLabel) {
      setExpandedItem(activeParentLabel);
    }
  }

  const isActive = (item: NavItem) => {
    if (item?.href && pathname.startsWith(item.href)) return true;
    if (item?.matchUrls) return item.matchUrls.some((url) => pathname.startsWith(url));
    return false;
  };

  const isChildActive = (item: NavItem) =>
    item?.children?.some((child) => pathname.startsWith(child.href || ""));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-50 lg:static top-0 left-0 h-screen w-75 max-[1400px]:w-[200px] max-[992px]:w-[50%] max-[768px]:w-[80%] bg-white transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* HEADER SECTION - shrink-0 keeps it from squishing */}
        <div className="flex items-center gap-4 px-4 headerLogo shrink-0">
          <button className="mt-1 cursor-pointer">
            <Menu width={24} height={24} color="#29343D" />
          </button>

          <Link href={logoHref} className="flex-1 cursor-pointer">
            <Image
              src={"/images/logo.png"}
              width={180}
              height={40}
              alt="logo"
            />
          </Link>

          <button className="lg:hidden cursor-pointer" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION LINKS*/}
        <nav className="flex-1 overflow-y-auto p-3 lg:p-4 mt-2 lg:mt-3 space-y-4 custom-scrollbar">
          {navigation.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-1 lg:space-y-3">

              {sectionIdx > 0 && (
                <div className="border-t border-[#F3F4F7] pt-4 mt-2 mb-2 mx-4" />
              )}

              {section.title && (
                <h4 className="text-[#98A4AE] text-xs ml-4 font-manrope uppercase tracking-wide mb-3 lg:mb-4">
                  {section.title}
                </h4>
              )}

              {section?.items?.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                const childActive = isChildActive(item);
                const expanded = expandedItem === item.label;

                if (item.children && item.children.length > 0) {
                  return (
                    <div key={item.label}>
                      <div className={`${expanded ? "bg-[#F1F2FE] rounded-lg" : ""}`}>
                        <button
                          aria-expanded={expanded}
                          onClick={() => setExpandedItem(expanded ? null : item.label)}
                          className={`w-full flex items-center justify-between font-manrope gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition text-[15px]
                          ${expanded || childActive
                              ? "bg-transparent text-[#635BFF] font-semibold"
                              : "text-[#29343D] hover:bg-[#F3F4F7] font-normal"
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon color={expanded || childActive ? "#635BFF" : "#98A4AE"} size={22} />
                            <span className={expanded || childActive ? "font-semibold" : "font-normal"}>
                              {item.label}
                            </span>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`transition-transform ${expanded ? "rotate-180 text-[#635BFF]" : "text-[#29343D]"}`}
                          />
                        </button>

                        {expanded && (
                          <div className="space-y-4 px-4 pb-4 pt-2.5">
                            {item.children.map((child) => {
                              const ChildIcon = child.icon;
                              const childIsActive = pathname.startsWith(child.href || "");

                              return (
                                <Link
                                  key={child.label}
                                  href={child.href || "#"}
                                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 font-manrope rounded-lg cursor-pointer transition text-[15px]
                                  ${childIsActive
                                      ? "bg-[#635BFF] text-white shadow-[0_8px_20px_-8px_rgba(77,91,236,0.23)] font-semibold"
                                      : "text-[#635BFF] bg-[#DDDBFF]"
                                    }`}
                                >
                                  <ChildIcon color={childIsActive ? "white" : "#635BFF"} size={18} />
                                  <span className={childIsActive ? "text-white" : ""}>
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
                    ${active
                        ? "bg-[#635BFF] text-white shadow-[0_8px_20px_-8px_rgba(77,91,236,0.23)] font-semibold"
                        : "text-[#29343D] hover:bg-[#F3F4F7] font-normal"
                      }`}
                  >
                    <Icon color={active ? "white" : "#98A4AE"} size={22} />
                    <span className="text-sm font-manrope">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;