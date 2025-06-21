"use server"

import { CreateWorkspaceDataType } from "@/components/workspace/workspaceForm";
import { userRequired } from "../(protected)/data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/generate-invite-code";

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

        return {data: res}

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