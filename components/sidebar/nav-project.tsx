"use client";
import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CreateProjectForm from "../project/create-project-form";

const NavProjects = ({
  projects,
  workspaceMembers,
}: {
  projects: ProjectProps[];
  workspaceMembers: WorkspaceMembersProps[];
}) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathName = usePathname();
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex\ justify-between">
          <span className="text-sm font-semibold text-muted-foreground uppercase">
            Projects
          </span>

          <CreateProjectForm workspaceMembers={workspaceMembers} />
        </SidebarGroupLabel>

        <SidebarMenu>
          {projects.map((project) => {
            const href = `/workspace/${project.workspaceId}/projects/${project.id}`;
            return (
              <SidebarMenuItem key={project.id}>
                <SidebarMenuButton>
                  <Link
                    href={href}
                    className={
                      pathName === href
                        ? "text-primary-foreground font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    {project?.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default NavProjects;
