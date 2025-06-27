"use server"
import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated";
import { TaskStatus } from "@prisma/client";

export const getProjectDetails = async (
    projectId: string,
    workspaceId: string
) => {
    try {

        const { user } = await userRequired();

        const isUserMember = await db.workspaceMember.findUnique({
            where: {
                userId_workspaceId: {
                    userId: user?.id as string,
                    workspaceId,
                },
            },
        });

        const totalWorkspaceMembers = await db.workspaceMember.count({
            where: {
                workspaceId
            }
        });

        if (!isUserMember) {
            throw new Error('User is not a member of the workspace');
        }

        const [project, comments] = await Promise.all([
            db.project.findUnique({
                where: {
                    id: projectId,
                },
                include: {
                    projectAccess: {
                        include: {
                            workspaceMember: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            image: true
                                        }
                                    }
                                }
                            }
                        },
                    },
                    tasks: {
                        include: {
                            assignedTo: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                            project: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            }
                        }
                    },
                    activities: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc',
                        }
                    }
                },
            }),
            db.comment.findMany({
                where: {
                    projectId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
        ]);

        const tasks = {
            total: project?.tasks.length,
            completed: project?.tasks.filter((task) => task.status === TaskStatus.COMPLETED).length,
            inProgress: project?.tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS).length,
            overdue: project?.tasks.filter((task) => task.status !== TaskStatus.COMPLETED && task.dueDate && new Date(task.dueDate) < new Date()).length,
            items: project?.tasks,
        }

        return {
            project: {
                ...project,
                members: project?.projectAccess?.map(access => access.workspaceMember),
            },
            tasks,
            activities: project?.activities,
            totalWorkspaceMembers,
            comments
        }

    } catch (error) {
        console.log(error);

        return {
            status: false,
            message: 'Something went wrong',
            error: true
        }
    }
}