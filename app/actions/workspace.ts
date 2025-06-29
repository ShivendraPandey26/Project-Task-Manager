"use server"

import { CreateWorkspaceDataType } from "@/components/workspace/workspaceForm";
import { userRequired } from "../(protected)/data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/generate-invite-code";
import { AccessLevel } from "@prisma/client";
import { redirect } from "next/navigation";

export const createNewWorkspace = async (data: CreateWorkspaceDataType) => {
    try {
        const { user } = await userRequired();

        const vaildatedData = workspaceSchema.parse(data);

        const res = await db.workspace.create({
            data: {
                name: vaildatedData.name,
                description: vaildatedData.description,
                ownerId: user?.id as string,
                inviteCode: generateInviteCode(),
                members: {
                    create: {
                        userId: user?.id as string,
                        accessLevel: "OWNER",
                    }
                }
            }
        });

        return { data: res }

    } catch (error) {
        console.log({ "error while creating workspace": error });
        return {
            STATUS: 500,
            message: {
                error: "An error occurred while creating the workspace"
            }
        }
    }

};


export const updateWorkspace = async (
    workspaceId: string,
    data: CreateWorkspaceDataType,
) => {
    const { user } = await userRequired();

    const validatedData = workspaceSchema.parse(data);

    const isUserAMember = await db.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: user?.id as string,
                workspaceId: workspaceId,
            },
        },
    });

    if (!isUserAMember) {
        throw new Error("User is not a member of this workspace.");
    }

    const updatedWorkspace = await db.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            name: validatedData.name,
            description: validatedData.description || "",
        },
    });

    return { success: true };
};

export const resetWorkspaceInviteCode = async (workspaceId: string) => {
    const { user } = await userRequired();

    const isUserAMember = await db.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: user?.id as string,
                workspaceId: workspaceId,
            },
        },
    });

    if (!isUserAMember) {
        throw new Error("User is not a member of this workspace.");
    }

    await db.workspace.update({
        where: {
            id: workspaceId,
        },
        data: {
            inviteCode: generateInviteCode(),
        },
    })


    return {
        success: true
    }
}
export const deleteWorkspace = async (workspaceId: string) => {
    const { user } = await userRequired();

    const isUserAMember = await db.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: user?.id as string,
                workspaceId: workspaceId,
            },
        },
    });

    if (!isUserAMember) {
        throw new Error("User is not a member of this workspace.");
    }

    if (isUserAMember && isUserAMember.accessLevel !== AccessLevel.OWNER) {
        throw new Error("Only the owner of the workspace can delete it.");
    }

    await db.workspace.delete({
        where: {
            id: workspaceId,
        },
    })

    redirect("/workspace")
}