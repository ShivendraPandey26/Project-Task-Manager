"use client";

import { Project } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, EllipsisVertical, Paperclip } from "lucide-react";
import Link from "next/link";
import ProjectAvatar from "./project-avatar";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AvatarImage } from "../ui/avatar";
import ProfileAvatar from "../profile-avatar";
import { toast } from "sonner";
import { deleteTask } from "@/app/actions/task";
import { useRouter } from "next/navigation";

export type TaskTableItem = {
  id: string;
  name: string;
  status: string;
  dueDate: Date;
  assignedTo: {
    name: string;
    image?: string;
  };
  project: Project;
};

export const columns: ColumnDef<TaskTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
      >
        Task Title <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return (
        <Link
          href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
        >
          <div className="flex items-center gap-2">
            <ProjectAvatar name={title} />
            <span className="text-sm font-medium xl:text-base capitalize">
              {title}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant={status as any}>
          {status === "IN_PROGRESS" ? "IN PROGRESS" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;

      return (
        <Badge variant={"secondary"} className="font-normal">
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;

      return <div>{format(new Date(createdAt), "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as Date;

      return <div>{format(new Date(dueDate), "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo") as {
        name: string;
        image?: string;
      };

      return (
        <div className="flex items-center gap-2">
          <ProfileAvatar
            url={assignedTo?.image}
            name={assignedTo?.name || "Unassigned"}
            numOfchars={2}
            size="md"
          />
          <span>{assignedTo?.name || "Unassigned"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "attachments",
    header: "Attachments",
    cell: ({ row }) => {
      const attachments = row.getValue("attachments") as string[];

      return (
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4" />
          <span>{attachments.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();

      const handleDeleteTask = (taskId: string, workspaceId: string) => {
        try {
          deleteTask(taskId, workspaceId);
          router.refresh();
          toast.success("Task deleted successfully");
        } catch (error) {
          console.log(error);
          if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
            toast.error(
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
            );
          }
        }
      };
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
                >
                  View Task
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <h1
                  onClick={() =>
                    handleDeleteTask(
                      row.original.id,
                      row.original.project.workspaceId
                    )
                  }
                >
                  Delete Task
                </h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const myTaskColumns: ColumnDef<TaskTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
      >
        Task Title <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return (
        <Link
          href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
        >
          <div className="flex items-center gap-2">
            <ProjectAvatar name={title} />
            <span className="text-sm font-medium xl:text-base capitalize">
              {title}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant={status as any}>
          {status === "IN_PROGRESS" ? "IN PROGRESS" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;

      return (
        <Badge variant={"secondary"} className="font-normal">
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;

      return <div>{format(new Date(createdAt), "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as Date;

      return <div>{format(new Date(dueDate), "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      const project = row.getValue("project") as {
        name: string;
      };

      return (
        <Link
          href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}`}
        >
          <div className="flex items-center gap-2">
            <ProfileAvatar numOfchars={2} name={project?.name} />
            <span>{project?.name}</span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "attachments",
    header: "Attachments",
    cell: ({ row }) => {
      const attachments = row.getValue("attachments") as string[];

      return (
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4" />
          <span>{attachments.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();

      const handleDeleteTask = (taskId: string, workspaceId: string) => {
        try {
          deleteTask(taskId, workspaceId);
          router.refresh();
          toast.success("Task deleted successfully");
        } catch (error) {
          console.log(error);
          if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
            toast.error(
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
            );
          }
        }
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
                >
                  View Task
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <h1
                  onClick={() =>
                    handleDeleteTask(
                      row.original.id,
                      row.original.project.workspaceId
                    )
                  }
                >
                  Delete Task
                </h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
