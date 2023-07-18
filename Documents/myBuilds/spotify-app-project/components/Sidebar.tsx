"use client";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
interface Props {
  children: React.ReactNode;
}
import {usePathname} from "next/navigation";
import {useMemo} from "react";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
function Sidebar({children}: Props) {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        label: "Search",
        icon: BiSearch,
        active: pathname === "/search",
        href: "/search",
      },
    ],

    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2 bg-black">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes?.map(({icon, label, active, href}) => (
              <SidebarItem
                icon={icon}
                label={label}
                active={active}
                href={href}
                key={label}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
}

export default Sidebar;
