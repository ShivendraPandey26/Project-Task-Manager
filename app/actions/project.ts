"use server"

import { ProjectDataType } from "@/components/project/create-project-form"
import { userRequired } from "../(protected)/data/user/is-user-authenticated"
import { db } from "@/lib/db"
import { projectSchema } from "@/lib/schema"

export const createNewProject = async (data: ProjectDataType) => {
    const { user } = await userRequired()

    const workspace = await db.workspace.findUnique({
        where: { id: data?.workspaceId },
        include: {
            projects: {
                select: { id: true }
            },
        }
    });

    const validatedData = projectSchema.parse(data);

    const workspaceMemberMembers = await db.workspaceMember.findMany({
        where: {
            workspaceId: data.workspaceId,
        },
    });

    const isUserMember = workspaceMemberMembers.some((member) => member.userId === user?.id)
    if (!isUserMember) {
        throw new Error('User is not a member of the workspace');
    }

    if (validatedData.memberAccess?.length === 0) {
        validatedData.memberAccess = [user?.id as string]
    } else if (!validatedData.memberAccess?.includes(user?.id as string)) {
        validatedData.memberAccess?.push(user?.id as string)
    }

    await db.project.create({
        data: {
            name: validatedData.name,
            description: validatedData.description,
            workspaceId: validatedData.workspaceId,
            projectAccess: {
                create: validatedData.memberAccess?.map((memberId) => ({
                    workspaceMemberId: workspaceMemberMembers.find(
                        (member) => member.userId === memberId)?.id!,
                    hasAccess: true,
                })),
            },
            activities: {
                create: {
                    type: "PROJECT_CREATED",
                    description: `Created Project ${validatedData.name}`,
                    userId: user?.id as string,
                }
            }
        }
    });

    return {
        success: true
    };
}

export const postComments = async (workspaceId: string, projectId: string, content: string) => {
    const { user } = await userRequired();


    const isMember = await db.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: user?.id as string,
                workspaceId,
            },
        },
    });

    if (!isMember) {
        throw new Error('You are not a member of this workspace')
    }

    const projectAccess = await db.projectAccess.findUnique({
        where: {
            workspaceMemberId_projectId: {
                workspaceMemberId: isMember.id,
                projectId,
            },
        },
    });

    if (!projectAccess) {
        throw new Error('You do not have access to this project')
    }

    const comment = await db.comment.create({
        data: {
            content,
            projectId,
            userId: user?.id as string
        },
    });

    return { comment };
}