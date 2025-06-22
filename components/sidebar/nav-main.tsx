"use client";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";

const NavMain = () => {
  const workspaceId = useWorkspaceId();
  const { setOpenMobile } = useSidebar();

  const items = [
    {
      label: "Home",
      href: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
      path: "home",
    },
    {
      label: "My Tasks",
      href: `/workspace/${workspaceId}/my-tasks`,
      icon: CheckSquare,
      path: "my-tasks",
    },
    {
      label: "Members",
      href: `/workspace/${workspaceId}/members`,
      icon: Users,
      path: "members",
    },
    {
      label: "Settings",
      href: `/workspace/${workspaceId}/settings`,
      icon: Settings,
      path: "settings",
    },
  ];
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu className="space-y-3">
          {items.map((element) => (
            <SidebarMenuItem key={element.label}>
              <SidebarMenuButton
                asChild
                tooltip={element.label}
                className="px-2 py-1.5"
              >
                <Link href={element.href} onClick={() => setOpenMobile(false)}>
                  <element.icon className="mr-2 h-4 w-4" />
                  {element.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default NavMain;
