"use client";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

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
    setSelectedWorkspace(workspaces.find((workspace) => workspace.id === id));

    router.push(`/workspace/${id}`);
  };

  useEffect(() => {
    if (workspaceId && workspaces) {
      setSelectedWorkspace(
        workspaces.find((workspace) => workspace.id === workspaceId)
      );
    }
  }, [workspaceId, workspaces]);

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu></DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default WorkspaceSelector;
