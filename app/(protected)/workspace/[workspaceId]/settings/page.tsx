import { getWorkspaceById } from "@/app/(protected)/data/workspace/get-WorkspaceById";
import WorkspceSettingsForm, {
  DataProps,
} from "@/components/workspace/WorkspceSettingsForm";
import React from "react";

const WorkspceSettingsPage = async ({
  params,
}: {
  params: {
    workspaceId: string;
  };
}) => {
  const { workspaceId } = await params;

  const { data } = await getWorkspaceById(workspaceId);
  return (
    <div>
      <WorkspceSettingsForm data={data as unknown as DataProps[]} />
    </div>
  );
};

export default WorkspceSettingsPage;
