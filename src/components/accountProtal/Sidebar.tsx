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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
