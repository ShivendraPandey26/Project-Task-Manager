import React from "react";
import { getUserWorkspace } from "../../data/workspace/get-user-workspace";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarContainer } from "@/components/sidebar/app-sidebar-container";
import Navbar from "@/components/navbar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const { data } = await getUserWorkspace();
  const { workspaceId } = await params;
  // console.log({ workspaceId });

  if (data?.onboardingCompleted && !data?.workspaces) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <div className="w-full h-screen flex bg-background">
        <AppSidebarContainer data={data as any} workspaceId={workspaceId} />

        <main className="w-full min-h-screen overflow-y-auto">
          <div className="flex items-start">
            <SidebarTrigger className="pt-3" />
            <Navbar
              id={data?.id as string}
              name={data?.name as string}
              email={data?.email as string}
              image={data?.image as string}
            />
          </div>
          <div className="p-0 md:p-4 pt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
