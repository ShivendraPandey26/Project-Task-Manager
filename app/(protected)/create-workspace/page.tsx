import WorkspaceForm from "@/components/workspace/workspaceForm";
import React from "react";
import { redirect } from "next/navigation";
import { getUserWorkspace } from "../data/workspace/get-user-workspace";

const page = async () => {
  const { data } = await getUserWorkspace();

  if (!data?.onboardingCompleted) redirect("/onboarding");

  return (
    <div>
      <WorkspaceForm />
    </div>
  );
};

export default page;
