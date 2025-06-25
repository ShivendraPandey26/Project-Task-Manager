import { TaskStatus } from "@prisma/client";

export const taskStats = [
    {
        status: TaskStatus.BACKLOG,
        label: "BACKLOG",
        color: "bg-gray-400",
    },
    {
        status: TaskStatus.TODO,
        label: "TO DO",
        color: "bg-blue-500",
    },
    {
        status: TaskStatus.PENDING,
        label: "PENDING",
        color: "bg-indigo-500",
    },
    {
        status: TaskStatus.IN_PROGRESS,
        label: "IN PROGRESS",
        color: "bg-yellow-500",
    },
    {
        status: TaskStatus.IN_REVIEW,
        label: "IN REVIEW",
        color: "bg-purple-500",
    },
    {
        status: TaskStatus.COMPLETED,
        label: "COMPLETED",
        color: "bg-green-500",
    },
    {
        status: TaskStatus.CANCELLED,
        label: "CANCELLED",
        color: "bg-red-500",
    }
];
