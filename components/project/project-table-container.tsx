import { getProjectById } from "@/app/(protected)/data/project/get-project-id";
import { ProjectTable } from "@/app/(protected)/data/project/project-table";
import React from "react";

const ProjectTableContainer = async ({ projectId }: { projectId: string }) => {
  const { tasks } = await getProjectById(projectId);
  return (
    <div className="p-0">
      <ProjectTable tasks={tasks as any} />
    </div>
  );
};

export default ProjectTableContainer;
