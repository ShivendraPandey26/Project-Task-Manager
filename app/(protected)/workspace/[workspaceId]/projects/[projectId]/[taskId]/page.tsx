import { getTaskById } from "@/app/(protected)/data/task/get-task-by-id";
import { userRequired } from "@/app/(protected)/data/user/is-user-authenticated";
import TaskComment from "@/components/task/task-comment";
import TaskDetails from "@/components/task/Task-Details";
import { Comment } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{
    taskId: string;
    workspaceId: string;
    projectId: string;
  }>;
}

const TaskIdPage = async ({ params }: PageProps) => {
  await userRequired();

  const { taskId, workspaceId, projectId } = await params;

  const { task, comments } = await getTaskById(taskId, workspaceId, projectId);

  if (!task) redirect("/not-found");

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-6">
      <TaskDetails task={task as any} />
      <div className="w-full lg:w-[400px]">
        <TaskComment taskId={taskId} comments={comments as any} />
      </div>
    </div>
  );
};

export default TaskIdPage;
