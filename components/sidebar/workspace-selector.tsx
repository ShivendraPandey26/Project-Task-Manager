"use client";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WorkspaceAvatar from "../workspace/workspace-avatar";
import { Check, ChevronsUpDown } from "lucide-react";

const WorkspaceSelector = ({
  workspaces,
}: {
  workspaces: WorkspaceProps[];
}) => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    WorkspaceProps | undefined
  >(undefined);

  const onSelect = (id: string) => {
    setSelectedWorkspace(
      workspaces.find((workspace) => workspace.workspaceId === id)
    );

    router.push(`/workspace/${id}`);
  };

  useEffect(() => {
    if (workspaceId && workspaces) {
      setSelectedWorkspace(
        workspaces.find((workspace) => workspace.workspaceId === workspaceId)
      );
    }
  }, [workspaceId, workspaces]);

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={"lg"}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <WorkspaceAvatar
                  name={(selectedWorkspace?.workspace.name as string) || "W"}
                />

                <div className="font-semibold text-muted-foreground">
                  {selectedWorkspace?.workspace.name}
                </div>

                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width]"
            >
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onSelect={() => onSelect(workspace.workspaceId)}
                >
                  <div className="flex flex-row items-center gap-2">
                    <WorkspaceAvatar name={workspace.workspace?.name} />

                    <p>{workspace.workspace?.name}</p>
                  </div>

                  {workspace.workspaceId === workspaceId && (
                    <Check className="ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default WorkspaceSelector;
