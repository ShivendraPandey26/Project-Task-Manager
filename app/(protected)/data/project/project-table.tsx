"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/project/columns";
import { Project, Task, User } from "@prisma/client";

interface TaskProps extends Task {
  assignedTo: User;
  project: Project;
  attachments: File[];
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => (
  <DataTable columns={columns} data={tasks as any} />
);
