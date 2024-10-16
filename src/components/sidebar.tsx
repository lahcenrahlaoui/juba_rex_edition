"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";

import { JubarexContext, JubarexContextType } from "@/app/context";
import Logo from "@/components/shared/logo";
import NavigationLinks from "@/components/shared/navigation-links";
import ThemeToggle from "@/components/theme-toggle";

const Sidebar = () => {
  const { user } = useContext(JubarexContext) as JubarexContextType;
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Displaying the logo */}
      <Logo />

      {/* Displaying the main navigation links */}
      {user?.email ? <NavigationLinks /> : ""}
      <NavigationLinks />  

      {/* Displaying the theme toggle */}
      <ThemeToggle />
    </aside>
  );
};

export default Sidebar;
