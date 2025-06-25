import { CommentProps, ProjectProps } from "@/utils/types";
import { Activity, Task } from "@prisma/client";
import React from "react";
import ProjectHeader from "./project-header";
import { Card } from "../ui/card";
import TaskDistributionChart from "./task-distribution-chart";

interface ProjectDashboardProps {
  project: ProjectProps;
  tasks: {
    completed: number;
    inProgress: number;
    overdue: number;
    total: number;
    items: Task[];
  };
  activities: Activity[];
  totalWorkspaceMembers: number;
  comments: CommentProps[];
}

const ProjectDashboard = ({
  project,
  tasks,
  activities,
  totalWorkspaceMembers,
  comments,
}: ProjectDashboardProps) => {
  return (
    <div className="flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0">
      <ProjectHeader project={project as unknown as ProjectProps} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* TODO: cricle progress  */}
        <Card></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskDistributionChart tasks={tasks} />

        <Card>
          <h3 className="text-lg font-semibold mb-4"> Recent Activities</h3>
          {/* <ActivityFeed /> */}
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4"> Recent Comments</h3>
          {/* <CommentList /> */}
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;
