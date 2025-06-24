import { ProjectProps } from "@/utils/types";
import React from "react";
import ProjectAvatar from "./project-avatar";

const ProjectHeader = ({ project }: { project: ProjectProps }) => {
  //   console.log(project);

  if (!project)
    return (
      <div>
        <p>No project selected</p>
      </div>
    );
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-2">
        <div className="flex gap-2">
          <ProjectAvatar name={project.name as string} />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
