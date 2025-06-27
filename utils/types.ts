import { $Enums, AccessLevel, Task, TaskStatus, WorkspaceMember } from "@prisma/client";

export interface WorkspaceMembersProps extends WorkspaceMember {
    user: {
        id: string;
        name: string;
        email: string;
        image?: string;
    };
    projectAccess: {
        id: string;
        hasAccess: boolean;
        projectId: string;
    }[];
}


export interface ProjectProps {
    id: string;
    name: string;
    description?: string | null;
    workspaceId: string;
    members: {
        id: string;
        userId: string;
        workspaceId: string;
        accessLevel: AccessLevel;
        createdAt: Date;
        user: {
            id: string;
            name: string;
            email: string;
            image?: string;
        }
    }[];
}

export interface WorkspaceProps {
    id: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: $Enums.AccessLevel;
    workspace: {
        name: string;
    }
}

export interface CommentProps extends Comment {
    user: {
        id: string;
        name: string;
        image: string;
    };
}

export interface ProjectTasksProps extends Task {
    assignedTo: {
        id: string;
        name: string;
        image?: string
    };
    project: {
        id: string;
        name: string;
    };
}

export interface Column {
    id: TaskStatus;
    title: string;
    tasks: ProjectTasksProps[];
}

export const taskStatusVariant = {
    [TaskStatus.TODO]: "#eab308",
    [TaskStatus.PENDING]: "#f97316",
    [TaskStatus.IN_PROGRESS]: "#3b82f6",
    [TaskStatus.COMPLETED]: "#22c55e",
    [TaskStatus.ON_HOLD]: "#facc15",
    [TaskStatus.IN_REVIEW]: "#a855f7",
    [TaskStatus.BACKLOG]: "#ef4444",
    [TaskStatus.CANCELLED]: "#6b7280",
};
