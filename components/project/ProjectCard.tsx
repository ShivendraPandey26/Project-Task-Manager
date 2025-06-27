import { useProjectId } from "@/hooks/use-project-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { ProjectTasksProps } from "@/utils/types";
import { DraggableProvided } from "@hello-pangea/dnd";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import ProfileAvatar from "../profile-avatar";
import { Badge } from "../ui/badge";

interface DataProps {
  ref: (element?: HTMLElement | null) => void;
  task: ProjectTasksProps;
  provided: DraggableProvided;
}

const ProjectCard = ({ ref, task, provided }: DataProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="mb-2 p-3 bg-white dark:bg-gray-900 shadow-sm"
    >
      <Link href={`/workspace/${workspaceId}/projects/${projectId}/${task.id}`}>
        <h3 className="font-medium">{task.title}</h3>
      </Link>
      {task.description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
          {" "}
          {task.description}{" "}
        </p>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <ProfileAvatar name={task.project.name} className="!size-6" />
          <p className="text-sm text-muted-foreground">{task.project.name}</p>
        </div>
        <Badge variant={task.priority as any}>{task.priority}</Badge>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <ProfileAvatar
          url={task.assignedTo?.image}
          name={task.assignedTo.name}
          className="!size-6"
        />
        <p className="text-sm text-muted-foreground">{task.assignedTo.name}</p>
      </div>
    </Card>
  );
};

export default ProjectCard;
